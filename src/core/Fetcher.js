import { CacheManager } from './CacheManager.js';
import { RetryStrategy } from './RetryStrategy.js';
import { CircuitBreaker } from './CircuitBreaker.js';
import { TimeoutHandler } from '../utils/TimeoutHandler.js';
import { HTTPError, normalizeError } from '../utils/ErrorNormalizer.js';
import { logger } from '../utils/Logger.js';
import { DEFAULT_CONFIG } from '../types/constants.js';

export class Fetcher {
  constructor(config = {}) {
    this.config = {
      retries: config.retries ?? DEFAULT_CONFIG.RETRIES,
      timeout: config.timeout ?? DEFAULT_CONFIG.TIMEOUT,
      enableCache: config.enableCache ?? true,
      enableCircuitBreaker: config.enableCircuitBreaker ?? true,
      cacheTTL: config.cacheTTL ?? DEFAULT_CONFIG.CACHE_TTL,
      maxCacheSize: config.maxCacheSize ?? 100
    };
    
    this.cache = new CacheManager(this.config.maxCacheSize, this.config.cacheTTL);
    this.retryStrategy = new RetryStrategy({ maxRetries: this.config.retries });
    this.circuitBreaker = new CircuitBreaker();
  }

  async fetch(url, options = {}) {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.config.timeout,
      useCache = this.config.enableCache,
      cacheTTL = this.config.cacheTTL,
      responseType = 'json'
    } = options;

    const cacheKey = `${method}:${url}`;

    if (useCache) {
      const cached = this.cache.get(cacheKey);
      if (cached) {
        logger.debug(`Cache HIT: ${cacheKey}`);
        return cached;
      }
    }

    const executeRequest = async () => {
      return await TimeoutHandler.withTimeout(
        (async () => {
          const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
          });
          
          if (!response.ok) {
            throw new HTTPError(response.status, response.statusText, url);
          }
          
          if (responseType === 'json') return response.json();
          if (responseType === 'text') return response.text();
          return response;
        })(),
        timeout,
        url
      );
    };

    try {
      let result;
      if (this.config.enableCircuitBreaker) {
        result = await this.circuitBreaker.execute(async () => {
          return await this.retryStrategy.execute(executeRequest, { url });
        });
      } else {
        result = await this.retryStrategy.execute(executeRequest, { url });
      }
      
      if (useCache) {
        this.cache.set(cacheKey, result, cacheTTL);
        logger.debug(`Cached: ${cacheKey}`);
      }
      
      return result;
    } catch (error) {
      throw normalizeError(error, { url, timeout });
    }
  }

  async get(url, options = {}) {
    return this.fetch(url, { ...options, method: 'GET' });
  }

  async post(url, body, options = {}) {
    return this.fetch(url, { ...options, method: 'POST', body });
  }

  async put(url, body, options = {}) {
    return this.fetch(url, { ...options, method: 'PUT', body });
  }

  async delete(url, options = {}) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }

  clearCache() {
    this.cache.clear();
    logger.info('Cache cleared');
  }

  getCacheStats() {
    return this.cache.getStats();
  }

  getCircuitBreakerState() {
    return this.circuitBreaker.getState();
  }
}
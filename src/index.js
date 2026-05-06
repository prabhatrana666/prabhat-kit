import { Fetcher } from './core/Fetcher.js';
import { CacheManager } from './core/CacheManager.js';
import { RetryStrategy } from './core/RetryStrategy.js';
import { CircuitBreaker, CircuitState } from './core/CircuitBreaker.js';
import { NetworkError, TimeoutError, HTTPError, normalizeError, isRetryableError } from './utils/ErrorNormalizer.js';
import { logger } from './utils/Logger.js';
import { DEFAULT_CONFIG, HTTP_STATUS, HTTP_METHODS } from './types/constants.js';

const defaultFetcher = new Fetcher();

export {
  Fetcher,
  CacheManager,
  RetryStrategy,
  CircuitBreaker,
  CircuitState,
  NetworkError,
  TimeoutError,
  HTTPError,
  normalizeError,
  isRetryableError,
  logger,
  DEFAULT_CONFIG,
  HTTP_STATUS,
  HTTP_METHODS,
  defaultFetcher as fetcher
};

export default defaultFetcher;
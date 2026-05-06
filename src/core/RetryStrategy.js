import { isRetryableError } from '../utils/ErrorNormalizer.js';
import { logger } from '../utils/Logger.js';

export class RetryStrategy {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.initialDelay = options.initialDelay || 1000;
  }

  async execute(fn, context = {}) {
    let lastError = null;
    
    for (let attempt = 1; attempt <= this.maxRetries + 1; attempt++) {
      try {
        logger.debug(`Attempt ${attempt}`, context);
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (attempt <= this.maxRetries && isRetryableError(error)) {
          const delay = this.initialDelay * Math.pow(2, attempt - 1);
          logger.warn(`Retrying in ${delay}ms`, { error: error.message });
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw error;
        }
      }
    }
    
    throw lastError;
  }
}
export class NetworkError extends Error {
  constructor(message, originalError, context = {}) {
    super(message);
    this.name = 'NetworkError';
    this.originalError = originalError;
    this.context = context;
  }
}

export class TimeoutError extends NetworkError {
  constructor(url, timeout) {
    super(`Request timeout after ${timeout}ms`);
    this.name = 'TimeoutError';
    this.url = url;
  }
}

export class HTTPError extends NetworkError {
  constructor(status, statusText, url) {
    super(`HTTP Error ${status}: ${statusText}`);
    this.name = 'HTTPError';
    this.status = status;
    this.url = url;
  }
}

export function normalizeError(err, context = {}) {
  if (err instanceof NetworkError) return err;
  if (err.message?.includes('timeout')) {
    return new TimeoutError(context.url, context.timeout);
  }
  return new NetworkError(err.message || 'Unknown error', err, context);
}

export function isRetryableError(error) {
  if (error instanceof TimeoutError) return true;
  if (error.status && [408, 429, 500, 502, 503, 504].includes(error.status)) return true;
  return false;
}
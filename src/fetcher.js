const { retry } = require("./retry");
const { withTimeout } = require("./utils");
const { cache } = require("./cache");
const { normalizeError } = require("./errors");

async function fetcher(url, options = {}) {
  const {
    method = "GET",
    headers = {},
    body,
    retries = 2,
    timeout = 5000,
    useCache = false,
  } = options;

  const cacheKey = `${method}:${url}`;

  if (useCache) {
    const cached = cache.get(cacheKey);
    if (cached) return cached;
  }

  const request = async () => {
    const res = await withTimeout(fetch(url, { method, headers, body }), timeout);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return res.json();
  };

  try {
    const data = await retry(request, retries);

    if (useCache) {
      cache.set(cacheKey, data);
    }

    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

module.exports = fetcher;
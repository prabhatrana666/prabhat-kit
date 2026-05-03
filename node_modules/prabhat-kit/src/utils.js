function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), ms)
  );

  return Promise.race([promise, timeout]);
}

module.exports = { withTimeout };
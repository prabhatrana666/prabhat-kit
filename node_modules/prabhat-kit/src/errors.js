function normalizeError(err) {
  return {
    message: err.message || "Unknown error",
    stack: err.stack,
  };
}

module.exports = { normalizeError };
async function retry(fn, retries) {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      attempt++;
    }
  }
}

module.exports = { retry };
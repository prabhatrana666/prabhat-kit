const store = new Map();

const cache = {
  get(key) {
    return store.get(key);
  },
  set(key, value) {
    store.set(key, value);
  },
  clear() {
    store.clear();
  },
};

module.exports = { cache };
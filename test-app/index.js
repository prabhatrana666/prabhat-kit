const { fetcher } = require("prabhat-kit");

(async () => {
  const data = await fetcher("https://jsonplaceholder.typicode.com/todos/", {
    retries: 2,
    timeout: 5000,
    useCache: true,
  });

  console.log("DATA:", data);
})();
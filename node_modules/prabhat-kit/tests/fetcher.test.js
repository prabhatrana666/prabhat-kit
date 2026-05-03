const fetcher = require("../src/fetcher");

test("should fetch data successfully", async () => {
  const data = await fetcher("https://jsonplaceholder.typicode.com/todos/1");
  expect(data).toHaveProperty("id");
});
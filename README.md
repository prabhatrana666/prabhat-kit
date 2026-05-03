# 🚀 prabhat-kit

> A lightweight, production-ready fetch utility with built-in retry, timeout, and caching support.

---

## ✨ Why prabhat-kit?

Handling API requests in JavaScript often leads to repetitive and error-prone code.

`prabhat-kit` simplifies this by providing a clean and reusable abstraction over `fetch`, making your applications more reliable and maintainable.

---

## ⚡ Features

* 🔁 Automatic retry for failed requests
* ⏱️ Built-in timeout handling
* 🧠 Smart in-memory caching
* ❌ Clean and consistent error handling
* 📦 Lightweight and dependency-free

---

## 📦 Installation

```bash
npm install prabhat-kit
```

---

## 🚀 Quick Usage

```js
const { fetcher } = require("prabhat-kit");

(async () => {
  const data = await fetcher("https://jsonplaceholder.typicode.com/todos/1", {
    retries: 2,
    timeout: 5000,
    useCache: true,
  });

  console.log(data);
})();
```

---

## ⚔️ Before vs After (Real Developer Pain)

### ❌ Without prabhat-kit

```js
try {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Request failed");
  }

  const data = await res.json();

  return data;
} catch (err) {
  console.error(err);
}
```

👉 Problems:

* No retry logic
* No timeout handling
* No caching
* Repetitive boilerplate

---

### ✅ With prabhat-kit

```js
const data = await fetcher(url, {
  retries: 3,
  timeout: 5000,
  useCache: true,
});
```

👉 Benefits:

* Cleaner code
* More reliable API calls
* Less boilerplate
* Better performance

---

## ⚙️ Options

| Option   | Type    | Default | Description                     |
| -------- | ------- | ------- | ------------------------------- |
| retries  | number  | 2       | Number of retry attempts        |
| timeout  | number  | 5000    | Request timeout in milliseconds |
| useCache | boolean | false   | Enable response caching         |

---

## 💼 Real-World Use Cases

* 🌐 Frontend apps (React / Next.js)
* 🔗 Backend services calling external APIs
* ⚙️ CLI tools fetching remote data
* 📊 Dashboards with repeated API calls

---

## 🧠 How it helps developers

* Reduces repetitive API handling code
* Improves app reliability with retries
* Enhances performance via caching
* Standardizes API logic across projects

---

## 📊 Example Output

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

---

## 📌 Roadmap

* [ ] TypeScript support
* [ ] Request cancellation (AbortController)
* [ ] Interceptors (like axios)
* [ ] Advanced caching strategies

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT © Prabhat Rana

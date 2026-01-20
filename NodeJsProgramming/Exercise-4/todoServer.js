const http = require("http");

let todos = [];
let idCounter = 1;

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function parseBody(req, callback) {
  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const parsed = body ? JSON.parse(body) : {};
      callback(null, parsed);
    } catch (err) {
      callback(err, null);
    }
  });
}

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/todos") {
    return sendJSON(res, 200, todos);
  }

  if (method === "POST" && url === "/todos") {
    return parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { error: "Invalid JSON" });

      if (!body.title) {
        return sendJSON(res, 400, { error: "Title is required" });
      }

      const newTodo = { id: idCounter++, title: body.title, done: false };
      todos.push(newTodo);

      return sendJSON(res, 201, newTodo);
    });
  }

  if (method === "PUT" && url.startsWith("/todos/")) {
    const id = parseInt(url.split("/")[2]);

    return parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { error: "Invalid JSON" });

      const todo = todos.find(t => t.id === id);
      if (!todo) return sendJSON(res, 404, { error: "Todo not found" });

      if (body.title !== undefined) todo.title = body.title;
      if (body.done !== undefined) todo.done = body.done;

      return sendJSON(res, 200, todo);
    });
  }

  if (method === "DELETE" && url.startsWith("/todos/")) {
    const id = parseInt(url.split("/")[2]);

    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return sendJSON(res, 404, { error: "Todo not found" });

    const deleted = todos.splice(index, 1);
    return sendJSON(res, 200, { message: "Deleted", todo: deleted[0] });
  }

  sendJSON(res, 404, { error: "Route not found" });
});

server.listen(3000, () => {
  console.log("✅ TODO API running on http://localhost:3000");
});

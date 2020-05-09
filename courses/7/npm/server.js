const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.write("hello world");
    res.end();
  }
});

server.listen(3000);
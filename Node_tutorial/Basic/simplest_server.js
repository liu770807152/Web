// http is included in node by default
let http = require('http');

let server = http.createServer();

server.on('request', (req, res) => {
  // console.log(req.url/req.headers);
  res.setHeader('Content-Type', 'text/html');
  if (req.url === '/') {
    // response data must be string or byte!!!
    res.end('<h1>Hello!</h1>');
  } else {
    res.end(JSON.stringify(['To be done.']));
  }
});

// default port number is 80!
server.listen(3000, () => {
  console.log('Launch success!');
});
let http = require('http');
let path = require('path');
let url = require('url');

class App {
  constructor() {
    this.server = http.createServer();
    this.reqEvent = {
      '/': function() {},
      '/static': function() {},
    };
    this.server.on('request', (req, res) => {
      // req.url is path?
      console.log(req.url);
      if (req.url in this.reqEvent) {
        this.reqEvent[req.url](req, res);
      } else {
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end('<h1>404 Error</h1>');
      }
    })
  }

  on(url, fn) {
    this.reqEvent[url] = fn;
  }

  run(port, callback) {
    this.server.listen(port, callback);
  }
}

module.exports = App;
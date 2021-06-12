let App = require('./encapsulate');

let app = new App();

app.on('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.end('This is home page.');
});

app.on('/static', (req, res) => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.end('This is static page.');
});

app.run(3000, () => {
  console.log('Launch success!');
});
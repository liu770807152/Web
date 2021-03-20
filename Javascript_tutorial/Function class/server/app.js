const express = require('express');
const { urlencoded, json } = require('body-parser');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

// 解决跨域问题
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST|GET');
  next();
})

app.post('/transfer', (req, res) => {
  let _code = req.body.code;
  _code = _code.replace(/let|const/g, 'var');
  res.send(_code);
})

app.listen(8080);

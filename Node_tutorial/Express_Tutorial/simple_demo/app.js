const express = require('express');
const fs = require('fs');

const app = express();

app.get('/todos', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }
    const db = JSON.parse(data);
    res.status(200).json(db.todos);
  });
});

app.get('/todos', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }
    const db = JSON.parse(data);
    const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id));
    if (!todo) {
      res.status(404).end();
    } else {
      res.status(200).json(todo);
    }
  });
});

app.listen(3000, () => {
  console.log('server running at http://localhost:3000/');
})
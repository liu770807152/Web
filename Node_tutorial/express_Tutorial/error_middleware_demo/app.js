const express = require("express");
const fs = require("fs");
const { getDB, saveDB } = require("./db");
const router = require('./router');

const app = express();

// set up parsing of application/json from req.body
app.use(express.json());
// set up parsing of application/x-www-form-urlencoded from req.body
app.use(express.urlencoded());

app.get("/todos", async (req, res, next) => {
  try {
    const db = await getDB();
    res.status(200).json(db.todos);
  } catch (err) {
    /*
    res.status(500),json({
      error: err.message
    });
    */
    // if ANYTHING is passed to next(), Express would see it as ERROR!!!
    // If so, all middleware in the middle of this router and error-handling router will be ignored!!!
    next(err);
    // next();   match next normal router
    // next('route');   match the next middleware inside this router
  }

  // fs.readFile('./db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     return res.status(500).json({
  //       error: err.message
  //     });
  //   }
  //   const db = JSON.parse(data);
  //   res.status(200).json(db.todos);
  // });
});

app.get("/todos/:id", async (req, res) => {
  try {
    const db = await getDB();
    const todo = db.todos.find(
      (todo) => todo.id === Number.parseInt(req.params.id)
    );
    if (!todo) {
      res.status(404).end();
    } else {
      res.status(200).json(todo);
    }
  } catch (err) {
    next(err);
  }

  // fs.readFile('./db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     return res.status(500).json({
  //       error: err.message
  //     });
  //   }
  //   const db = JSON.parse(data);
  //   const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id));
  //   if (!todo) {
  //     res.status(404).end();
  //   } else {
  //     res.status(200).json(todo);
  //   }
  // });
});

app.post("/todos", async (req, res) => {
  try {
    // 1. get req.body
    const todo = req.body;
    // 2. validate data
    if (!todo.title) {
      return res.status(422).json({
        error: 'The field "title" is required!',
      });
    }
    // 3. store data into db
    const db = await getDB();
    const lastTodo = db.todos[db.todos.length - 1];
    todo.id = lastTodo ? lastTodo.id + 1 : 1;
    db.todos.push(todo);
    await saveDB(db);
    // 4. send response
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

app.patch('/todos/:id', async (req, res) => {
  try {
    // 1. get req.body
    const todo = req.body;
    // 2. search db
    const db = await getDB();
    const result = db.todos.find(todo => todo.id === Number.parseInt(req.params.id));
    if (!result) {
      return res.status(404).end();
    }
    // 3. validate data
    if (!todo.title) {
      return res.status(422).json({
        error: 'The field "title" is required!',
      });
    }
    // 4. update database
    Object.assign(result, todo);
    await saveDB(db);
    // 5. return response
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const todoId = Number.parseInt(req.params.id);
    const db = getDB();
    db.todos.findIndex(todo => todo.id === todoId);
    if (index === -1) {
      return res.status(404).end();
    }
    db.todos.splice(index, 1);
    await saveDB(db);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// load router
// app.use(router);

// set suffix of router path (must starts with /abc)
app.use('/users', router);

// add an error handling middleware
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({
		error: err.message
	});
});

// add a middleware handling 404
// usually 404 middleware is placed at the end of all other middleware
app.use((req, res, next) => {
  res.status(404).send('404 not found.');
});

app.listen(3000, () => {
  console.log("server running at http://localhost:3000/");
});

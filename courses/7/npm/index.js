const express = require("express");
const app = express();

// http://   example.com   /students/1              ?age=18
// protocol  domain        path   route params      query params

// www.example.com
// api.example.com/v1
// www.example.com/api/v1

// global middleware
// role: admin, user
app.use(function (req, res, next) {
  req.role = jwt.role;
  next();
});

// method path, logic function
app.get("/students/:id", function (req, res) {
  const { id } = req.params;
  const { age } = req.query;
  // undefined
  res.send({ id, age, time: req.time });
});

app.post("/hello", function (req, res) {
  res.send("hi");
});

app.use(function (err, req, res, next) {
  console.log("here");
  res.send(err);
});

app.listen(4000, () => {
  console.log("server started at port 4000");
});

// error handler (special middleware function)

//  示例路徑 /block /level /room body 

// router

const express = require("express");
const app = express();
app.use(express.json());

// app.use(function (req, res, next) {
//     next();
// });

app.get("/people", (req, res) => {
//    const {name} = req.body;
//    res.send({name});
    res.send("people");
});

app.get("/people/:id", function (req, res) {
    const {id} = req.params;
    const {age} = req.query;
    res.send({id, age});
});

app.post("/hello", function (req, res) {
    console.log("hello there");
    const {name} = req.body; //怎麼把age一起send
    
    res.send({name});
});

app.listen(5000, () => {
    console.log("server started at port 5000");
})
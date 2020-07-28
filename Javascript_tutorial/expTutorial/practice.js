const express = require("express");
const app = express();

app.use(express.json());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", '*');
//     next();
// })

const posts = [];
let currentID = 1;

app.get("/posts", (req, res) => {
    return res.status(200).json(post);
})

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(i => i.id === Number(id));
    if (!post) {
        return res.sendStatus(404);
    }
    return res.status(200).json(post);    
})

app.post("/posts", (req, res) => {
    const {author, content} = req.body;
    const post = {author, content, id: currentID++};
    posts.push(post);
    return res.status(201).json(post);
})

app.put("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { author, content } = req.body;
    const post = posts.find(i => i.id === Number(id));
    if (!post) {
        return res.sendStatus(404);
    }
    post.author = author;
    post.content = content;
    return res.json(post);
})

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(i => i.id === Number(id));
    if (postIndex === -1) {
        return res.sendStatus(404);
    }
    const post = posts.splice(postIndex, 1);
    // 1. 200OK
    // 2. 200 + deleted resource
    // 3. 204 (no content)
    return res.status(200).json(post);    
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})
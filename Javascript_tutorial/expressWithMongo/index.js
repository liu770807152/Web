require('dotenv').config();

const express = require('express');
const routes = require('./routes.js');
const { connectToDB } = require('./utils/db');
const app = express();

app.use(express.json());
app.use('/api', routes);

connectToDB();

app.listen(3000, () => {
    console.log('listening on port 3000')
})
const express = require('express');

const app = express();

const myLogger = (req) => {
	console.log(req.method, req.url, Date.now());
}

// all middleware must contain next(), otherwise it would get stuck
app.use((req, res, next) => {
	console.log('Middleware passed.');
	myLogger(req);
	// continue middleware matching process
	next();
});

app.get('/', (req, res) => {
	res.send('get /');
});

app.get('/about', (req, res) => {
	res.send('get /about');
});

app.post('/login', (req, res) => {
	res.send('post /login');
});
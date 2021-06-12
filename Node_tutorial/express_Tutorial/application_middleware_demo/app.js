const express = require('express');

const app = express();

const myLogger = (req) => {
	console.log(req.method, req.url, Date.now());
}

// built-in middleware encapsulated in apis, like
// function json(options) {
// 	return (req, res, next) => {
// 		...
// 	}
// }
app.use(express.json());
app.use(express.urlencoded());

// all middleware must contain next(), otherwise it would get stuck
// unlimit query path
app.use((req, res, next) => {
	console.log('Middleware passed.');
	// All middleware share the same req & res object.
	// Thus we can add a new property to req/res and the middleware after could access it.
	req.foo = () => {
		console.log('Add a foo into req.');
	}
	myLogger(req);
	// continue middleware matching process
	next();
});

// limit query path
app.use('/user/:id', (req, res, next) => {
	console.log('Request type:', req.method);
	next();
});

// limit query path + multiple middleware functions
app.use('/user/:id', (req, res, next) => {
	console.log('Request URL:', req.originalUrl);
	// if the user ID is 0, skip to the next router
	if (req.params.id === 0)
		next('route');
	// otherwise pass the control to the next middleware in this stack
	else
		next();
}, (req, res, next) => {
	console.log('Request type:', req.method);
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

app.listen(3000, () => {
	console.log('Server launched at http://localhost:3000/');
})
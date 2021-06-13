/**
 * Implement APIs from https://github.com/gothinkster/realworld
 */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');
const errorHandler = require('./middleware/error-handler');
require('./model');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));

// check "Access-Control-Allow-Origin: *"
app.use(cors());

app.use(express.json());

// load routers
app.use('/api', router);

// load error handler
app.use(errorHandler());

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
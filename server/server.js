const express = require('express');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { PORT } = require('./config/config');

const app = express();

require('./config/mongoose');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}. Click to view http://localhost:${PORT}`));
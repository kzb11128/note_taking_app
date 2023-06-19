const express = require('express');

const dbRouter = require('./db.js');

const app = express();

app.use('/db', dbRouter);

module.exports = app;

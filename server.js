const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const api = require('./public/assets/js/index.js');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);



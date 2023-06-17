const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
// const api = require('./assets/js/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);
app.use(express.static('public'));

app.get(['/', '/index'], (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
console.log(`Listening on at http://localhost:${PORT}`)
);



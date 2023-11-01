//! This file contains the server data.

const express = require('express'); 
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3002;

//* Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const userNotes = [];
const allNotes = require('./db/db.json')

// Homepage whenever you open the localhost ("localhost:PORT/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))

    console.log(`${req.method} request recieved to get note screen.`)
});

app.get('/api/notes', (req, res) => {
  res.json(allNotes.slice(1));
});






app.listen(PORT, () =>
  console.log(`port is http://localhost:${PORT}`)
);
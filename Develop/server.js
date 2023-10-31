//! This file contains the server data.

const express = require('express'); 
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3001;

//* Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const userNotes = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});




// const allNotes = require('./db/db.json');
// app.get('/api/notes', (req, res) => {
//     res.json
// })

// app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// });  

app.listen(PORT, () =>
  console.log(`port is http://localhost:${PORT}`)
);
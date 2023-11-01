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

//* Homepage whenever you open the localhost ("localhost:PORT/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
    console.log(`Hello! ${req.method}Welcome to Express Note Taker!`)
});

//* The /notes page when "Get Started is clicked" (localhost:PORT/notes)  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))

    console.log(`${req.method} request recieved to go to /notes.`)
});

//* This shows the notes that are in db.json file.
app.get('/api/notes', (req, res) => {
  res.json(allNotes); //<--- Might need "res.json(allNotes.slice(1));"
});

//* Default page. Handles invalid /* cases. Returns 404 page.
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/404.html'))
);

// TODO: Create code that saves new notes to db.json
// TODO: Create code that displays saved notes in db.json
// TODO: Create code that deletes a note from db.json when user selects delete. 
// TODO: Create code that displays that the note has been deleted.





app.listen(PORT, () =>
  console.log(`port is http://localhost:${PORT}`)
);
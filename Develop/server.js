//? This file contains the server data.

const express = require('express'); 
const fs = require('fs');
const path = require('path');

//* Helper functions from /fsUtils.js
const {
  readFromFile,
  writeToFile, 
  readAndAppend,
} = require('./helpers/fsUtils');


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
  // console.log('Hello, the SERVER is glad to see you!');
  
  res.json(allNotes);
});


//* Default page. Handles invalid /* cases. Returns 404 page.
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/404.html'))
);


//* Function that saves new notes to db.json and displays them back on the screen
app.post('/api/notes', (req,res) => {
  console.info(`${req.method} request recieved to add a note`);
  
  const { title, text } = req.body;
  
  if (req.body) {
    const newNote = {
      title,
      text
    };
    
    readAndAppend(newNote, './db/db.json');
    res.json('new note added sucessfully!');
  } else {
    res.error('Error with adding your note')
  } 
});




app.listen(PORT, () =>
console.log(`port is http://localhost:${PORT}`)
);

////: Create code that displays saved notes in db.json
// TODO: Create code that deletes a note from db.json when user selects delete. 
// TODO: Create code that displays that the note has been deleted.

// TODO: Find out how to show a saved note on the right side column whenever it is clicked.

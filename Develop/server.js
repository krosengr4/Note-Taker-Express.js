//! This file contains the server data.

// Import dependencies
const express = require('express'); 
const fs = require('fs');
const path = require('path');

// import middlewear to create server
const app = express();

// Set up port listener
const PORT = process.env.PORT || 3002;

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// require the json where notes are stored
const userNotes = require('./db/db.json');


// Homepage whenever you open the localhost ("localhost:PORT/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
  console.log(`Hello! ${req.method}Welcome to Express Note Taker!`)
});

// The /notes page when "Get Started is clicked" (localhost:PORT/notes)  
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
  
  console.log(`${req.method} request recieved to go to /notes.`)
});

// This shows the notes that are in db.json file.
app.get('/api/notes', (req, res) => {
  // console.log('Hello, the SERVER is glad to see you!');
  
  res.json(userNotes);
});


// Default page. Handles invalid /* cases. Returns 404 page.
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/404.html'))
);

// Function to create and display new note
function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray)) {
    notesArray = [];
  };

  if (notesArray.length === 0) {
    notesArray.push(0);
  };

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  console.log('You created a note');

  return newNote;
};

// Post route that creates a new note by calling createNewNote function.
app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, userNotes);
  res.json(newNote);
});

// Function that will delete a note
function deleteNote(id, notesArray) {
  for (let i = 0; i < notesArray.length; i++) {
    let note = notesArray[i];

    if (note.id == id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
      );
      console.log('You deleted a note');

      break;
    }
  }
};

// delete route that deletes a note by calling deleteNote function
app.delete('/api/notes/:id', (req,res) => {
  deleteNote(req.params.id, userNotes);
  res.json(true);
});


app.listen(PORT, () =>
console.log(`port is http://localhost:${PORT}`)
);

////: Create code that displays saved notes in db.json
//// Create code that deletes a note from db.json when user selects delete. 
//// Create code that displays that the note has been deleted.
//// Find out how to show a saved note on the right side column whenever it is clicked.

//! This file contains the server data.

// Import dependencies
const express = require('express'); 
const fs = require('fs');
const path = require('path');

// Helper functions from /fsUtils.js
// const {
//   readFromFile,
//   writeToFile, 
//   readAndAppend,
// } = require('./helpers/fsUtils');

// import middlewear to create server
const app = express();
// Set up port listener
const PORT = process.env.PORT || 3002;

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Array for user notes
// let userNotes = [];
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

app.delete('/api/notes/:id', (req,res) => {
  deleteNote(req.params.id, userNotes);
  res.json(true);
});


// app.delete('/api/notes/:id', (req, res) => {
//   deleteNote(req.params.id, userNotes);
//   // alert('Note deleted');
//   res.json(true);
// });





app.listen(PORT, () =>
console.log(`port is http://localhost:${PORT}`)
);

////: Create code that displays saved notes in db.json
// TODO: Create code that deletes a note from db.json when user selects delete. 
// TODO: Create code that displays that the note has been deleted.

// TODO: Find out how to show a saved note on the right side column whenever it is clicked.




// app.delete("/api/notes/:id", function (req, res) {
  //   try {
    //     userNotes = fs.readFileSync('./db/db.json', 'utf8');
    //     userNotes = JSON.parse(userNotes);
    //     userNotes = userNotes.filter(function(note) {
      //       return note.id != req.params.id;
      //     });
      //     userNotes = JSON.stringify(userNotes);
      
      //     fs.writeFile('./db/db.json', userNotes, "utf8", function(err) {
        //       if (err) throw err;
        //     });
        //     res.send(JSON.parse(userNotes));
        //   } catch (err) {
          //     throw err;
          //   }
          // });
          
          
          
          
          // console.info(`${req.method} request recieved to add a note`);
          
          // const { title, text } = req.body;
          
          // if (req.body) {
            //   const newNote = {
              //     title,
              //     text
              //   };
              
              //   readAndAppend(newNote, './db/db.json');
              //   res.json('new note added sucessfully!');
              // } else {
                //   res.error('Error with adding your note')
                // }
                
                

                // function deleteNote(id, userNotes) {
                //   for (i=0; i < userNotes.length; i++) {
                //     let note = userNotes[i];
                    
                //     if (note.id == id) {
                //       userNotes.splice(i, 1);
                //       fs.writeFileSync(
                //         path.join(__dirname, './db/db.json'),
                //         JSON.stringify(userNotes, null, 2)
                //         );
                        
                //         break;
                //       }
                //     }
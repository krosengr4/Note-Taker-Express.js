# Note-Taker-Express.js
A note taking application that can be used to write and save notes using express.js to retrieve from a json file.


### Pseudo Coding:
1- Import express, path, and fs with require.
2- Create a server (app = express()), port listener, and array for noteData. 
3- Set up middlewear (app.use & express.json)
4- Do an api call response for the notes. 
5- Have ^that^ data sent to browser in form of array object.
6- Write new note to the json file and send back to browser.
7- Delete existing note and reading the json file |
8- write the new notes to the file and sending back to the browser

### Acceptance Criteria:
<!-- // When openig Note Taker, there is a landing page with a link to the notes page. -->

<!--* On the notes page, 
there are notes in the left hand column and empty fields to eneter a new note -->

<!-- // When entering a new note title and text, a "save note" and "clear form" button appear in the upper right -->

<!-- When clicking on 'save note', 
that note along with other saved notes appear in the left hand column and the top right buttons dissapear -->

<!-- When clicking on a previously saved note, 
that note appears in the right hand column, and a 'New Note' button appears in the navigation -->

<!-- When clicking on the 'New Note' button ^, 
 then I am presented with empty fields for a new note title and text, and the button dissapears-->
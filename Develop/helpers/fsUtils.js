//? This file contains helper functions to help read, write, and append data.

const fs = require('fs');
const util = require('util');

//* Function to read the file. Using promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile); 

//* Function to write data to the JSON file. It takes a destination(/db/db.json) and content(newNote.title&text).
const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
    err ? console.log(err) : console.info(`\nData written to ${destination}`)
    );

//* Function to read data from a file and append its content. Takes in content (title & text) and file (db.json).
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err,data) => {
        if (err) {
            console.log(err);
        } else {
            const parsedData = JSON.parse(data); 
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

//* Export our helper functions
module.exports = { readFromFile, writeToFile, readAndAppend };
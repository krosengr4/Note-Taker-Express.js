const express = require('express'); 
const fs = require('fs');
const path = require('path');

const userNotes = [];

const app = express();

const PORT = 3000;
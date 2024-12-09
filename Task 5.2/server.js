// Express server setup for website
const express = require('express');
const path = require('path');
const app = express();
const Model = require('./src/model');

// Set our server port to 3000
const port = 3000;

// Tell Express to serve our webpage files (HTML, CSS, images) from public folder in current directory
app.use(express.static(path.join(__dirname, 'public')));

// Tell Express to serve JavaScript files from src folder and label them as JavaScript files for the browser
app.use('/src', (req, res, next) => {
    if (req.path.endsWith('.js')) {
        res.type('application/javascript');
    }
    next();
}, express.static(path.join(__dirname, 'src')));

// Tell Express to understand JSON data and form submissions from the browser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create endpoint that takes two numbers from URL and returns their sum
app.get('/addTwoNumbers', (req, res) => {
    const n1 = req.query.n1;
    const n2 = req.query.n2;
    const result = Model.addTwoNumbers(n1, n2);
    res.json({ statuscode: 200, data: result }); 
});

// Start the server and console log what port it's running on
app.listen(port, () => {
    console.log(`App listening to: ${port}`);
});
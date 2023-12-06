// Create web server 

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create app
const app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log('Error connecting to database');
        console.log(err);
    })

// Set view engine
app.set('view engine', 'ejs');

// Set body parser
app.use(bodyParser.urlencoded({extended: true}));

// Set public folder
app.use(express.static('public'));

// Set routes
app.use(require('./routes/comments'));

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
})
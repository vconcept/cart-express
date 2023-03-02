const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

// Call express app and set it to use it in our application
const app = express();
app.use(express.json());

// Setup our server file to serve static contents generated from React. This works in Production env only
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Config our server file to connect to MongoDB database and start running the server to listen to requests on port 4000)
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));
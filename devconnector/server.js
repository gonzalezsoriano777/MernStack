const express = require('express');
const app = express();
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

// DB Config
const db = require('./config/keys').mongoURI; // this is the db variable (database)

// Connect to MongoDB
mongoose
.connect(db, { useNewUrlParser: true, useCreateIndex: true, }) // What is added after db is for the deprecation... minor issue
.then(() => console.log('MongoDB connected')) // Once it connects to MongoDB it will say this
.catch(err => console.log(err)); // If there is an error from connecting to MongoDB then it will put an error in the nodemon server

app.get('/', (req, res) => res.send('Hello'));

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', post);

const port = process.env.PORT || 8080; // To run Heroku using the port you must use 'process.env.PORT'

app.listen(port, () => console.log(`Server running on port ${port}`)) // Using the back tics runs the ES6 for JS and you can run the server and call the port using the variable syntax .. which outputs whatever the port is

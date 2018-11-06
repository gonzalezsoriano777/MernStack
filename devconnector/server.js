const express = require('express');
const app = express()

app.get('/', (req, res) => res.send('Hello'));

const port = process.env.PORT || 8080; // To run Heroku using the port you must use 'process.env.PORT'

app.listen(port, () => console.log(`Server running on port ${port}`)) // Using the back tics runs the ES6 for JS and you can run the server and call the port using the variable syntax .. which outputs whatever the port is
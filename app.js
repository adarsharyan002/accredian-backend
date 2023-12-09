const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/user');
var cors = require('cors')

const app = express();

const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/users', usersRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

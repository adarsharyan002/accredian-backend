const express = require('express');
const usersRouter = require('./routes/user');
var cors = require('cors')

const app = express();

const port = 3000;

// Middleware
app.use(express.json());

app.use(cors())

// Routes
app.use('/users', usersRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

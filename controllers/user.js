const bcrypt = require('bcrypt');
const pool = require('../db/db'); 

async function signUp(req, res) {
  const { username, email, password } = req.body;

  // Check if any field is empty
  if (!username || !email || !password) {
    res.status(400).send('All fields are required');
    return;
  }

  // Check if the email already exists
  try {
    const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const emailCheckResult = await pool.query(emailCheckQuery, [email]);

    if (emailCheckResult.rowCount > 0) {
      res.status(400).send('Email already exists');
      return;
    }

    // If email is unique, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const INSERT_USER_QUERY = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    await pool.query(INSERT_USER_QUERY, [username, email, hashedPassword]);

    res.status(200).send('Signed up successfully');
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Error signing up');
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  // Check if any field is empty
  if (!email || !password) {
    res.status(400).send('Email and password are required');
    return;
  }

  // Check if the email exists in the database
  try {
    const SELECT_USER_QUERY = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(SELECT_USER_QUERY, [email]);

    if (userResult.rowCount === 0) {
      res.status(401).send('Invalid credentials');
      return;
    }

    const user = userResult.rows[0];

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).send('Invalid credentials');
      return;
    }

    res.status(200).send('Logged in successfully');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
}

module.exports = { signUp, login };

const express = require('express');
const userController = require('../controllers/user');
const multer = require('multer');


const {signUp,login} = userController
const upload = multer();


const router = express.Router();

router.post('/signup',upload.none(), signUp);
router.post('/login',upload.none(), login);

module.exports = router;

const express = require('express');
const router = express.Router();        //creates express application object
const userController = require('../controllers/userController');     //import userController to use register and login functions

router.post('/register', userController.register); //POST/register request from client will call the register function from controller
router.post('/login', userController.login); //POST/login request will call login function

module.exports = router;        //exporting the router object to be used in app server
//Handles incoming requests for user operations like registration and login

const bcrypt = require('bcrypt');       // for password hashing to secure them before storing in db
const jwt = require('jsonwebtoken');        //for creating and verifying JSON Web Tokens which handle clients authentication
const userModel = require('../models/userModel');    //importing user model functions to use addUser and fetchUserByUsername
require('dotenv').config();         //package to read file .env file: a hidden file to put configuration values like APIs, keys, passwords, and ports outside the port

const jwtSecret = process.env.JWT_SECRET;   //JWT secret key stored in .env

//Handler for user registration
exports.register = async (req, res) =>{
    const {username, password} = req.body;      //contains data sent by client - username and password

    //input validation - to ensure the user sent both username and password
    if(!username || !password){
        return res.status(400).json({error: 'Username and password required'});
        //responds with http status 400 to declare BAD REQUEST if data is missing
    }

    try{
        //check for already existing users
        const userExist = await userModel.fetchUserByUsername(username);
        if (userExist){

            //check db if username already exists
            //respond with http status 409 to declaree CONFLICT if username already exists
            return res.status(409).json({error: 'Username already exists'});
        
        }

        //hashing the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        //create new user in db
        const newUser = await userModel.addUser(username, hashedPassword);
        
        res.status(201).json({user:newUser});
        //respond with http status to declare CREATED 

    } catch (err) {
        console.error(err);
        res.status(500).json({error:'Server error during registration'});
        //responds http status 500 for INTERNAL SERVER ERROR  just in case
    }
};

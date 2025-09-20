//Function code between request and route handle
const jwt = require('jsonwebtoken');    //for creating and verifying JSON Web Tokens which handle clients authentication
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET; //JWT secret key stored in .env - same secret used in userController

//creating exportable middleware function to be reused in routes
module.exports = (req, res, next) =>{
    //next calls next route handles 
    const authHeader = req.headers.authorization;       //read authorization header from request
    
    //validation function
    //checks if authorization header exists, if client did not send it i request
    //checks that the token is of bearer type 
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({error:'Authorization header missing'});
        //HTTP error for UNAUTHORIZED
    }
    //token extraction from header
    const token = authHeader.split('')[1];
    // authHeader = "Bearer token123abcd"
    // authHeader.split
    // token = "token123abcd""

    //Verification of token with secret key
    // decode userId and username if JWT is valid
    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;     //store user decoded token payload (userId and username)
        next();     //calls next route handler
    } catch (error) {
        return res.status(401).json({error: 'Token Invalid or Expired'});
    }

};
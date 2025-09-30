const express = require('express');
const router = express.Router();        //creates express application object
const userController = require('../controllers/userController');     //import userController to use register and login functions

/**
 * @swagger
 * tags:
 *  name:Users
 *  description: User management and authentication
 * 
 * ----- This block groupt register and login endpoints under the "Users" in API Doc
 */

/**
 * @swagger
 * /users/register:
 *  post:
 *      summary: Register a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type:object
 *                       required:
 *                          -username
 *                          -password
 *                       properties:
 *                          username
 *                              type:string
 *                              example:testuser
 *                           password:
 *                               type:string
 *                               example: password123
 *       responses:
 *          201:
 *            description: User successfully registered
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user:
 *                            type: object
 *                            properties:
 *                              user_id:
 *                                  type: integer
 *                              username:
 *                                  type: string
 *          400:
 *            description: Missing username or password
 *          409:
 *            description: Username already exists
 *          500:
 *            description: Server error during registration
 *                  
 * ---- A Swagger block that will document the 'users/register' wndpoint:
 * it'll accept POST req JSOn body of 'username' + 'password'
 * it'll return res codes for success or err
 */
router.post('/register', userController.register); //POST/register request from client will call the register function from controller

/**
 * @swagger
 * /users/login:
 *  post:
 *    summary: Login a user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type:object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                example: testuser
 *              passwordd:
 *                type: string
 *                example: password123
 *     responses:
 *      200:
 *        description: Successful login with JWT token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: JWT authentication token
 *      400:
 *        description: Missing username or password
 *      401:
 *        description: Invalid credentials
 *      500:
 *        description: Server error during login
 * 
 * Swagger block that will document the '/users/login' endpoint. 
 * It'll accept a POST req with 'username' and 'password'
 * Returns error on failure
 */

router.post('/login', userController.login); //POST/login request will call login function

module.exports = router;        //exporting the router object to be used in app server
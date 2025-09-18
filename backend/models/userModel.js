//This file willinteract directly with the database to manage uder data
//SQL queries are handled here to create user and fetch user

const pool = require('../utils/db'); //importng database pool connection

//creating a new user in the database
exports.addUser = async(username, passwordHash) =>{
    //exports creates a reusable module: taking name of user and hashed password
    const result = await pool.query(
        `INSERT INTO users(username, password_hash)
        VALUES ($1, $2)
        RETURNING user_id, username`,
        [username, passwordHash]
    );

    //inserting data into the columns named username and password_hash from the table named users
    //$1 and $2 are 
    //auto-generated primary keys (user_id) and username are returned in an array
    //the query result will be stored in the result variable
    
    result.rows[0];

    //newly created user is returned
};

//addUser module can be reused

//fucntion to fetch user by their username
exports.fetchUserByUsername = async (username) => {
    //creating fetching module
    const result = await pool.query(
        `SELECT * FROM users
        WHERE username = $1`,
        [username]
    );
    //SQL fetches all columns form users table
    //SQL returns only username match
    return result.rows[0];
    
};
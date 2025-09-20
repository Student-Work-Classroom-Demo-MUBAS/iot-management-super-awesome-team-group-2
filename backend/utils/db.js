const { Pool } = require('pg');
require('dotenv').config();   //it will load variables from .env

const pool = new Pool({
  user: process.env.DB_USER,      //postgres       
  host: process.env.DB_HOST,        //localhost
  database: process.env.DB_DATABASE,             //iot_project_db 
  password: process.env.DB_PASSWORD,    //sparkles02 
  port: process.env.DB_PORT,            //5432
});
//credentials have been left here for collaborative development purposes, they will be removed at deployment

module.exports = pool;

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',          
  host: 'localhost',
  database: 'iot_project_db', 
  password: 'sparkles02',  
  port: 5432,
});

module.exports = pool;

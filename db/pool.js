const {Pool} = require('pg');
require('dotenv').config(); //loads the dotenv module, then reads the ENV file and loads all env. variables into process.env

const db_url = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: db_url,
});

console.log('Database connections established');

module.exports = pool;


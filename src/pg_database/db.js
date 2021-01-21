const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'cycinfo',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;

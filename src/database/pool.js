
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  database: "cycmetrics",
  host: "localhost",
  port: 5432,
});

module.exports = pool;

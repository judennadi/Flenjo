const { Pool } = require("pg");

let pool;
if (process.env.NODE_ENV === "production") {
  pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
} else if (process.env.NODE_ENV === "developement") {
  pool = new Pool();
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};

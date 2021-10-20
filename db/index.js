const { Pool } = require("pg");

let pool;
if (process.env.NODE_ENV === "production") {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
} else if (process.env.NODE_ENV === "development") {
  pool = new Pool();
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};

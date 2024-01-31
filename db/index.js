const { Pool } = require("pg");

let pool;
if (process.env.NODE_ENV === "prod") {
  pool = new Pool({ connectionString: process.env.PROD_DB_URL, ssl: { rejectUnauthorized: false } });
} else if (process.env.NODE_ENV === "dev") {
  pool = new Pool({ connectionString: process.env.DEV_DB_URL, ssl: { rejectUnauthorized: false } });
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};

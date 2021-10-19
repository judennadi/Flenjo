const { Pool } = require("pg");

const dbString = process.env.DATABASE_URL;
let pool;
if (process.env.NODE_ENV === "production") {
  pool = new Pool({ connectionString: dbString });
} else {
  pool = new Pool();
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};

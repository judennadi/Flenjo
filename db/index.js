const { Pool } = require("pg");
const devConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGPASSWORD,
  password: process.env.PGDATABASE,
  port: process.env.PGPORT,
};
const proConfig = process.env.DATABASE_URL; //heroku add
const pool = new Pool({
  connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

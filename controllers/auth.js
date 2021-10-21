const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  const table = `CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR NOT NULL
  )`;
  checkUser = "SELECT * FROM users WHERE username = $1 OR email = $2";
  const insert =
    "INSERT INTO users(id, name, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *";

  try {
    await db.query(table);
    const oldUser = await db.query(checkUser, [username, email]);
    if (oldUser.rows.length) {
      res.status(400).json({ error: "user already exist" });
      return;
    }

    const salt = await bcrypt.genSalt();
    hashedPassword = await bcrypt.hash(password, salt);
    const { rows } = await db.query(insert, [uuidv4(), name, username, email, hashedPassword]);
    console.log(rows);

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.cookie("token", token, { httpOnly: true, maxAge: process.env.MAX_AGE * 1000 });
    res.status(201).json({ data: rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  checkUser = "SELECT * FROM users WHERE email = $1";

  try {
    const { rows } = await db.query(checkUser, [email]);
    if (!rows.length) {
      res.status(400).json({ error: "incorrect email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      res.status(400).json({ error: "incorrect email or password" });
      return;
    }

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.cookie("token", token, { httpOnly: true, maxAge: process.env.MAX_AGE * 1000 });
    res.status(201).json({ data: rows[0] });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login, register };

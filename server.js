require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
// const db = require('./db');
const restaurantRoutes = require("./routes/restaurants");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("server running");
});

app.use("/restaurants", restaurantRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("ported");
  });
}

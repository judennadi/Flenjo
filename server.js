require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const restaurantRoutes = require("./routes/restaurants");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);
app.use("/auth", authRoutes);

if (process.env.NODE_ENV === "prod") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("ported");
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});

// npx browserslist@latest --update-db

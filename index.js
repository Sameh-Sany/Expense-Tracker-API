const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const db = require("./config/db");

app.use(express.json());

// database connection
db.connect();

// server connection
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

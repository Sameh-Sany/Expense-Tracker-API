const express = require("express");
const app = express();
const db = require("./src/config/db");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const port = process.env.PORT || 3000;

// import routes
const authRoutes = require("./src/routes/auth");
const categoriesRoutes = require("./src/routes/categories");

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);

// error handler
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// server connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

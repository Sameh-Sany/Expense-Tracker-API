const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.PROD_DB_NAME,
  process.env.PROD_DB_USERNAME,
  process.env.PROD_DB_PASSWORD,
  {
    host: process.env.PROD_DB_HOSTNAME,
    dialect: "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Sync the model with the database (for development purposes only, not recommended in production)
if (process.env.NODE_ENV === "development") {
  sequelize.sync({ alter: true }).then(() => {
    console.log("Database and tables synchronized.");
  });
}

module.exports = sequelize;

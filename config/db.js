const { sequelize } = require("../models/index");
// database connection
exports.connect = async function initializeApp() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

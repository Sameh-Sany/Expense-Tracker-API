const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter a category name",
      },
      notEmpty: {
        msg: "Please enter a category name",
      },
    },
  },
});

module.exports = Category;

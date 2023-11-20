const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Category = require("./category");
const User = require("./user");

const Expense = sequelize.define("Expense", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define the relations

Expense.belongsTo(Category, { foreignKey: "categoryId" });
Expense.belongsTo(User, { foreignKey: "userId" });

module.exports = Expense;

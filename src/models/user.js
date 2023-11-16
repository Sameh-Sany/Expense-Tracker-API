const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter your first name",
      },
      notEmpty: {
        msg: "Please enter your first name",
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter your last name",
      },
      notEmpty: {
        msg: "Please enter your last name",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter your email",
      },
      notEmpty: {
        msg: "Please enter your email",
      },
      isEmail: {
        msg: "Please enter a valid email",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter your password",
      },
      notEmpty: {
        msg: "Please enter your password",
      },
    },
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter your age",
      },
      notEmpty: {
        msg: "Please enter your age",
      },
      isInt: {
        msg: "Please enter a valid age",
      },
    },
  },
});

User.prototype.toJSON = function () {
  const user = { ...this.get() };
  delete user.password;
  return user;
};

module.exports = User;

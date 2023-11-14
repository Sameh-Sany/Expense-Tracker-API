module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Add other fields as needed
  });

  // Define associations if needed
  // User.associate = models => {
  //   // Define associations here
  // };
  return User;
};

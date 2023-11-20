require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkAuthentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: no token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed: invalid token" });
  }
};

module.exports = checkAuthentication;

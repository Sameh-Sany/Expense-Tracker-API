const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validations/auth");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, age } = req.body;

    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
    });
    await user.save();
    res.status(201).json({
      message: "User was registered successfully",
      statusCode: 201,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      message: "User was logged in successfully",
      statusCode: 200,
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

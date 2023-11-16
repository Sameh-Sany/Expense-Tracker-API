const Joi = require("joi");

// Validation for user registration
exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    age: Joi.number().integer().min(18).max(100).required(),
  });
  return schema.validate(data);
};

// Validation for user login
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

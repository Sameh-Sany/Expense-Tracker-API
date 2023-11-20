const Joi = require("joi");

exports.createCategoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

exports.updateCategoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

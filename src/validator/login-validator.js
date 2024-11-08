const Joi = require("joi");

exports.loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().strip(),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/),
});

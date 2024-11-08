const { valid } = require("joi");
const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email: Joi.string().email({ tlds: false }).required().strip(),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
});

// const test = {
//   firtName: "a1",
//   lastName: "a2",
//   email: "asdqwd@mail.com",
//   password: "a111111",
//   confirmPassword: "a111111",
// };

// const { value, error } = this.registerSchema.validate(test);

// console.log(value);
// console.log("----------------------------");
// console.log(error);

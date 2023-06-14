const Joi = require("joi");

const RegisterUser = Joi.object({
  email: Joi.string().email().required(),
});

// regex minimum 6 characters, and at least one number
const VerifyUser = Joi.object({
  token: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9]).{6,}$/)
    .required(),
});

const AuthUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  RegisterUser,
  VerifyUser,
  AuthUser,
};

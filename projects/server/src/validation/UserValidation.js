const Joi = require("joi");
const { phoneRegExp } = require("./AdminDataValidation");

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

const UpdateBio = Joi.object({
  username: Joi.string().max(50).empty("").allow(null),
  phone: Joi.string().pattern(phoneRegExp).empty("").allow(null),
});

const UpdatePassword = Joi.object({
  oldPassword: Joi.string().pattern(/^(?=.*[0-9]).{6,}$/).required(),
  newPassword: Joi.string().pattern(/^(?=.*[0-9]).{6,}$/).required(),
});

module.exports = {
  RegisterUser,
  VerifyUser,
  AuthUser,
  UpdateBio,
  UpdatePassword,
};

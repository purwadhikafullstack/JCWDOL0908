const Joi = require("joi");

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwordRegex = /^(?=.*\d).{6,}$/;

const EditDataAdmin = Joi.object({
  username: Joi.string().min(5).max(45),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phoneNumber: Joi.string().pattern(phoneRegExp),
  password: Joi.string().pattern(passwordRegex),
  id_warehouse: Joi.number(),
});

module.exports = {
  EditDataAdmin,
};

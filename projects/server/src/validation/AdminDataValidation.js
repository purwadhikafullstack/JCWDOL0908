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

const CreateDataAdmin = Joi.object({
  username: Joi.string().min(5).max(45).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone_number: Joi.string().pattern(phoneRegExp).required(),
  password: Joi.string().pattern(passwordRegex).required(),
  id_warehouse: Joi.number().required(),
});

const CreateWarehouse = Joi.object({
  warehouse_name: Joi.string().required(),
  address: Joi.string().required(),
  id_city: Joi.number().required(),
});

module.exports = {
  EditDataAdmin,
  CreateDataAdmin,
  CreateWarehouse,
  phoneRegExp,
};

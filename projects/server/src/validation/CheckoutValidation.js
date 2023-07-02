const Joi = require("joi");

const shippingValidation = Joi.object({
  carts: Joi.array().items(Joi.number()).required(),
  id_address: Joi.number().required(),
});

module.exports = {
  shippingValidation,
};
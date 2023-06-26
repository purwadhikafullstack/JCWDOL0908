const Joi = require('joi');
const cartValidation = Joi.object({
  productID: Joi.number().required(),
  quantity: Joi.number().required(),
});

module.exports = {
  cartValidation,
}
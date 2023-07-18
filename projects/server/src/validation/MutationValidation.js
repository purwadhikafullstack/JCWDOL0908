const Joi = require("joi");

const createNewMutation = Joi.object({
  id_user: Joi.number().required(),
  id_product: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
  from_id_warehouse: Joi.number().required(),
  to_id_warehouse: Joi.number().required(),
});

module.exports = {
  createNewMutation,
};

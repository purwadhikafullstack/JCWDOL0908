const Joi = require("joi");

const SaveAddress = Joi.object({
  address: Joi.string().required(),
  id_city: Joi.number().required(),
  notes: Joi.string().allow(null).allow(""),
  longitude: Joi.string().allow(null).allow(""),
  latitude: Joi.string().allow(null).allow(""),
});


module.exports = {
  SaveAddress,
}
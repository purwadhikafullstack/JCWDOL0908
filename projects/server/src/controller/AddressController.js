const { AddressService } = require("../service");
const { AddressValidation } = require("../validation");
/**
 * GetProvinces - Get all provinces
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 * @constructor
 */
const GetProvinces = async (req, res, next) => {
  try {
    const { error, data } = await AddressService.GetProvinces();
    if (error) {
      return res.status(404).json({
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Get provinces success",
      data,
    });
  } catch (e) {
    next(e);
  }
};

const GetCity = async (req, res, next) => {
  try {
    const { provinceID } = req.params;
    const { error, data } = await AddressService.GetCity(provinceID);
    if (error) {
      return res.status(404).json({
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Get cities success",
      data,
    });
  } catch (e){
    next(e);
  }
};


/**
 * SaveAddress - save user address
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 * @constructor
 */
const SaveAddress = async (req, res, next) => {
  try {
    const { body, user } = req;
    const { error: err_validation } = AddressValidation.SaveAddress.validate(body);
    if (err_validation) {
      return res.status(400).json({
        message: err_validation.details[0].message,
        data: null,
      });
    }

    const { error, data } = await AddressService.StoreUserAddress({
      id_user: user.id,
      ...body,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(201).json({
      message: "Address saved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetProvinces,
  GetCity,
  SaveAddress,
};
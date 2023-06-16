const { AddressService } = require("../service");
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

module.exports = {
  GetProvinces,
  GetCity,
};
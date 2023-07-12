const { AddressService } = require("../service");
const { AddressValidation } = require("../validation");
/**
 * GetProvinces - Get all provinces
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
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
    const { province_id } = req.params;
    const { error, data } = await AddressService.GetCity(province_id);
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
  } catch (e) {
    next(e);
  }
};


/**
 * SaveAddress - save user address
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
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

const UpdateDefaultAddress = async (req, res, next) => {
  try {
    const { user } = req;
    const { address_id } = req.params;

    const { error, data } = await AddressService.MakeAddressPrimary({
      id_user: user.id,
      id_address: address_id,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(203).json({
      message: "Address updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GetUsersAddress - Get all user address
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const GetUsersAddress = async (req, res, next) => {
  try {
    const { user } = req;
    const { page = 1, limit = 5 } = req.query;
    const { error, data } = await AddressService.GetAddressByUserID({
      id_user: user.id,
      page,
      limit,
    });
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Get address success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * UpdateAddress - Update user address
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const UpdateAddress = async (req, res, next) => {
  try {
    const { body, user } = req;
    const { address_id } = req.params;

    const { error: err_validation } = AddressValidation.SaveAddress.validate(body);
    if (err_validation) {
      return res.status(400).json({
        message: err_validation.details[0].message,
        data: null,
      });
    }

    const { error, data } = await AddressService.UpdateUserAddress({
      id_user: user.id,
      id_address: address_id,
      ...body,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(203).json({
      message: "Address updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * RemoveAddress - Remove user address
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const RemoveAddress = async (req, res, next) => {
  try {
    const { user } = req;
    const { address_id } = req.params;

    const { error, data } = await AddressService.RemoveAddress({
      id_user: user.id,
      id_address: address_id,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(203).json({
      message: "Address removed successfully",
      data,
    });

  } catch (error) {
    next(error);
  }
};

const getPrimaryAddress = async (req, res, next) => {
  try {
    const { user } = req;
    const { error, data } = await AddressService.getPrimaryAddress(user.id);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Get address success",
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
  UpdateDefaultAddress,
  GetUsersAddress,
  UpdateAddress,
  RemoveAddress,
  getPrimaryAddress,
};
const db = require("../model");
const { UserValidation } = require("../validation");
const { UserService } = require("../service");
const User = db.User;
const Address = db.Address;

const GetUser = async (req, res) => {
  const ress = await User.findOne({
    where: {
      id_user: 1,
    },
    include: {
      model: Address,
    },
  });

  // response
  res.status(200).json({
    message: "Hello, Student !",
    data: {
      ress,
    },
  });
};

/**
 * UpdateBio - update user bio
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 * @constructor
 */
const UpdateBio = async (req, res, next) => {
  try {
    const { body, user } = req;
    const { error: err_validation } = UserValidation.UpdateBio.validate(body);
    if (err_validation) {
      return res.status(400).json({
        message: err_validation.details[0].message,
        data: null,
      });
    }


    const { error, data } = await UserService.UpdateBioUser({
      ...body,
      id: user.id,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(203).json({
      message: "User updated successfully",
      data,
    });

  } catch (error) {
    next(error);
  }
};

const UpdatePassword = async (req, res, next) => {
  try {
    const { body, user } = req;
    const { error: err_validation } = UserValidation.UpdatePassword.validate(body);
    if (err_validation) {
      return res.status(400).json({
        message: err_validation.details[0].message,
        data: null,
      });
    }

    const { error, data } = await UserService.UpdatePasswordUser({
      ...body,
      id: user.id,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(203).json({
      message: "User updated successfully",
      data,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetUser,
  UpdateBio,
  UpdatePassword,
};

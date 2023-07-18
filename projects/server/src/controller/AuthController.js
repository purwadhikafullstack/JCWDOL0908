const { AuthService } = require("../service");
const { UserValidation } = require("../validation");

/**
 * AuthUser - authenticate user and return token
 * @param req body{email, password}
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const AuthUser = async (req, res, next) => {
  try {
    const { body } = req;
    // validate body
    const { error: err_validation } = UserValidation.AuthUser.validate(body);
    if (err_validation) {
      return res.status(400).json({
        message: err_validation.details[0].message,
        data: null,
      });
    }

    const { error, data } = await AuthService.MakeAuthService(body);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(200).json({
      message: "User authenticated successfully",
      data,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * KeepLogin - keep user login while token is still valid
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const KeepLogin = async (req, res, next) => {
  try {
    const { user } = req;
    const { error, data } = await AuthService.KeepLoginService(user);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      message: "User authenticated successfully",
      data,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * RegisterUser - register user
 * @param req body{email}
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const RegisterUser = async (req, res, next) => {
  try {
    const { body } = req;

    // Validate the request body
    const { error: error_validation } = UserValidation.RegisterUser.validate(body);
    if (error_validation) {
      return res.status(400).json({
        message: error_validation.details[0].message,
        data: null,
      });
    }

    const { error, data } = await AuthService.CreateUserWithEmail(body);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }
    return res.status(201).json({
      message: "User created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * VerifyUser - verification to user that has been registered
 * @param req body{token, password}
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const VerifyUser = async (req, res, next) => {
  try {
    const { body } = req;

    // validate the request body
    const { error: error_validation } = UserValidation.VerifyUser.validate(body);
    if (error_validation) {
      return res.status(400).json({
        message: error_validation.details[0].message,
        data: null,
      });
    }

    const { error, data } = await AuthService.VerifyUser(body);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }
    return res.status(202).json({
      message: "User verified successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const ForgotPassword = async (req, res, next) => {
  try {
    const { body } = req;

    // validate the request body
    const { error: error_validation } = UserValidation.ForgotPassword.validate(body);
    if (error_validation) {
      return res.status(400).json({
        message: error_validation.details[0].message,
        data: null,
      });
    }

    const { error, data } = await AuthService.resetPassword(body);
    if (error) {
      return res.status(400).json({
        message: "User verified successfully",
        data: null,
      });
    }
    return res.status(202).json({
      message: "User verified successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AuthUser,
  KeepLogin,
  VerifyUser,
  RegisterUser,
  ForgotPassword,
};

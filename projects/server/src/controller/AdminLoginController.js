const { AdminLoginLogic } = require("../logic");

const loginAdmin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const response = await AdminLoginLogic.loginAdmin(username, password);
    const { error, result } = response;
    // check whether error exists
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) res.status(500).send({ isSuccess: false, message: "internal server error", error });

    res.status(200).send(result);
  } catch (error) {
    // unknown error
    next(error);
  }
};

const keepLogin = async (req, res, next) => {
  const user = req.user;
  try {
    const response = await AdminLoginLogic.keepLogin(user.id_user);
    const { error, result } = response;

    // check whether error exists
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) res.status(500).send({ isSuccess: false, message: "internal server error", error });

    res.status(200).send(result);
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = { loginAdmin, keepLogin };

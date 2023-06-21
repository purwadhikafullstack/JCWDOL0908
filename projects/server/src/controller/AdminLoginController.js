const db = require("../model");
const { AdminLoginService } = require("../service");

const loginAdmin = async (req, res, next) => {
  const { username, password } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const response = await AdminLoginService.loginAdmin(username, password);
    const { error, result } = response;
    // check whether error exists
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) res.status(500).send({ isSuccess: false, message: "internal server error", error });

    await transaction.commit();
    res.status(200).send(result);
  } catch (error) {
    transaction.rollback();
    // unknown error
    next(error);
  }
};

const keepLogin = async (req, res, next) => {
  const user = req.user;
  const transaction = await db.sequelize.transaction();
  try {
    const response = await AdminLoginService.keepLogin(user.id_user, transaction);
    const { error, result } = response;

    // check whether error exists
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) res.status(500).send({ isSuccess: false, message: "internal server error", error });

    await transaction.commit();
    res.status(200).send(result);
  } catch (error) {
    transaction.rollback();
    // unknown error
    next(error);
  }
};

module.exports = { loginAdmin, keepLogin };

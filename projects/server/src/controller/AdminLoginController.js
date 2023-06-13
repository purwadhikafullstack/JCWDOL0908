const db = require("../model");
const { AdminLoginService } = require("../service");

const loginAdmin = async (req, res, next) => {
  const { username, password } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const result = await AdminLoginService.loginAdmin(username, password);
    await transaction.commit();
    res.status(result.status).send(result);
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};

const keepLogin = async (req, res, next) => {
  const user = req.user;
  const transaction = await db.sequelize.transaction();
  try {
    const result = await AdminLoginService.keepLogin(user.id_user, transaction);
    await transaction.commit();
    res.status(result.status).send(result);
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};

module.exports = { loginAdmin, keepLogin };

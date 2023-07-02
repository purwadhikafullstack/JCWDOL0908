const db = require("../model");
const { AdminLoginService } = require("../service");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/CreateToken");

const loginAdmin = async (username, password) => {
  let result;
  let tokenPayload;
  const transaction = await db.sequelize.transaction();
  try {
    const user = await AdminLoginService.getAdminByUsername(username);

    // check whether the username-input match the username in DB
    if (!user) throw { statusCode: 401, errMsg: "invalid username and password" };

    // check whether the password-input match the password in DB
    const isPasswordMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isPasswordMatch) throw { statusCode: 401, errMsg: "invalid username and password" };

    const { id_user, is_admin, id_role, admin_role } = user.dataValues;
    const { role_admin, id_warehouse } = admin_role.dataValues;

    // check whether it's super-admin or warehouse-admin
    if (!id_warehouse) {
      result = { id_user, username, is_admin, id_role, role_admin };
      tokenPayload = result;
    } else {
      const getWarehouse = await AdminLoginService.getWarehouseByIdAdmin(id_role);
      const { warehouse_name, id_city, is_deleted } = getWarehouse.dataValues.warehouse.dataValues;

      // check whether warehouse already deleted or not
      if (is_deleted) throw { statusCode: 404, errMsg: "warehouse where you've assigned at is already deleted" };

      result = {
        id_user,
        username,
        is_admin,
        id_role,
        role_admin,
        id_warehouse,
        warehouse_name,
        id_city,
      };
      tokenPayload = { id_user, is_admin, id_role, role_admin };
    }

    // create Token
    const token = createToken(tokenPayload);
    const tokenUpdate = await AdminLoginService.updateToken(id_user, token, transaction);
    await transaction.commit();
    return { error: null, result: { result, token } };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const keepLogin = async (id_user) => {
  let result;
  let tokenPayload;
  try {
    const user = await AdminLoginService.getAdminById(id_user);

    // check whether the id_user match in DB
    if (!user) throw { statusCode: 401, errMsg: "invalid admin/unauthorized" };
    const { username, is_admin, id_role, admin_role } = user.dataValues;
    const { role_admin, id_warehouse } = admin_role.dataValues;

    // check whether it's super-admin or warehouse-admin
    if (!id_warehouse) {
      result = { id_user, username, is_admin, id_role, role_admin };
      tokenPayload = result;
    } else {
      const getWarehouse = await AdminLoginService.getWarehouseByIdAdmin(id_role);
      const { warehouse_name, is_deleted, id_city } = getWarehouse.dataValues.warehouse.dataValues;

      // check whether warehouse already deleted or not
      if (is_deleted) throw { statusCode: 404, errMsg: "warehouse where you've assigned at already deleted" };
      result = {
        id_user,
        username,
        is_admin,
        id_role,
        role_admin,
        id_warehouse,
        warehouse_name,
        id_city,
      };
      tokenPayload = { id_user, is_admin, id_role, role_admin };
    }

    // create Token
    const token = createToken(tokenPayload);
    return { error: null, result: { result, token } };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

module.exports = { loginAdmin, keepLogin };

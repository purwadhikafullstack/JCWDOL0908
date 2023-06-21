const db = require("../model");
const { User, AdminRole, Warehouse } = db;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/CreateToken");

const getAdminByUsername = async (username) => {
  const result = await User.findOne({
    where: { [Op.and]: [{ username }, { is_deleted: 0 }] },
    include: { model: AdminRole },
  });
  return result;
};

const getAdminById = async (id_user) => {
  const result = await User.findOne({ where: { id_user }, include: { model: AdminRole } });
  return result;
};

const getWarehouseByIdAdmin = async (id_role) => {
  const result = await AdminRole.findOne({ where: { id_role }, include: { model: Warehouse } });
  return result;
};

const updateToken = async (id_user, token, transaction) => {
  const result = await User.update({ user_token: token }, { where: { id_user }, transaction });
  return result;
};

const loginAdmin = async (username, password, transaction) => {
  let result;
  let tokenPayload;

  try {
    const user = await getAdminByUsername(username);

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
      const getWarehouse = await getWarehouseByIdAdmin(id_role);
      const { warehouse_name, id_city, is_deleted } = getWarehouse.dataValues.warehouse.dataValues;

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
    const tokenUpdate = await updateToken(id_user, token, transaction);
    return { error: null, result: { result, token } };
  } catch (error) {
    return { error, result: null };
  }
};

const keepLogin = async (id_user) => {
  let result;
  let tokenPayload;
  try {
    const user = await getAdminById(id_user);

    // check whether the id_user match in DB
    if (!user) throw { statusCode: 401, errMsg: "invalid admin/unauthorized" };
    const { username, is_admin, id_role, admin_role } = user.dataValues;
    const { role_admin, id_warehouse } = admin_role.dataValues;

    // check whether it's super-admin or warehouse-admin
    if (!id_warehouse) {
      result = { id_user, username, is_admin, id_role, role_admin };
      tokenPayload = result;
    } else {
      const getWarehouse = await getWarehouseByIdAdmin(id_role);
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
    return { error, result: null };
  }
};

module.exports = { loginAdmin, keepLogin };

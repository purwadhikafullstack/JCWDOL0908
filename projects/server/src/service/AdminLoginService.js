const db = require("../model");
const { User, Address, City, AdminRole, Warehouse, sequelize } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { AdminUserMgtService } = require("../service");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/CreateToken");

const getAdminByUsername = async (username) => {
  let result = await User.findOne({
    where: { [Op.and]: [{ username }, { is_deleted: 0 }] },
    include: { model: AdminRole },
  });
  return result;
};

const getAdminById = async (id_user) => {
  let result = await User.findOne({ where: { id_user }, include: { model: AdminRole } });
  return result;
};

const getWarehouseByIdAdmin = async (id_role) => {
  let result = await AdminRole.findOne({ where: { id_role }, include: { model: Warehouse } });
  return result;
};

const updateToken = async (id_user, token, transaction) => {
  let result = await User.update({ user_token: token }, { where: { id_user }, transaction });
  return result;
};

const loginAdmin = async (username, password, transaction) => {
  let result;
  let user = await getAdminByUsername(username);
  if (!user) return { status: 401, message: "invalid username and password", isSuccess: false };
  let isPasswordMatch = await bcrypt.compare(password, user.dataValues.password);
  if (!isPasswordMatch) return { status: 401, message: "invalid username and password", isSuccess: false };
  const { id_user, is_admin, id_role, admin_role } = user.dataValues;
  const { role_admin, id_warehouse } = admin_role.dataValues;
  if (!id_warehouse) {
    result = { id_user, username, is_admin, id_role, role_admin };
  } else {
    let getWarehouse = await getWarehouseByIdAdmin(id_warehouse);
    const { warehouse_name, address, id_city } = getWarehouse.dataValues.warehouse.dataValues;
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
  }
  let token = createToken(result);
  let tokenUpdate = await updateToken(id_user, token, transaction);
  return { status: 200, message: "success fetched data", isSuccess: true, result, token };
};

const keepLogin = async (id_user, transaction) => {
  let result;
  let user = await getAdminById(id_user);
  if (!user) return { status: 401, message: "invalid ID User", isSuccess: false };
  const { username, is_admin, id_role, admin_role } = user.dataValues;
  const { role_admin, id_warehouse } = admin_role.dataValues;
  if (!id_warehouse) {
    result = { id_user, username, is_admin, id_role, role_admin };
  } else {
    let getWarehouse = await getWarehouseByIdAdmin(id_warehouse);
    const { warehouse_name, address, id_city } = getWarehouse.dataValues.warehouse.dataValues;
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
  }
  let token = createToken(result);
  return { status: 200, message: "success fetched data", isSuccess: true, result, token };
};

module.exports = { loginAdmin, keepLogin };

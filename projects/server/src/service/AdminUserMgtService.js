const db = require("../model");
const { User, Address, City, AdminRole, Warehouse, sequelize } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { join } = require("path");
const { type } = require("os");
require("dotenv").config({ path: join(__dirname, "../.env") });
const env = process.env;

const getAllUserWithoutAddress = async (offset, limit, page) => {
  const allUser = await User.findAll({
    where: {
      is_deleted: 0,
    },
    offset: parseInt(offset) * (parseInt(page) - 1),
    limit: parseInt(limit),
  });

  return allUser;
};

const getAllUserCount = async () => {
  const users = await User.findAll({
    where: {
      is_deleted: 0,
    },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_user")), "user_count"]],
  });
  return users;
};

const getAllAdminCount = async () => {
  const users = await User.findAll({
    where: {
      [Op.and]: [{ is_deleted: 0 }, { id_role: { [Op.not]: 1 } }],
    },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_user")), "user_count"]],
  });
  return users;
};

const getSingleSuperAdmin = async (id) => {
  let singleUser = await User.findOne({
    where: {
      id_user: id,
    },
    include: {
      model: AdminRole,
    },
  });
  const { id_user, username, email, phone_number, admin_role } = singleUser;
  result = { id_user, username, email, phone_number, role: admin_role.role_admin };
  return result;
};

const getSingleUser = async (id) => {
  let singleUser = await User.findOne({
    where: {
      [Op.and]: [{ id_user: id }, { is_deleted: 0 }],
    },
  });
  const { id_user, username, email, phone_number, is_admin } = singleUser;
  result = { id_user, username, email, phone_number, role: is_admin ? "admin" : "user" };
  return result;
};

const getAllAdmin = async (offset, limit, page) => {
  const allAdminUser = await User.findAll({
    attributes: { exclude: ["password"] },
    where: { [Op.and]: [{ is_admin: 1 }, { id_role: { [Op.not]: 1 } }, { is_deleted: 0 }] },
    include: { model: AdminRole, include: { model: Warehouse, include: { model: City } } },
    offset: parseInt(offset) * (parseInt(page) - 1),
    limit: parseInt(limit),
  });
  return allAdminUser;
};

const hashingPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(env.GENSALT));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const updateDataAdmin = async (id_user, username, email, phone_number, id_role, transaction) => {
  const update = await User.update({ username, email, phone_number, id_role }, { where: { id_user }, transaction });
  return update;
};

const updateDataAdminPassword = async (id_user, password, transaction) => {
  let hashedPassword = await hashingPassword(password);
  const update = await User.update({ password: hashedPassword }, { where: { id_user }, transaction });
  return update;
};

const findAdminRoleByIdWarehouse = async (id_warehouse) => {
  let findAdmin = await AdminRole.findOne({ where: { id_warehouse } });
  return findAdmin;
};

const createAdminRoleWarehouse = async (id_warehouse, transaction) => {
  let createRole = await AdminRole.create({ role_admin: "admin-warehouse", id_warehouse }, { transaction });
  return createRole;
};

const deleteUser = async (id_user, transaction) => {
  let deleteUserData = await User.update({ is_deleted: 1 }, { where: { id_user }, transaction });
  return deleteUserData;
};

const createNewAdmin = async (username, email, phone_number, password, id_warehouse, transaction) => {
  const getAdminRole = await findAdminRoleByIdWarehouse(id_warehouse);
  let adminRoleId = getAdminRole.dataValues.id_role;
  let hashedPassword = await hashingPassword(password);
  const createNewAdmin = await User.create(
    {
      username,
      email,
      phone_number,
      password: hashedPassword,
      is_admin: true,
      id_role: adminRoleId,
      is_verify: true,
    },
    { transaction },
  );
  return createNewAdmin;
};

module.exports = {
  getAllUserCount,
  getAllUserWithoutAddress,
  getSingleSuperAdmin,
  getSingleUser,
  getAllAdmin,
  getAllAdminCount,
  updateDataAdmin,
  updateDataAdminPassword,
  hashingPassword,
  findAdminRoleByIdWarehouse,
  createAdminRoleWarehouse,
  deleteUser,
  createNewAdmin,
};

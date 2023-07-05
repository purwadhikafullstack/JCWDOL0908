const db = require("../model");
const { User, AdminRole, Warehouse } = db;
const { Op } = require("sequelize");

const getAdminByUsername = async (username) => {
  const result = await User.findOne({
    where: {
      [Op.and]: [{ username }, { is_deleted: 0 }],
    },
    include: { model: AdminRole },
  });
  return result;
};

const getAdminById = async (id_user) => {
  const result = await User.findOne({
    where: {
      id_user,
    },
    include: {
      model: AdminRole,
    },
  });
  return result;
};

const getWarehouseByIdAdmin = async (id_role) => {
  const result = await AdminRole.findOne({
    where: {
      id_role,
    },
    include: {
      model: Warehouse,
    },
  });
  return result;
};

const updateToken = async (id_user, token, transaction) => {
  const result = await User.update(
    { user_token: token },
    {
      where: {
        id_user,
      },
      transaction,
    },
  );
  return result;
};

module.exports = { getAdminByUsername, getAdminById, getWarehouseByIdAdmin, updateToken };

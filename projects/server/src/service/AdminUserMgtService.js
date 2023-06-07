const db = require("../model");
const { User, Address, City, AdminRole, Warehouse, sequelize } = db;

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

const getSingleWarehouseAdmin = async (id) => {
  let singleUser = await User.findOne({
    where: {
      id_user: id,
    },
    include: {
      model: AdminRole,
      include: {
        model: Warehouse,
        include: {
          model: City,
        },
      },
    },
  });

  const { id_user, username, email, phone_number, admin_role } = singleUser;
  result = {
    id_user,
    username,
    email,
    phone_number,
    role: admin_role.role_admin,
    warehouse: admin_role.warehouse.warehouse_name,
    city: admin_role.warehouse.city.city,
    cityType: admin_role.warehouse.city.type_city,
  };
  return result;
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
      id_user: id,
    },
  });
  const { id_user, username, email, phone_number, is_admin } = singleUser;
  result = { id_user, username, email, phone_number, role: is_admin ? "admin" : "user" };
  return result;
};

module.exports = {
  getAllUserCount,
  getAllUserWithoutAddress,
  getSingleSuperAdmin,
  getSingleWarehouseAdmin,
  getSingleUser,
};

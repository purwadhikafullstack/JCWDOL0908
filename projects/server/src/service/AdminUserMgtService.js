const db = require("../model");
const { User, Address, City, AdminRole, Warehouse, sequelize } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

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

const getSingleWarehouseAdmin = async (id) => {
  let singleUser = await User.findOne({
    where: { id_user: id },
    include: { model: AdminRole, include: { model: Warehouse, include: { model: City } } },
  });

  const { id_user, username, email, phone_number, admin_role } = singleUser;
  result = {
    id_user,
    username,
    email,
    phone_number,
    id_role: admin_role.id_role,
    role: admin_role.role_admin,
    id_warehouse: admin_role.warehouse.id_warehouse,
    warehouse: admin_role.warehouse.warehouse_name,
    id_city: admin_role.warehouse.city.id_city,
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

const getAllAdmin = async (offset, limit, page) => {
  const allAdminUser = await User.findAll({
    where: { [Op.and]: [{ is_admin: 1 }, { id_role: { [Op.not]: 1 } }, { is_deleted: 0 }] },
    include: { model: AdminRole, include: { model: Warehouse, include: { model: City } } },
    offset: parseInt(offset) * (parseInt(page) - 1),
    limit: parseInt(limit),
  });
  return allAdminUser;
};

const getAllWarehouseCity = async () => {
  let allWarehouseCity = await sequelize.query(
    `SELECT w.id_city, c.type_city, c.city, COUNT(*) as total_warehouse 
    FROM warehouses w JOIN cities c ON w.id_city = c.id_city GROUP BY w.id_city`,
    { type: QueryTypes.SELECT },
  );
  return allWarehouseCity;
};

const getSpecificWarehouseByIdCity = async (id_city) => {
  const warehouses = await Warehouse.findAll({ where: { id_city } });
  return warehouses;
};

const updateDataAdmin = async () => {};

const updateDataAdminPassword = async () => {};

module.exports = {
  getAllUserCount,
  getAllUserWithoutAddress,
  getSingleSuperAdmin,
  getSingleWarehouseAdmin,
  getSingleUser,
  getAllAdmin,
  getAllAdminCount,
  getAllWarehouseCity,
  getSpecificWarehouseByIdCity,
  updateDataAdmin,
  updateDataAdminPassword,
};

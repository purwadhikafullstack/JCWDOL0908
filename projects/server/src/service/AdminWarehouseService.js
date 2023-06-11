const db = require("../model");
const { User, Address, City, AdminRole, Warehouse, sequelize } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

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

module.exports = {
  getSingleWarehouseAdmin,
  getAllWarehouseCity,
  getSpecificWarehouseByIdCity,
};

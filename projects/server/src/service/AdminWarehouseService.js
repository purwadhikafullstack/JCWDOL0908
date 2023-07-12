const db = require("../model");
const { User, Province, City, AdminRole, Warehouse, sequelize } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const axios = require("axios");
const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const env = process.env;
const GEO_API = env.GEOLOCATION_API;
const GEO_API_KEY = env.GEO_API_KEY;

const getProvinces = async () => {
  try {
    const result = await Province.findAll();
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const getCitiesByProvinceId = async (id_province) => {
  try {
    const result = await City.findAll({ where: { id_province } });
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const getSingleWarehouseAdmin = async (id) => {
  const singleUser = await User.findOne({
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
  const allWarehouseCity = await sequelize.query(
    `SELECT w.id_city, c.type_city, c.city, COUNT(*) as total_warehouse 
      FROM warehouses w JOIN cities c ON w.id_city = c.id_city GROUP BY w.id_city`,
    { type: QueryTypes.SELECT },
  );
  return allWarehouseCity;
};

const getSpecificWarehouseByIdCity = async (id_city) => {
  const warehouses = await Warehouse.findAll({ where: { [Op.and]: [{ id_city }, { is_deleted: 0 }] } });
  return warehouses;
};

const getWarehousesDataCount = async () => {
  const warehouseCount = await Warehouse.findAll({
    where: { is_deleted: 0 },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_warehouse")), "warehouse_count"]],
  });
  return warehouseCount;
};

const getWarehousesData = async (offset, limit, page) => {
  let warehouses;
  if (offset && limit && page) {
    warehouses = await Warehouse.findAll({
      where: { is_deleted: 0 },
      include: { model: City, include: { model: Province } },
      offset: parseInt(offset) * (parseInt(page) - 1),
      limit: parseInt(limit),
    });
  } else {
    warehouses = await Warehouse.findAll({
      where: { is_deleted: 0 },
      include: { model: City, include: { model: Province } },
    });
  }
  return warehouses;
};

const deleteWarehouseById = async (id_warehouse, transaction) => {
  const deleteWarehouse = await Warehouse.update({ is_deleted: 1 }, { where: { id_warehouse }, transaction });
  return deleteWarehouse;
};

const getGeoLocation = async (address) => {
  try {
    const newAddress = address.replaceAll(" ", "%20") + ",%20Indonesia";
    const response = await axios.get(`${GEO_API}?q=${newAddress}&key=${GEO_API_KEY}&pretty=1&no_annotations=1`);
    const { components, geometry } = response.data.results[0];
    const result = { components, geometry };
    return { result, error: null };
  } catch (error) {
    return { reulst: null, error };
  }
};

const createWarehouse = async (warehouse_name, address, id_city, latitude, longitude, transaction) => {
  const newWarehouse = await Warehouse.create(
    { warehouse_name, address, id_city, longitude, latitude, is_deleted: 0 },
    { transaction },
  );
  return newWarehouse;
};

const editWarehouse = async (id_warehouse, warehouse_name, address, id_city, latitude, longitude, transaction) => {
  const edit = await Warehouse.update(
    { warehouse_name, address, id_city, longitude, latitude },
    { where: { id_warehouse }, transaction },
  );
  return edit;
};

const checkWarehouse = async (warehouse_name, id_city, transaction) => {
  const findWarehouse = await Warehouse.findAll({
    where: {
      [Op.and]: [{ warehouse_name }, { id_city }],
    },
    transaction,
  });
  return findWarehouse;
};

const checkWarehouseByNameExceptSelf = async (warehouse_name, id_warehouse, id_city, transaction) => {
  const findWarehouse = await Warehouse.findAll({
    where: {
      [Op.and]: [{ warehouse_name }, { id_city }, { id_warehouse: { [Op.not]: id_warehouse } }],
    },
    transaction,
  });
  return findWarehouse;
};

module.exports = {
  getSingleWarehouseAdmin,
  getAllWarehouseCity,
  getSpecificWarehouseByIdCity,
  getProvinces,
  getCitiesByProvinceId,
  getWarehousesData,
  getGeoLocation,
  checkWarehouseByNameExceptSelf,
  editWarehouse,
  checkWarehouse,
  createWarehouse,
  deleteWarehouseById,
  getWarehousesDataCount,
};

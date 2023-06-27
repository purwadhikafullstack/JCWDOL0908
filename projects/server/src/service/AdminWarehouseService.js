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
    return { error, result: null };
  }
};

const getCitiesByProvinceId = async (id_province) => {
  try {
    const result = await City.findAll({ where: { id_province } });
    return { error: null, result };
  } catch (error) {
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

const createAdminRoleWarehouse = async (id_warehouse, transaction) => {
  const createRole = await AdminRole.create({ role_admin: "admin-warehouse", id_warehouse }, { transaction });
  return createRole;
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

const getWarehousesLogic = async (offset, limit, page) => {
  try {
    let warehousesCount;
    let totalPage;

    // get total count warehouses
    if (offset && limit && page) {
      warehousesCount = await getWarehousesDataCount();
      warehousesCount = warehousesCount[0].dataValues.warehouse_count;
      totalPage = Math.ceil(warehousesCount / limit);
    }

    // get warehouses with limit
    const warehouses = await getWarehousesData(offset, limit, page);

    // get total page if fetching data being limited

    const result = warehouses.map((warehouse, index) => {
      const { city } = warehouse.dataValues;
      const { id_city, type_city, province } = city;
      const { id_province } = province;
      return { ...warehouse.dataValues, id_city, city: city.city, type_city, province: province.province, id_province };
    });
    const data = { result, totalPage };
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
};

const deleteWarehouseLogic = async (id_warehouse) => {
  const transaction = await db.sequelize.transaction();
  try {
    // delete warehouse
    const response = await deleteWarehouseById(id_warehouse, transaction);
    let result = response[0];

    // check whether data changed exist
    if (!result) throw { errMsg: "warehouse not found", statusCode: 404 };

    result = "success";
    await transaction.commit();
    return { error: null, result };
  } catch (error) {
    transaction.rollback();
    return { error, result: null };
  }
};

const createWarehouseLogic = async (warehouse_name, address, id_city) => {
  const transaction = await db.sequelize.transaction();
  try {
    // get the detail address data from geolocation api
    const response = await getGeoLocation(address);
    let { result, error } = response;
    const { geometry, components } = result;
    const { lat, lng } = geometry;

    // if error while accessing the geo API
    if (error) throw error;

    // check if the road exists
    if (!components.road) throw { errMsg: "we can't find the road", statusCode: 404 };

    //check if warehouse already exist
    const isWarehouseExist = await checkWarehouse(warehouse_name, id_city, transaction);
    if (isWarehouseExist.length > 0) throw { errMsg: "warehouse already exists", statusCode: 400 };

    //create warehouse
    const createNew = await createWarehouse(
      warehouse_name,
      address,
      id_city,
      lat.toString(),
      lng.toString(),
      transaction,
    );

    // create new admin role of the new warehouse
    const createNewAdminRole = await createAdminRoleWarehouse(createNew.dataValues.id_warehouse, transaction);
    transaction.commit();
    return { error: null, result: createNewAdminRole };
  } catch (error) {
    transaction.rollback();
    return { error, result: null };
  }
};

const editWarehouseLogic = async (id_warehouse, warehouse_name, address, id_city) => {
  const transaction = await db.sequelize.transaction();
  try {
    // get the detail address data from geolocation api
    const response = await getGeoLocation(address);
    let { result, error } = response;
    const { geometry, components } = result;
    const { lat, lng } = geometry;

    // if error while accessing the geo API
    if (error) throw error;

    // check if the road exists
    if (!components.road) throw { errMsg: "we can't find the road", statusCode: 404 };

    //check if warehouse already exist
    const isWarehouseExist = await checkWarehouseByNameExceptSelf(warehouse_name, id_warehouse, id_city, transaction);
    if (isWarehouseExist.length > 0) throw { errMsg: "warehouse name already exists", statusCode: 400 };

    //edit warehouse
    const edit = await editWarehouse(
      id_warehouse,
      warehouse_name,
      address,
      id_city,
      lat.toString(),
      lng.toString(),
      transaction,
    );
    transaction.commit();
    return { error: null, result: edit };
  } catch (error) {
    transaction.rollback();
    return { error, result: null };
  }
};

module.exports = {
  getSingleWarehouseAdmin,
  getAllWarehouseCity,
  getSpecificWarehouseByIdCity,
  getWarehousesLogic,
  deleteWarehouseLogic,
  getProvinces,
  getCitiesByProvinceId,
  createWarehouseLogic,
  editWarehouseLogic,
  getWarehousesData,
};

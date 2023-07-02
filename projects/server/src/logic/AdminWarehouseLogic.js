const db = require("../model");
const { AdminWarehouseService, AdminUserMgtService } = require("../service");

const editWarehouseLogic = async (id_warehouse, warehouse_name, address, id_city) => {
  const transaction = await db.sequelize.transaction();
  try {
    // get the detail address data from geolocation api
    const response = await AdminWarehouseService.getGeoLocation(address);
    let { result, error } = response;
    const { geometry, components } = result;
    const { lat, lng } = geometry;

    // if error while accessing the geo API
    if (error) throw error;

    // check if the road exists
    if (!components.road) throw { errMsg: "we can't find the road", statusCode: 404 };

    //check if warehouse already exist
    const isWarehouseExist = await AdminWarehouseService.checkWarehouseByNameExceptSelf(
      warehouse_name,
      id_warehouse,
      id_city,
      transaction,
    );
    if (isWarehouseExist.length > 0) throw { errMsg: "warehouse name already exists", statusCode: 400 };

    //edit warehouse
    const edit = await AdminWarehouseService.editWarehouse(
      id_warehouse,
      warehouse_name,
      address,
      id_city,
      lat.toString(),
      lng.toString(),
      transaction,
    );
    await transaction.commit();
    return { error: null, result: edit };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const createWarehouseLogic = async (warehouse_name, address, id_city) => {
  const transaction = await db.sequelize.transaction();
  try {
    // get the detail address data from geolocation api
    const response = await AdminWarehouseService.getGeoLocation(address);
    let { result, error } = response;
    const { geometry, components } = result;
    const { lat, lng } = geometry;

    // if error while accessing the geo API
    if (error) throw error;

    // check if the road exists
    if (!components.road) throw { errMsg: "we can't find the road", statusCode: 404 };

    //check if warehouse already exist
    const isWarehouseExist = await AdminWarehouseService.checkWarehouse(warehouse_name, id_city, transaction);
    if (isWarehouseExist.length > 0) throw { errMsg: "warehouse already exists", statusCode: 400 };

    //create warehouse
    const createNew = await AdminWarehouseService.createWarehouse(
      warehouse_name,
      address,
      id_city,
      lat.toString(),
      lng.toString(),
      transaction,
    );

    // create new admin role of the new warehouse
    const createNewAdminRole = await AdminUserMgtService.createAdminRoleWarehouse(
      createNew.dataValues.id_warehouse,
      transaction,
    );
    await transaction.commit();
    return { error: null, result: createNewAdminRole };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const deleteWarehouseLogic = async (id_warehouse) => {
  const transaction = await db.sequelize.transaction();
  try {
    // delete warehouse
    const response = await AdminWarehouseService.deleteWarehouseById(id_warehouse, transaction);
    let result = response[0];

    // check whether data changed exist
    if (!result) throw { errMsg: "warehouse not found", statusCode: 404 };

    result = "success";
    await transaction.commit();
    return { error: null, result };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const getWarehousesLogic = async (offset, limit, page) => {
  try {
    let warehousesCount;
    let totalPage;
    page = parseInt(page);
    // get total count warehouses
    if (offset && limit && page) {
      warehousesCount = await AdminWarehouseService.getWarehousesDataCount();
      warehousesCount = warehousesCount[0].dataValues.warehouse_count;
      totalPage = Math.ceil(warehousesCount / limit);
    }

    // get warehouses with limit
    const warehouses = await AdminWarehouseService.getWarehousesData(offset, limit, page);

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

module.exports = {
  editWarehouseLogic,
  createWarehouseLogic,
  deleteWarehouseLogic,
  getWarehousesLogic,
};

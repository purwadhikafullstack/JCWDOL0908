const db = require("../model");
const {
  AdminWarehouseService,
  AdminUserMgtService,
  TransactionService,
  MutationService,
  ProductWarehouseRltService,
  ProductService,
  ProductJournalService,
} = require("../service");

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
    if (!components.road) throw { errMsg: "error: we can't find the road", statusCode: 404 };

    //check if warehouse already exist
    const isWarehouseExist = await AdminWarehouseService.checkWarehouseByNameExceptSelf(
      warehouse_name,
      id_warehouse,
      id_city,
      transaction,
    );
    if (isWarehouseExist.length > 0) throw { errMsg: "error: warehouse name already exists", statusCode: 400 };

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
    if (!components.road) throw { errMsg: "error: we can't find the road", statusCode: 404 };

    //check if warehouse already exist
    const isWarehouseExist = await AdminWarehouseService.checkWarehouse(warehouse_name, id_city, transaction);
    if (isWarehouseExist.length > 0) throw { errMsg: "error: warehouse already exists", statusCode: 400 };

    //create warehouse
    const createNew = await AdminWarehouseService.createWarehouse(
      warehouse_name,
      address,
      id_city,
      lat.toString(),
      lng.toString(),
      transaction,
    );

    const id_warehouse = createNew.dataValues.id_warehouse;

    // create new admin role of the new warehouse
    const createNewAdminRole = await AdminUserMgtService.createAdminRoleWarehouse(
      createNew.dataValues.id_warehouse,
      transaction,
    );

    let getProducts = await ProductService.getProducts();

    if (!getProducts.length) {
      await transaction.commit();
      return { error: null, result: createNewAdminRole };
    }

    result = [];

    for (let iter = 0; iter < getProducts.length; iter++) {
      const id_product = getProducts[iter].dataValues.id_product;
      const quantity = 0;
      const resultant_quantity = 0;
      const id_activity = 6; // initializing product stock, always start 0
      await ProductWarehouseRltService.createProductWarehouseRlt(id_product, id_warehouse, transaction);
      const response = await ProductJournalService.insertNewJournal(
        id_product,
        id_warehouse,
        id_activity,
        quantity,
        resultant_quantity,
        transaction,
      );
      result.push(response);
    }
    await transaction.commit();
    return { error: null, result };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const deleteWarehouseLogic = async (id_warehouse) => {
  const transaction = await db.sequelize.transaction();
  let result;
  try {
    const getTransactionWarehouse = await TransactionService.getTransactionsByWarehouseId(id_warehouse);

    if (getTransactionWarehouse.length)
      throw {
        errMsg: "error: can't delete warehouse which an on-going transaction still exists",
        statusCode: 400,
      };
    const getMutationWarehouse = await MutationService.findMutationByWarehouseId(id_warehouse);

    if (getMutationWarehouse.length)
      throw {
        errMsg: "error: can't delete warehouse which an on-going mutation still exists",
        statusCode: 400,
      };
    // delete warehouse
    const deleteWarehouse = await AdminWarehouseService.deleteWarehouseById(id_warehouse, transaction);
    result = deleteWarehouse[0];

    // delete products in the warehouses
    let findProducts = await ProductWarehouseRltService.getProductsInWarehouse(id_warehouse);
    findProducts = findProducts.map((productWarehouse) => {
      return productWarehouse.dataValues;
    });

    result = [];

    for (let i = 0; i < findProducts.length; i++) {
      const { id_product, id_warehouse } = findProducts[i];
      const response = await ProductWarehouseRltService.deleteStock(id_product, id_warehouse, transaction);
      result.push(response);
    }

    // check whether data changed exist
    if (!result) throw { errMsg: "error: warehouse not found", statusCode: 404 };

    await transaction.commit();
    return { error: null, result: findProducts };
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

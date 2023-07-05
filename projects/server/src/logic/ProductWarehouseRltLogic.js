const db = require("../model");
const { ProductWarehouseRltService, ProductJournalService } = require("../service");

const isNameSearchAndCategoryFilterFilled = (name_search, id_category) => {
  return name_search !== "null" && id_category;
};

const getDataWithNameAndCategoryFilter = async (offset, limit, page, name_search, id_category, id_warehouse) => {
  let productsCount = await ProductWarehouseRltService.getProductsCountWithNameAndCateogryFilter(
    name_search,
    id_category,
  );
  let productsList = await ProductWarehouseRltService.getProductsWithNameAndCategoryFilter(
    offset,
    limit,
    page,
    name_search,
    id_category,
    id_warehouse,
  );
  productsCount = productsCount[0]?.dataValues?.product_count;
  const totalPage = Math.ceil(productsCount / limit);
  return { totalPage, productsList };
};

const getDataWithCategoryFilter = async (offset, limit, page, id_category, id_warehouse) => {
  let productsCount = await ProductWarehouseRltService.getProductsCountWithCategoryFilter(id_category);
  let productsList = await ProductWarehouseRltService.getProductsWithCategoryFilter(
    offset,
    limit,
    page,
    id_category,
    id_warehouse,
  );
  productsCount = productsCount[0].dataValues.product_count;
  totalPage = Math.ceil(productsCount / limit);
  return { totalPage, productsList };
};

const getDataWithNameFilter = async (offset, limit, page, name_search, id_warehouse) => {
  let productsCount = await ProductWarehouseRltService.getProductsCountWithNameFilter(name_search);
  let productsList = await ProductWarehouseRltService.getProductsWithNameFilter(
    offset,
    limit,
    page,
    name_search,
    id_warehouse,
  );
  productsCount = productsCount[0].dataValues.product_count;
  totalPage = Math.ceil(productsCount / limit);
  return { totalPage, productsList };
};

const getDataWithoutFiltering = async (offset, limit, page, id_warehouse) => {
  let productsCount = await ProductWarehouseRltService.getProductsCountWithoutFilter();
  let productsList = await ProductWarehouseRltService.getProductsWithoutFilter(offset, limit, page, id_warehouse);
  productsCount = productsCount[0].dataValues.product_count;
  totalPage = Math.ceil(productsCount / limit);

  return { totalPage, productsList };
};

const getTotalStockProductsLogic = async (offset, limit, page, name_search, id_category, id_warehouse) => {
  let result;
  try {
    if (isNameSearchAndCategoryFilterFilled(name_search, id_category)) {
      result = await getDataWithNameAndCategoryFilter(offset, limit, page, name_search, id_category, id_warehouse);
    } else if (id_category) {
      result = await getDataWithCategoryFilter(offset, limit, page, id_category, id_warehouse);
    } else if (name_search !== "null") {
      result = await getDataWithNameFilter(offset, limit, page, name_search, id_warehouse);
    } else {
      result = await getDataWithoutFiltering(offset, limit, page, id_warehouse);
    }
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const getStockProductLogic = async (id_product, id_warehouse) => {
  let result;
  try {
    const productStock = await ProductWarehouseRltService.getStockProduct(id_product, id_warehouse);
    result = productStock.dataValues;
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const updateStockLogic = async (id_product, id_warehouse, newStock) => {
  const transaction = await db.sequelize.transaction();
  try {
    const productStockData = await ProductWarehouseRltService.getStockProduct(id_product, id_warehouse);
    if (!productStockData) throw { errMsg: "error: no product found", statusCode: 404 };
    const { stock, booked_stock, id_product_warehouse } = productStockData.dataValues;
    let stockGain = newStock - stock;
    if (stockGain === 0) throw { errMsg: "error: updated stock value is as same as old stock value", statusCode: 400 };
    const updateStock = await ProductWarehouseRltService.updateStock(
      id_product_warehouse,
      stock,
      booked_stock,
      newStock,
      transaction,
    );
    if (!updateStock[0]) throw { errMsg: "error: internal server error, try again in other minutes", statusCode: 500 };
    // id_activity : 3 => stock addition || id_activity : 2 => stock reduction
    const id_activity = stockGain > 0 ? 3 : 2;
    stockGain = Math.abs(stockGain);
    const updateProductJournal = await ProductJournalService.insertNewJournal(
      id_product,
      id_warehouse,
      id_activity,
      stockGain,
      transaction,
    );
    await transaction.commit();
    return { error: null, result: updateProductJournal };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const createStockLogic = async (id_product, id_warehouse) => {
  const transaction = await db.sequelize.transaction();
  try {
    const productStockData = await ProductWarehouseRltService.getStockProduct(id_product, id_warehouse);
    if (productStockData) throw { errMsg: "error: data already existed", statusCode: 400 };
    const createStock = await ProductWarehouseRltService.createStock(id_product, id_warehouse, transaction);
    await transaction.commit();
    return { error: null, result: createStock };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const deleteStockLogic = async (id_product, id_warehouse) => {
  const transaction = await db.sequelize.transaction();
  try {
    const deleteStock = await ProductWarehouseRltService.deleteStock(id_product, id_warehouse);
    if (!deleteStock) throw { errMsg: "error: there are no product and warehouse matched", statusCode: 404 };
    await transaction.commit();
    return { error: null, result: deleteStock };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

module.exports = {
  getTotalStockProductsLogic,
  getStockProductLogic,
  updateStockLogic,
  createStockLogic,
  deleteStockLogic,
};

// ACTIVITY TYPE ID
// id_activity : 1 => user's bought
// id_activity : 2 => stock reduction
// id_activity : 3 => stock addition
// id_activity : 4 => mutation in
// id_activity : 5 => mutation out
// id_activity : 6 => warehouse delete

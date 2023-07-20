const db = require("../model");
const {
  AdminTransactionService,
  ProductWarehouseRltService,
  MutationService,
  ProductJournalService,
} = require("../service");
const haversineFormula = require("../helper/HaversineFormula");

const getUserTransactionsLogic = async (dataInput) => {
  try {
    let usersTransaction = await AdminTransactionService.getUsersTransactions(dataInput);
    let dataCount = await AdminTransactionService.getTotalData(dataInput);
    usersTransaction = usersTransaction.map((transaction) => {
      let { user: userObject, address: addressObject } = transaction;
      let { username } = userObject.dataValues;
      let { address, city: cityObject } = addressObject.dataValues;
      let { city, type_city } = cityObject;
      transaction = { ...transaction.dataValues, user: username, address: `${address}, ${type_city} ${city}` };
      return transaction;
    });
    const totalPage = Math.ceil(dataCount[0].dataValues.dataCount / parseInt(dataInput.limit));
    const result = { dataToSend: usersTransaction, totalPage };
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const updateStatusLogic = async (id_transaction, status_update, status_before) => {
  const dbTransaction = await db.sequelize.transaction();
  try {
    const updateStatusOrder = await AdminTransactionService.updateStatus(
      id_transaction,
      status_update,
      status_before,
      dbTransaction,
    );
    if (!updateStatusOrder[0])
      throw { errMsg: "error: internal server error, please reload your page then try again", statusCode: 500 };
    await dbTransaction.commit();
    return { error: null, result: updateStatusOrder };
  } catch (error) {
    console.log(error);
    await dbTransaction.rollback();
    return { error, result: null };
  }
};

const cancelOrderLogic = async (id_transaction) => {
  const dbTransaction = await db.sequelize.transaction();
  try {
    const getUserTransaction = await AdminTransactionService.getUserTransaction(id_transaction);
    let { status_order, transaction_product_rlts, id_warehouse } = getUserTransaction.dataValues;
    transaction_product_rlts = transaction_product_rlts.map((relation) => relation.dataValues);

    if (status_order === "sending" || status_order === "shipped" || status_order === "canceled")
      throw {
        errMsg: "error: cannot cancel a delivered-state order or an already canceled-state order",
        statusCode: 400,
      };

    const updateStatusOrder = await AdminTransactionService.updateStatus(
      id_transaction,
      "canceled",
      status_order,
      dbTransaction,
    );

    if (!updateStatusOrder[0])
      throw { errMsg: "error: internal server error, please try again later", statusCode: 500 };

    for (let iter = 0; iter < transaction_product_rlts.length; iter++) {
      const { id_product, quantity } = transaction_product_rlts[iter];
      const getWarehouseProductRlts = await ProductWarehouseRltService.getProductWarehouseRlt(id_product, id_warehouse);
      const { id_product_warehouse, stock, booked_stock } = getWarehouseProductRlts.dataValues;
      const newBookedStock = booked_stock - quantity;
      const updateNewBookedStock = await MutationService.updateStockAndBookedStock(
        id_product_warehouse,
        stock,
        stock,
        newBookedStock,
        booked_stock,
        dbTransaction,
      );
      if (!updateNewBookedStock[0])
        throw { errMsg: "error: some conflict occur, please try again later", statusCode: 500 };
    }
    await dbTransaction.commit();
    return { error: null, result: "success" };
  } catch (error) {
    console.log(error);
    await dbTransaction.rollback();
    return { error, result: null };
  }
};

const autoMutationLogic = async (id_transaction) => {
  const dbTransaction = await db.sequelize.transaction();
  try {
    // get latest update of the transaction
    const getUserTransaction = await AdminTransactionService.getUserTransaction(id_transaction);
    let {
      status_order,
      transaction_product_rlts, // transaction - product relation
      id_warehouse, // warehouse where the user-order takes place (ordered-warehouse)
      warehouse: warehouseData,
    } = getUserTransaction.dataValues;

    const { longitude, latitude } = warehouseData.dataValues;
    const destination = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }; // get the long-lat of ordered-warehouse

    if (status_order !== "on-process")
      throw {
        errMsg: "error: cannot start auto mutation from a wrong-state status-order",
        statusCode: 400,
      };

    const dataInput = { transaction_product_rlts, id_warehouse, destination, dbTransaction };
    const { error, result } = await createMutationProduct(dataInput); // process continue to another func.
    if (error) throw error;

    await dbTransaction.commit();
    return { error: null, result };
  } catch (error) {
    console.log(error);
    await dbTransaction.rollback();
    return { error, result: null };
  }
};

const createMutationProduct = async (dataInput) => {
  try {
    let result = [];
    let { transaction_product_rlts, id_warehouse, destination, dbTransaction } = dataInput;
    transaction_product_rlts = transaction_product_rlts.map((relation) => relation.dataValues); // remapping object

    for (let iter = 0; iter < transaction_product_rlts.length; iter++) {
      // iteration per-item ordered-product
      const { id_product, quantity } = transaction_product_rlts[iter];
      // get data stock on warehouse where the user-order takes place (ordered-warehouse)
      const getWarehouseProductRlts = await ProductWarehouseRltService.getProductWarehouseRlt(id_product, id_warehouse);
      const { id_product_warehouse, stock } = getWarehouseProductRlts.dataValues;
      let shortageStock = quantity - stock; // get shortage value of stock
      let warehouses;
      if (shortageStock > 0) {
        // get warehouses list that may fulfilled shortage in just a single mutation
        warehouses = await AdminTransactionService.getWarehousesWhichProvideShortage(
          id_product,
          id_warehouse,
          shortageStock,
        );
        if (warehouses.length !== 0) {
          // creating mutation only from the nearest warehouse
          const { error, result: resultData } = await warehousesProvideShortageFully(
            warehouses,
            destination,
            dbTransaction,
            id_warehouse, // warehouse where the user-order takes place (ordered-warehouse)
            shortageStock,
          );
          if (error) throw error;
          result = [...result, resultData];
        } else {
          // if no warehouse can fulfilled shortage in just a single mutation, then it must be done with multiple mutations from multiple warehouses
          const { error, result: resultData } = await ifNoWarehouseProvideShortageFully(
            id_product,
            destination,
            dbTransaction,
            id_warehouse, // warehouse where the user-order takes place (ordered-warehouse)
            shortageStock,
            id_product_warehouse,
          );
          if (error) throw error;
          result = [...result, resultData];
        }
      }
    }
    return { error: null, result };
  } catch (error) {
    return { error, result: null };
  }
};

const warehousesProvideShortageFully = async (
  warehouses,
  destination,
  dbTransaction,
  id_warehouse, // warehouse where the user-order takes place (ordered-warehouse)
  shortageStock,
) => {
  try {
    warehouses = warehouses.map((warehouse) => {
      const { longitude, latitude } = warehouse.warehouse.dataValues;
      const origin = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }; // get the long-lat of candidate-warehouses
      const distance = haversineFormula(origin, destination);
      return { ...warehouse.dataValues, longitude, latitude, warehouse: null, distance };
    });
    warehouses = warehouses.sort((a, b) => a.distance - b.distance); // distance sorting ASC
    const {
      id_product_warehouse: id_nearest_prod_warehouse_rlt,
      id_warehouse: from_id_warehouse,
      id_product,
      stock: stockBeforeMutation,
      booked_stock,
    } = warehouses[0]; // take the nearest warehouse data
    const createMutation = await AdminTransactionService.createAutoMutationRequest(
      id_product,
      shortageStock,
      from_id_warehouse, // this is the nearest warehouse
      id_warehouse, // warehouse where the user-order takes place (ordered-warehouse)
      dbTransaction,
    ); // create mutation out (sending to ordered-warehouse)
    const stockAfterMutation = stockBeforeMutation - shortageStock;
    // updating stock after a mutation-out
    const updateProductAfterMutationOut = await MutationService.updateStockAndBookedStock(
      id_nearest_prod_warehouse_rlt, // relation id of product-warehouse (nearest)
      stockAfterMutation,
      stockBeforeMutation,
      booked_stock,
      booked_stock,
      dbTransaction,
    );

    if (!updateProductAfterMutationOut[0])
      throw { errMsg: "error: some conflict occurs, try again later", statusCode: 404 };

    // record the mutation-out into journal
    const updateProductJournal = await ProductJournalService.insertNewJournal(
      id_product,
      from_id_warehouse,
      5, // mutation-out id_journal
      shortageStock,
      stockAfterMutation,
      dbTransaction,
    );
    return { error: null, result: updateProductJournal };
  } catch (error) {
    return { error, result: null };
  }
};

const ifNoWarehouseProvideShortageFully = async (
  id_product,
  destination,
  dbTransaction,
  id_warehouse, // warehouse where the user-order takes place (ordered-warehouse)
  shortageStock,
) => {
  try {
    let result = [];
    let shortageRemains = shortageStock;
    let warehouses = await AdminTransactionService.getWarehousesWhichProvideProduct(id_product, id_warehouse);
    warehouses = warehouses.map((warehouse) => {
      const { longitude, latitude } = warehouse;
      const origin = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }; // get the long-lat of candidate-warehouses
      const distance = haversineFormula(origin, destination);
      return { ...warehouse, distance };
    });
    warehouses = warehouses.sort((a, b) => a.distance - b.distance);
    // iteration for every warehouse from nearest into farthest
    for (let newIter = 0; newIter < warehouses.length; newIter++) {
      let {
        id_product_warehouse: id_nearest_prod_warehouse_rlt,
        id_warehouse: from_id_warehouse,
        id_product,
        stock: stockBeforeMutation,
        remainStock: maxStockToTransfer,
        booked_stock,
      } = warehouses[newIter]; // take the candidate warehouse data

      // decide number of stock to be transferred
      const stockToTransfer = shortageRemains - maxStockToTransfer < 0 ? shortageRemains : maxStockToTransfer;

      const createMutation = await AdminTransactionService.createAutoMutationRequest(
        id_product,
        stockToTransfer,
        from_id_warehouse, // this is the candidate warehouse
        id_warehouse, // warehouse where the user-order takes place (ordered-warehouse)
        dbTransaction,
      ); // create mutation out (sending to ordered-warehouse)
      const stockAfterMutation = stockBeforeMutation - stockToTransfer;
      const updateProductAfterMutationOut = await MutationService.updateStockAndBookedStock(
        id_nearest_prod_warehouse_rlt, // relation id of product-warehouse (candidate warehouse)
        stockAfterMutation,
        stockBeforeMutation,
        booked_stock,
        booked_stock,
        dbTransaction,
      );

      if (!updateProductAfterMutationOut[0])
        throw { errMsg: "error: some conflict occurs, try again later", statusCode: 404 };
      // record the mutation-out into journal
      const updateProductJournal = await ProductJournalService.insertNewJournal(
        id_product,
        from_id_warehouse,
        5, // mutation-out id_journal
        stockToTransfer,
        stockAfterMutation,
        dbTransaction,
      );
      result.push(`iter ${newIter + 1} success`);
      shortageRemains = shortageRemains - stockToTransfer;
      if (shortageRemains > 0) {
        continue;
      } else {
        break;
      }
    }
    return { error: null, result };
  } catch (error) {
    return { error, result: null };
  }
};

const sendOrderLogic = async (id_transaction) => {
  const dbTransaction = await db.sequelize.transaction();
  try {
    // get latest update of the transaction
    const getUserTransaction = await AdminTransactionService.getUserTransaction(id_transaction);
    let { status_order, transaction_product_rlts, id_warehouse } = getUserTransaction.dataValues;
    transaction_product_rlts = transaction_product_rlts.map((relation) => relation.dataValues); // remapping data

    if (status_order !== "on-process")
      throw {
        errMsg: "error: cannot start sending order from a wrong-state status-order",
        statusCode: 400,
      };

    const updateStatusOrder = await AdminTransactionService.updateStatus(
      id_transaction,
      "sending",
      status_order,
      dbTransaction,
    );

    if (!updateStatusOrder[0])
      throw { errMsg: "error: internal server error, please reload your page then try again", statusCode: 500 };

    for (let iter = 0; iter < transaction_product_rlts.length; iter++) {
      // iteration per-item ordered-product
      const { id_product, quantity } = transaction_product_rlts[iter];
      // get latest updated data on warehouse where the user-order takes place (ordered-warehouse)
      const getWarehouseProductRlts = await ProductWarehouseRltService.getProductWarehouseRlt(id_product, id_warehouse);
      const { id_product_warehouse, stock: stockBeforeSend, booked_stock } = getWarehouseProductRlts.dataValues;
      const stockAfterSend = stockBeforeSend - quantity;
      const newBookedStock = booked_stock - quantity;
      if (stockAfterSend < 0)
        throw { errMsg: "error: not enough stock, please refresh to get latest updated data", statusCode: 500 };

      const updateProductAfterSendOrder = await MutationService.updateStockAndBookedStock(
        id_product_warehouse,
        stockAfterSend,
        stockBeforeSend,
        newBookedStock,
        booked_stock,
        dbTransaction,
      );

      if (!updateProductAfterSendOrder[0])
        throw { errMsg: "error: some conflict occurs, try again later", statusCode: 404 };

      const updateProductJournal = await ProductJournalService.insertNewJournal(
        id_product,
        id_warehouse,
        1, // user's bought journal id
        quantity,
        stockAfterSend,
        dbTransaction,
      );
    }
    await dbTransaction.commit();
    return { error: null, result: "success" };
  } catch (error) {
    console.log(error);
    await dbTransaction.rollback();
    return { error, result: null };
  }
};

module.exports = {
  getUserTransactionsLogic,
  updateStatusLogic,
  cancelOrderLogic,
  autoMutationLogic,
  sendOrderLogic,
};

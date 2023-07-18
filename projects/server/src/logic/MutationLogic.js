const db = require("../model");
const { MutationService, ProductWarehouseRltService, ProductJournalService } = require("../service");

const createNewMutationRequestLogic = async (data) => {
  const { id_user, id_product, quantity, from_id_warehouse, to_id_warehouse } = data;
  const transaction = await db.sequelize.transaction();
  try {
    const findExistingMutation = await MutationService.findMutationByProductAndWarehouse(
      id_product,
      from_id_warehouse,
      to_id_warehouse,
    );

    if (from_id_warehouse === to_id_warehouse) throw { errMsg: "error: bad request", statusCode: 400 };

    if (findExistingMutation.length)
      throw {
        errMsg: `error: there is an on-going mutation with same two-warehouses (requester and requested) and same product. 
You can make a new request after the on-going process are rejected or finished`,
        statusCode: 400,
      };

    const findRequestedWarehouse = await ProductWarehouseRltService.getProductWarehouseRlt(
      id_product,
      from_id_warehouse,
    );
    let { id_product_warehouse, stock, booked_stock } = findRequestedWarehouse;

    const findRequesterWarehouse = await ProductWarehouseRltService.getProductWarehouseRlt(id_product, to_id_warehouse);

    if (!findRequesterWarehouse)
      throw { errMsg: "error: The stock has not been created on the requester's side", statusCode: 400 };

    //update a new stock in a target warehouse after booked by a mutation request
    const availableStock = stock - booked_stock - quantity;
    if (availableStock < 0)
      throw { errMsg: "error: not enough stock to initiate a mutation request, please refresh page", statusCode: 400 };
    const newBookedStock = booked_stock + quantity;
    const updateStockAndBookedStock = await MutationService.updateStockAndBookedStock(
      id_product_warehouse,
      stock,
      stock,
      newBookedStock,
      booked_stock,
      transaction,
    );

    if (!updateStockAndBookedStock[0]) throw { errMsg: "error: server error, please try again later", statusCode: 500 };

    // create a new mutation request
    const createMutationRequest = await MutationService.insertNewMutation(
      id_user,
      id_product,
      quantity,
      from_id_warehouse,
      to_id_warehouse,
      transaction,
    );

    if (!createMutationRequest.dataValues)
      throw { errMsg: "error: server error, please try again later", statusCode: 500 };

    await transaction.commit();
    return { error: null, result: createMutationRequest.dataValues };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return { error, result: null };
  }
};

const fetchMutationRequestsLogic = async (data) => {
  try {
    const totalData = await MutationService.fetchDatasCount(data);
    const totalPage = Math.ceil(totalData[0].dataCount / data.limit);
    const dataToSend = await MutationService.fetchDatas(data);
    return { error: null, result: { totalPage, dataToSend } };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const notAuthorizedToAct = (adminData, mutationData) => {
  return notSuperAdmin(adminData) && notAnAdminInTheWarehouse(mutationData, adminData);
};

const notSuperAdmin = (adminData) => {
  return adminData.id_role !== 1;
};

const notAnAdminInTheWarehouse = (mutationData, adminData) => {
  return mutationData.from_id_warehouse !== adminData.id_warehouse;
};

const approvingMutationLogic = async (input) => {
  let { adminData, mutationData } = input;
  const transaction = await db.sequelize.transaction();
  try {
    const mutationDataByPk = await MutationService.findMutationByPk(mutationData.id_mutation);
    mutationData = { ...mutationData, ...mutationDataByPk.dataValues };
    if (notAuthorizedToAct(adminData, mutationData)) {
      throw { errMsg: "error: not authorized to approve", statusCode: 401 };
    }
    const updateIsApprove = await MutationService.updateIsApprove(
      mutationData.id_mutation,
      adminData.id_user,
      transaction,
    );

    const getWarehouseRequestedData = await ProductWarehouseRltService.getProductWarehouseRlt(
      mutationData.id_product,
      mutationData.from_id_warehouse,
    );
    const { stock, booked_stock, id_product_warehouse } = getWarehouseRequestedData.dataValues;
    const newBookedStock = booked_stock - mutationData.quantity;
    const newStock = stock - mutationData.quantity;
    const updateStockAndBookedStock = await MutationService.updateStockAndBookedStock(
      id_product_warehouse,
      newStock,
      stock,
      newBookedStock,
      booked_stock,
      transaction,
    );
    if (!updateIsApprove[0] && !updateStockAndBookedStock[0]) throw { errMsg: "error: not found", statusCode: 404 };
    let resultant_quantity = stock;
    const insertNewJournal = await ProductJournalService.insertNewJournal(
      mutationData.id_product,
      mutationData.from_id_warehouse,
      5,
      mutationData.quantity,
      resultant_quantity,
      transaction,
    );

    await transaction.commit();
    return { error: null, result: insertNewJournal };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return { error, result: null };
  }
};

const rejectMutationLogic = async (input) => {
  let { adminData, mutationData } = input;
  const transaction = await db.sequelize.transaction();
  try {
    const mutationDataByPk = await MutationService.findMutationByPk(mutationData.id_mutation);
    mutationData = { ...mutationData, ...mutationDataByPk.dataValues };
    if (notAuthorizedToAct(adminData, mutationData))
      throw { errMsg: "error: not authorized to reject", statusCode: 401 };
    const updateIsReject = await MutationService.updateIsReject(
      mutationData.id_mutation,
      adminData.id_user,
      transaction,
    );
    if (!updateIsReject[0]) throw { errMsg: "error: not found", statusCode: 404 };
    const getWarehouseRequestedData = await ProductWarehouseRltService.getProductWarehouseRlt(
      mutationData.id_product,
      mutationData.from_id_warehouse,
    );
    const { stock, booked_stock, id_product_warehouse } = getWarehouseRequestedData.dataValues;
    const newBookedStock = booked_stock - mutationData.quantity;
    const returningStockAfterReject = await MutationService.updateStockAndBookedStock(
      id_product_warehouse,
      stock,
      stock,
      newBookedStock,
      booked_stock,
      transaction,
    );

    await transaction.commit();
    return { error: null, result: returningStockAfterReject };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return { error, result: null };
  }
};

const acceptLogic = async (input) => {
  let { adminData, mutationData } = input;
  const transaction = await db.sequelize.transaction();
  try {
    const mutationDataByPk = await MutationService.findMutationByPk(mutationData.id_mutation);
    mutationData = { ...mutationData, ...mutationDataByPk.dataValues };
    if (adminData.id_warehouse !== mutationData.to_id_warehouse) {
      throw { errMsg: "error: not authorized", statusCode: 401 };
    }
    const updateIsAccept = await MutationService.updateIsAccept(
      mutationData.id_mutation,
      adminData.id_user,
      transaction,
    );
    if (!updateIsAccept[0]) throw { errMsg: "error: server error, please try again later", statusCode: 404 };

    const getWarehouseRequesterData = await ProductWarehouseRltService.getProductWarehouseRlt(
      mutationData.id_product,
      mutationData.to_id_warehouse,
    );
    const { stock, booked_stock, id_product_warehouse } = getWarehouseRequesterData.dataValues;
    const newStock = stock + mutationData.quantity;
    const updateStock = await MutationService.updateStockAndBookedStock(
      id_product_warehouse,
      newStock,
      stock,
      booked_stock,
      booked_stock,
      transaction,
    );

    if (!updateStock[0]) throw { errMsg: "error: server error, please try again later", statusCode: 404 };

    const insertNewJournal = await ProductJournalService.insertNewJournal(
      mutationData.id_product,
      mutationData.to_id_warehouse,
      4,
      mutationData.quantity,
      newStock,
      transaction,
    );

    await transaction.commit();
    return { error: null, result: insertNewJournal };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return { error, result: null };
  }
};

module.exports = {
  createNewMutationRequestLogic,
  fetchMutationRequestsLogic,
  approvingMutationLogic,
  rejectMutationLogic,
  acceptLogic,
};

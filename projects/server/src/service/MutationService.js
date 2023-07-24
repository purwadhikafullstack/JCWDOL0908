const db = require("../model");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { sequelize, MutationProcess, ProductWarehouseRlt } = db;

const insertNewMutation = async (id_user, id_product, quantity, from_id_warehouse, to_id_warehouse, transaction) => {
  const newRequest = await MutationProcess.create(
    {
      id_product,
      quantity,
      from_id_warehouse,
      to_id_warehouse,
      created_by: id_user,
    },
    { transaction },
  );
  return newRequest;
};

const updateStockAndBookedStock = async (
  id_product_warehouse,
  newStock,
  stock,
  newBookedStock,
  booked_stock,
  transaction,
) => {
  const update = await ProductWarehouseRlt.update(
    { stock: newStock, booked_stock: newBookedStock },
    { where: { id_product_warehouse, stock, booked_stock }, transaction },
  );
  return update;
};

const conditionQuery = (id_warehouse, mutationType) => {
  let condition;
  if (id_warehouse && mutationType == "mutation-in") {
    condition = `mp.to_id_warehouse=${id_warehouse} AND`;
  } else if (id_warehouse && mutationType == "mutation-out") {
    condition = `mp.from_id_warehouse=${id_warehouse} AND`;
  } else if (id_warehouse && !mutationType) {
    condition = `(mp.to_id_warehouse=${id_warehouse} OR mp.from_id_warehouse=${id_warehouse}) AND`;
  } else {
    condition = "mp.id_mutation<>0 AND";
  }
  return condition;
};

const statusConditionQuery = (status, conditionBefore) => {
  if (status === "done") {
    conditionBefore += " mp.is_accepted=1";
  } else if (status === "rejected") {
    conditionBefore += " mp.is_reject=1";
  } else if (status === "on-delivery") {
    conditionBefore += " mp.is_sending=1 AND mp.is_accepted=0";
  } else if (status === "approval-request") {
    conditionBefore += " mp.is_approve=0 AND mp.is_reject=0";
  } else {
    conditionBefore += " mp.quantity <> 0";
  }
  return conditionBefore;
};

const fetchDatas = async (data) => {
  const { id_warehouse, mutationType, offset, limit, page, status } = data;
  let condition = conditionQuery(id_warehouse, mutationType);
  condition = statusConditionQuery(status, condition);
  const result = await sequelize.query(
    `SELECT mp.*, p.product_name, u.username as creator,
     w.warehouse_name as from_warehouse, ww.warehouse_name as to_warehouse,
     w.is_deleted as requested_deleted, ww.is_deleted as requester_deleted,
     uu.username as approver, uuu.username as rejector, uuuu.username as acceptor
     FROM mutation_processes mp 
     JOIN warehouses w ON mp.from_id_warehouse = w.id_warehouse
     JOIN warehouses ww ON mp.to_id_warehouse = ww.id_warehouse
     JOIN products p ON mp.id_product = p.id_product
     JOIN users u ON mp.created_by = u.id_user
     LEFT JOIN users uu ON mp.approved_by = uu.id_user
     LEFT JOIN users uuu ON mp.rejected_by = uuu.id_user
     LEFT JOIN users uuuu ON mp.accepted_by = uuuu.id_user
     WHERE ${condition} ORDER BY mp.updatedAt DESC 
     LIMIT ${offset * (page - 1)},${limit} `,
    { type: QueryTypes.SELECT },
  );
  return result;
};

const fetchDatasCount = async (data) => {
  const { id_warehouse, mutationType, status } = data;
  let condition = conditionQuery(id_warehouse, mutationType);
  condition = statusConditionQuery(status, condition);
  let totalCount = await sequelize.query(
    `SELECT COUNT(id_mutation) as dataCount
  FROM mutation_processes mp WHERE ${condition}`,
    {
      type: QueryTypes.SELECT,
    },
  );
  return totalCount;
};

const findMutationByPk = async (id) => {
  const result = await MutationProcess.findByPk(id);
  return result;
};

const updateIsApprove = async (id_mutation, approved_by, transaction) => {
  const update = await MutationProcess.update(
    { is_approve: 1, approved_by, is_sending: 1 },
    {
      where: { id_mutation },
      transaction,
    },
  );
  return update;
};

const updateIsReject = async (id_mutation, rejected_by, transaction) => {
  const update = await MutationProcess.update(
    { is_reject: 1, rejected_by },
    {
      where: { id_mutation },
      transaction,
    },
  );
  return update;
};

const updateIsAccept = async (id_mutation, accepted_by, transaction) => {
  const update = await MutationProcess.update(
    { is_accepted: 1, accepted_by },
    {
      where: { id_mutation },
      transaction,
    },
  );
  return update;
};

const updateStock = async (id_product_warehouse, stock, booked_stock, newStock, transaction) => {
  const updateStock = await ProductWarehouseRlt.update(
    { stock: newStock },
    { where: { id_product_warehouse, stock, booked_stock }, transaction },
  );
  return updateStock;
};

const findMutationByWarehouseId = async (id_warehouse) => {
  const mutation = await MutationProcess.findAll({
    where: {
      [Op.or]: [{ from_id_warehouse: id_warehouse }, { to_id_warehouse: id_warehouse }],
      is_sending: 1,
      is_approve: 1,
      is_accepted: 0,
    },
  });
  return mutation;
};

const findMutationByProductAndWarehouse = async (id_product, from_id_warehouse, to_id_warehouse) => {
  const mutationData = await MutationProcess.findAll({
    where: {
      from_id_warehouse,
      to_id_warehouse,
      id_product,
      [Op.or]: [
        { is_approve: 0, is_reject: 0 },
        { is_approve: 1, is_accepted: 0 },
      ],
    },
  });
  return mutationData;
};

module.exports = {
  insertNewMutation,
  updateStockAndBookedStock,
  fetchDatas,
  fetchDatasCount,
  findMutationByPk,
  updateIsApprove,
  updateIsReject,
  updateIsAccept,
  updateStock,
  findMutationByWarehouseId,
  findMutationByProductAndWarehouse,
};

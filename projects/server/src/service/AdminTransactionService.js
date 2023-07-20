const db = require("../model");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const {
  sequelize,
  Transaction,
  User,
  Address,
  City,
  TransactionProductRlt,
  Warehouse,
  Product,
  ProductWarehouseRlt,
  MutationProcess,
} = db;

const getUsersTransactions = async (dataInput) => {
  let { id_warehouse, offset, limit, page, status_order } = dataInput;
  let data;
  if (!status_order) {
    status_order = { [Op.not]: "" };
  }
  if (id_warehouse) {
    data = await Transaction.findAll({
      where: {
        id_warehouse,
        status_order,
      },
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Address,
          attributes: ["address", "id_city"],
          include: {
            model: City,
            attributes: ["type_city", "city"],
          },
        },
        { model: TransactionProductRlt, include: { model: Product } },
        { model: Warehouse },
      ],
      offset: parseInt(offset) * (parseInt(page) - 1),
      limit: parseInt(limit),
      order: [["updatedAt", "DESC"]],
    });
  } else {
    data = await Transaction.findAll({
      where: {
        status_order,
      },
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Address,
          attributes: ["address", "id_city"],
          include: {
            model: City,
            attributes: ["type_city", "city"],
          },
        },
        { model: TransactionProductRlt, include: { model: Product } },
        { model: Warehouse },
      ],
      offset: parseInt(offset) * (parseInt(page) - 1),
      limit: parseInt(limit),
      order: [["updatedAt", "DESC"]],
    });
  }
  return data;
};

const getTotalData = async (dataInput) => {
  let { id_warehouse, status_order } = dataInput;
  let dataCount;
  if (!status_order) {
    status_order = { [Op.not]: "" };
  }
  if (id_warehouse) {
    dataCount = await Transaction.findAll({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id_transaction")), "dataCount"]],
      where: { status_order, id_warehouse },
    });
  } else {
    dataCount = await Transaction.findAll({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id_transaction")), "dataCount"]],
      where: { status_order },
    });
  }
  return dataCount;
};

const getUserTransaction = async (id_transaction) => {
  const transaction = await Transaction.findOne({
    where: { id_transaction },
    include: [{ model: TransactionProductRlt }, { model: Warehouse }],
  });
  return transaction;
};

const updateStatus = async (id_transaction, status_update, status_before, transaction) => {
  const reject = await Transaction.update(
    { status_order: status_update },
    { where: { id_transaction, status_order: status_before }, transaction },
  );
  return reject;
};

const getWarehousesWhichProvideShortage = async (id_product, id_warehouse, shortage) => {
  const warehouses = await ProductWarehouseRlt.findAll({
    where: { id_product, stock: { [Op.gte]: shortage }, is_deleted: 0, id_warehouse: { [Op.not]: id_warehouse } },
    include: { model: Warehouse },
  });
  return warehouses;
};

const getWarehousesWhichProvideProduct = async (id_product, id_warehouse) => {
  const warehouses = await sequelize.query(
    `
    SELECT pw.*, pw.stock-pw.booked_stock AS remainStock,
    w.latitude, w.longitude
    FROM jcwdol0908.product_warehouse_rlt pw
    JOIN warehouses w ON pw.id_warehouse = w.id_warehouse
    WHERE pw.stock-pw.booked_stock>0 AND pw.is_deleted = 0 AND pw.id_product = ${id_product}
    AND NOT pw.id_warehouse=${id_warehouse} ;`,
    { type: QueryTypes.SELECT },
  );
  return warehouses;
};

const createAutoMutationRequest = async (id_product, quantity, from_id_warehouse, to_id_warehouse, transaction) => {
  const newRequest = await MutationProcess.create(
    {
      id_product,
      quantity,
      from_id_warehouse,
      to_id_warehouse,
      is_approve: 1,
      is_sending: 1,
      created_by: 2, //super-admin's user_id
      approved_by: 2, //super-admin's user_id
    },
    { transaction },
  );
  return newRequest;
};

module.exports = {
  getUsersTransactions,
  getTotalData,
  getUserTransaction,
  updateStatus,
  getWarehousesWhichProvideShortage,
  getWarehousesWhichProvideProduct,
  createAutoMutationRequest,
};

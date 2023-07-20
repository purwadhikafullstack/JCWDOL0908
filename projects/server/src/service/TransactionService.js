const db = require("../model");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { sequelize, Transaction } = db;

const getTransactionsByWarehouseId = async (id_warehouse) => {
  const transactions = Transaction.findAll({
    where: {
      id_warehouse,
      [Op.or]: [
        { status_order: "waiting-for-payment" },
        { status_order: "payment-confirmation" },
        { status_order: "rejected" },
        { status_order: "on-process" },
        { status_order: "sending" },
      ],
    },
  });
  return transactions;
};

module.exports = { getTransactionsByWarehouseId };

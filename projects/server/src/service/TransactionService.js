const db = require("../model");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { sequelize, Transaction } = db;

const getTransactionsByWarehouseId = async (id_warehouse) => {
  const transactions = Transaction.findAll({
    where: { id_warehouse, is_approve: 1, is_accepted: 0 },
  });
  return transactions;
};

module.exports = { getTransactionsByWarehouseId };

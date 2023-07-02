const db = require("../model");
const { sequelize, ProductJournal } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const insertNewJournal = async (id_product, id_warehouse, id_activity, quantity, transaction) => {
  const response = await ProductJournal.create({ id_product, id_warehouse, id_activity, quantity }, { transaction });
  return response;
};

module.exports = { insertNewJournal };

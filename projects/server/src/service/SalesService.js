const db = require("../model");
const { sequelize, Transaction } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const getTotalSales = async (dataInput) => {
  const { startDate, endDate, id_warehouse } = dataInput;
  const totalSales = await sequelize.query(
    `
    SELECT SUM(total_price-shipping_cost) as totalTransaction FROM transactions 
    WHERE createdAt BETWEEN ${
      startDate && endDate ? `'${startDate}' AND '${endDate}'` : "'2023-01-01 00:00:01' AND '2023-12-31 23:59:59'"
    }
    ${id_warehouse ? `AND id_warehouse = ${id_warehouse}` : ``}
    AND status_order = 'shipped'
    `,
    { type: QueryTypes.SELECT },
  );
  return totalSales;
};

const salesCategories = async (dataInput) => {
  const { startDate, endDate, id_warehouse, limit } = dataInput;
  const totalSales = await sequelize.query(
    `
    SELECT c.category_name, 
    SUM(tp.quantity) as totalItem ,
    SUM(p.price * tp.quantity) as totalTransaction 
    FROM transaction_product_rlt tp
    JOIN products p ON p.id_product = tp.id_product
    JOIN categories c ON c.id_category = p.id_category
    JOIN transactions t ON t.id_transaction = tp.id_transaction
    WHERE t.createdAt BETWEEN ${
      startDate && endDate ? `'${startDate}' AND '${endDate}'` : "'2023-01-01 00:00:01' AND '2023-12-31 23:59:59'"
    }
      ${id_warehouse ? `AND id_warehouse = ${id_warehouse}` : ``}
    AND t.status_order = 'shipped'
    GROUP BY c.id_category
    ORDER BY totalTransaction DESC
    ${limit ? `LIMIT ${limit};` : ";"}
    `,
    { type: QueryTypes.SELECT },
  );
  return totalSales;
};

const salesProduct = async (dataInput) => {
  const { startDate, endDate, id_warehouse, limit } = dataInput;
  const totalSales = await sequelize.query(
    `
      SELECT p.product_name, p.price as pricePerItem,
      SUM(tp.quantity) as totalItem ,
      SUM(p.price * tp.quantity) as totalTransaction 
      FROM transaction_product_rlt tp
      JOIN products p ON p.id_product = tp.id_product
      JOIN transactions t ON t.id_transaction = tp.id_transaction
      WHERE t.createdAt BETWEEN ${
        startDate && endDate ? `'${startDate}' AND '${endDate}'` : "'2023-01-01 00:00:01' AND '2023-12-31 23:59:59'"
      }
        ${id_warehouse ? `AND id_warehouse = ${id_warehouse}` : ``} 
      AND t.status_order = 'shipped'
      GROUP BY p.id_product
      ORDER BY totalTransaction DESC
      ${limit ? `LIMIT ${limit};` : ";"}
      `,
    { type: QueryTypes.SELECT },
  );
  return totalSales;
};

module.exports = { getTotalSales, salesCategories, salesProduct };

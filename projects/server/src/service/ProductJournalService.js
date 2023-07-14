const db = require("../model");
const { sequelize, ProductJournal } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const insertNewJournal = async (id_product, id_warehouse, id_activity, quantity, resultant_quantity, transaction) => {
  const response = await ProductJournal.create(
    { id_product, id_warehouse, id_activity, quantity, resultant_quantity },
    { transaction },
  );
  return response;
};

const getProductJournal = async (dataInput) => {
  const { id_warehouse, currentMonth, lastMonth, id_category, offset, limit, page } = dataInput;
  const response = await sequelize.query(
    `
SELECT pj.id_product, p.product_name, pj.id_warehouse, w.warehouse_name,
(SELECT resultant_quantity FROM product_journal 
WHERE id_warehouse=${id_warehouse} AND id_product=pj.id_product
AND updatedAt BETWEEN '${lastMonth.startDate}' AND '${lastMonth.endDate}'
ORDER BY updatedAt DESC LIMIT 1) as qty_before, 
SUM(IF(pj.id_activity = 3 OR pj.id_activity = 4,pj.quantity,0 )) as total_addition,
SUM(IF(pj.id_activity = 2 OR pj.id_activity = 5,pj.quantity,0 )) as total_substraction,
(SELECT resultant_quantity FROM product_journal 
WHERE id_warehouse=${id_warehouse} AND id_product=pj.id_product
AND updatedAt BETWEEN '${currentMonth.startDate}' AND '${currentMonth.endDate}'
ORDER BY updatedAt DESC LIMIT 1) as qty_after
FROM product_journal pj 
JOIN products p ON p.id_product = pj.id_product
JOIN warehouses w ON pj.id_warehouse = w.id_warehouse
WHERE pj.id_warehouse = ${id_warehouse}
${id_category ? "AND p.id_category =" + id_category + " " : ""}
AND pj.updatedAt  BETWEEN '${currentMonth.startDate}' AND '${currentMonth.endDate}'
GROUP BY pj.id_product 
ORDER BY pj.id_product DESC
LIMIT ${offset * (page - 1)}, ${limit};`,
    { type: QueryTypes.SELECT },
  );
  return response;
};

const getTotalDataCount = async (dataInput) => {
  const { id_warehouse, currentMonth, id_category } = dataInput;
  const response = await sequelize.query(
    `
  SELECT COUNT(*) as dataCount FROM
  (SELECT COUNT(pj.id_product) as dataCount 
  FROM product_journal pj ${id_category ? "JOIN products p ON p.id_product = pj.id_product" : ""}
  WHERE pj.id_warehouse = ${id_warehouse} ${id_category ? "AND p.id_category = " + id_category + " " : ""}
  AND pj.updatedAt BETWEEN '${currentMonth.startDate}' AND '${currentMonth.endDate}'
  GROUP BY pj.id_product) data;
  `,
    { type: QueryTypes.SELECT },
  );
  return response;
};

const getProductJournalDetails = async (dataInput) => {
  const { id_warehouse, startDate, id_product, endDate } = dataInput;
  const response = await sequelize.query(
    `
    SELECT pj.*, j.activity_name FROM jcwdol0908.product_journal pj
    JOIN jcwdol0908.activity_type_journal j ON j.id_activity = pj.id_activity
    WHERE pj.id_warehouse=${id_warehouse} AND pj.id_product=${id_product} 
    AND pj.updatedAt BETWEEN '${startDate}' AND '${endDate}'
    ORDER BY pj.updatedAt DESC ;
  `,
    { type: QueryTypes.SELECT },
  );
  return response;
};

module.exports = { insertNewJournal, getProductJournal, getTotalDataCount, getProductJournalDetails };

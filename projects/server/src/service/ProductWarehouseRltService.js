const db = require("../model");
const { sequelize, ProductWarehouseRlt, Product, Warehouse, City } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const createProductWarehouseRlt = async (id_product, id_warehouse, transaction) => {
  const response = await ProductWarehouseRlt.create(
    { id_product, stock: 0, id_warehouse, booked_stock: 0 },
    { transaction },
  );
  return response;
};

const getProductsCountWithNameAndCateogryFilter = async (name_search, id_category) => {
  const productsCount = await Product.findAll({
    where: { is_deleted: 0, id_category, product_name: { [Op.substring]: name_search } },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_product")), "product_count"]],
  });
  return productsCount;
};

// if super admin then there is no value on id_warehouse
const getProductsWithNameAndCategoryFilter = async (offset, limit, page, name_search, id_category, id_warehouse) => {
  const products = await sequelize.query(
    `SELECT p.id_product,p.product_name , ${id_warehouse ? "pw.stock" : "SUM(pw.stock)"} as totalStock, 
    ${id_warehouse ? "pw.booked_stock" : "SUM(pw.booked_stock)"} as bookedStock, p.weight_kg 
    FROM product_warehouse_rlt pw JOIN products p ON pw.id_product = p.id_product JOIN warehouses w ON w.id_warehouse = pw.id_warehouse
    WHERE pw.is_deleted = 0 AND w.is_deleted = 0 AND p.product_name LIKE '%${name_search}%' AND p.id_category = ${id_category} 
    ${id_warehouse ? "AND pw.id_warehouse = " + id_warehouse : ""} 
    ${id_warehouse ? "" : "GROUP BY p.id_product"} ORDER BY p.product_name LIMIT ${offset * (page - 1)},${limit}`,
    { type: QueryTypes.SELECT },
  );
  return products;
};

const getProductsCountWithNameFilter = async (name_search) => {
  const productsCount = await Product.findAll({
    where: { is_deleted: 0, product_name: { [Op.substring]: name_search } },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_product")), "product_count"]],
  });
  return productsCount;
};

const getProductsCountWithCategoryFilter = async (id_category) => {
  const productsCount = await Product.findAll({
    where: { is_deleted: 0, id_category },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_product")), "product_count"]],
  });

  return productsCount;
};

// if super admin then there is no value on id_warehouse
const getProductsWithNameFilter = async (offset, limit, page, name_search, id_warehouse) => {
  const products = await sequelize.query(
    `SELECT p.id_product,p.product_name , ${id_warehouse ? "pw.stock" : "SUM(pw.stock)"} as totalStock, 
    ${id_warehouse ? "pw.booked_stock" : "SUM(pw.booked_stock)"} as bookedStock, p.weight_kg 
    FROM product_warehouse_rlt pw JOIN products p ON pw.id_product = p.id_product JOIN warehouses w ON w.id_warehouse = pw.id_warehouse
    WHERE pw.is_deleted = 0 AND w.is_deleted = 0 AND p.product_name LIKE '%${name_search}%' 
    ${id_warehouse ? "AND pw.id_warehouse = " + id_warehouse : ""} 
    ${id_warehouse ? "" : "GROUP BY p.id_product"} ORDER BY p.product_name LIMIT ${offset * (page - 1)},${limit}`,
    { type: QueryTypes.SELECT },
  );
  return products;
};

// if super admin then there is no value on id_warehouse
const getProductsWithCategoryFilter = async (offset, limit, page, id_category, id_warehouse) => {
  const products = await sequelize.query(
    `SELECT p.id_product,p.product_name , ${id_warehouse ? "pw.stock" : "SUM(pw.stock)"} as totalStock, 
    ${id_warehouse ? "pw.booked_stock" : "SUM(pw.booked_stock)"} as bookedStock, p.weight_kg 
    FROM product_warehouse_rlt pw JOIN products p ON pw.id_product = p.id_product JOIN warehouses w ON w.id_warehouse = pw.id_warehouse
    WHERE pw.is_deleted = 0 AND w.is_deleted = 0 AND p.id_category = ${id_category} 
    ${id_warehouse ? "AND pw.id_warehouse = " + id_warehouse : ""}
    ${id_warehouse ? "" : "GROUP BY p.id_product"} ORDER BY p.product_name LIMIT ${offset * (page - 1)},${limit}`,
    { type: QueryTypes.SELECT },
  );
  return products;
};

// if super admin then there is no value on id_warehouse
const getProductsWithoutFilter = async (offset, limit, page, id_warehouse) => {
  const products = await sequelize.query(
    `SELECT p.id_product,p.product_name , ${id_warehouse ? "pw.stock" : "SUM(pw.stock)"} as totalStock, 
    ${id_warehouse ? "pw.booked_stock" : "SUM(pw.booked_stock)"} as bookedStock, p.weight_kg 
    FROM product_warehouse_rlt pw JOIN products p ON pw.id_product = p.id_product JOIN warehouses w ON w.id_warehouse = pw.id_warehouse
    WHERE pw.is_deleted = 0 AND w.is_deleted = 0 ${id_warehouse ? "AND pw.id_warehouse = " + id_warehouse : ""} 
    ${id_warehouse ? "" : "GROUP BY p.id_product"} ORDER BY p.product_name 
    LIMIT ${offset * (page - 1)},${limit}`,
    { type: QueryTypes.SELECT },
  );
  return products;
};

const getProductsCountWithoutFilter = async () => {
  const productsCount = await Product.findAll({
    where: { is_deleted: 0 },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_product")), "product_count"]],
  });
  return productsCount;
};

const getStockProduct = async (id_product, id_warehouse) => {
  const productDetail = await ProductWarehouseRlt.findOne({
    where: { is_deleted: 0, id_warehouse, id_product },
  });
  return productDetail;
};

const updateStock = async (id_product_warehouse, stock, booked_stock, newStock, transaction) => {
  const update = await ProductWarehouseRlt.update(
    { stock: newStock },
    { where: { is_deleted: 0, id_product_warehouse, stock, booked_stock }, transaction },
  );
  return update;
};

const createStock = async (id_product, id_warehouse, transaction) => {
  const createNew = await ProductWarehouseRlt.create(
    { id_product, stock: 0, id_warehouse, booked_stock: 0 },
    { transaction },
  );
  return createNew;
};

const deleteStock = async (id_product, id_warehouse, transaction) => {
  const deleteData = await ProductWarehouseRlt.update(
    { is_deleted: 1 },
    { where: { id_product, id_warehouse }, transaction },
  );
  return deleteData;
};

const getProductWarehouseRlt = async (id_product, id_warehouse) => {
  const getRelation = await ProductWarehouseRlt.findOne({ where: { is_deleted: 0, id_product, id_warehouse } });
  return getRelation;
};

const getProductsInWarehouse = async (id_warehouse) => {
  const products = await ProductWarehouseRlt.findAll({ where: { id_warehouse } });
  return products;
};

const getWarehouseWhichProvideProduct = async (id_product) => {
  try {
    let getWarehouses = await ProductWarehouseRlt.findAll({
      where: { is_deleted: 0, id_product, stock: { [Op.gt]: 0 } },
      include: {
        model: Warehouse,
        include: { model: City, attributes: ["city", "type_city"] },
        attributes: ["warehouse_name"],
      },
    });
    getWarehouses = getWarehouses.map((warehouse) => {
      const { warehouse_name, city } = warehouse.dataValues.warehouse.dataValues;
      return {
        ...warehouse.dataValues,
        warehouse_name: warehouse_name,
        city: city.dataValues.city,
        type_city: city.dataValues.type_city,
      };
    });
    return { error: null, result: getWarehouses };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const getSetOfProductsInWarehouse = async (listOfProductsId, id_warehouse) => {
  const products = await ProductWarehouseRlt.findAll({
    where: { id_warehouse, id_product: listOfProductsId },
  });
  return products;
};

module.exports = {
  createProductWarehouseRlt,
  getProductsCountWithNameAndCateogryFilter,
  getProductsWithNameAndCategoryFilter,
  getProductsCountWithNameFilter,
  getProductsWithNameFilter,
  getProductsCountWithCategoryFilter,
  getProductsWithCategoryFilter,
  getProductsWithoutFilter,
  getWarehouseWhichProvideProduct,
  getProductsCountWithoutFilter,
  getProductWarehouseRlt,
  getProductsInWarehouse,
  getSetOfProductsInWarehouse,
  getStockProduct,
  updateStock,
  createStock,
  deleteStock,
};

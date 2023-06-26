const db = require("../model");
const { Product, ProductWarehouseRlt, sequelize } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const getProductByName = async (product_name, id_product) => {
  let product;
  console.log("id_product", id_product);
  if (id_product) {
    console.log("harusnya kesini jg");
    product = await Product.findOne({ where: { product_name, id_product: { [Op.not]: id_product } } });
  } else {
    product = await Product.findOne({ where: { product_name } });
  }
  return product;
};

const getProductById = async (id_product, transaction) => {
  const product = await Product.findOne({ where: { id_product }, transaction });
  return product;
};

const getProductsCount = async (id_category) => {
  let productsCount;
  //check if offset, limit, page value is given
  if (id_category) {
    // if id_category given, then get total count data with category filter
    productsCount = await Product.findAll({
      where: { is_deleted: 0, id_category },
      attributes: [[sequelize.fn("COUNT", sequelize.col("id_product")), "product_count"]],
    });
  } else {
    // if id_category not given, then get total count data without filter
    productsCount = await Product.findAll({
      where: { is_deleted: 0 },
      attributes: [[sequelize.fn("COUNT", sequelize.col("id_product")), "product_count"]],
    });
  }
  return productsCount;
};

const getProducts = async (offset, limit, page, id_category) => {
  let products;

  //check if offset, limit, page value is given
  if (offset && limit && page) {
    //check if id_category value given
    if (id_category) {
      // if id_category given, then get limited data with category filter
      products = await Product.findAll({
        where: { is_deleted: 0, id_category },
        offset: parseInt(offset) * (parseInt(page) - 1),
        limit: parseInt(limit),
      });
    } else {
      // if id_category not given, then get limited data without filter
      products = await Product.findAll({
        where: { is_deleted: 0 },
        offset: parseInt(offset) * (parseInt(page) - 1),
        limit: parseInt(limit),
      });
    }
  } else {
    // if if offset, limit, page value is not given, get all data
    products = await Product.findAll({ where: { is_deleted: 0 } });
  }
  return products;
};

const createProductWarehouseRlt = async (id_product, id_warehouse, transaction) => {
  const response = await ProductWarehouseRlt.create(
    { id_product, stock: 0, id_warehouse, booked_stock: 0 },
    { transaction },
  );
  return response;
};

const createProduct = async (product_name, description, weight_kg, product_image, id_category, price, transaction) => {
  const result = await Product.create(
    {
      product_name,
      description,
      weight_kg,
      product_image,
      id_category,
      price,
      is_deleted: false,
    },
    { transaction },
  );
  return result;
};

const deleteProduct = async (id_product, transaction) => {
  const result = await Product.update({ is_deleted: 1 }, { where: { id_product }, transaction });
  return result;
};

const updateProduct = async (
  product_name,
  description,
  weight_kg,
  product_image,
  id_category,
  price,
  id_product,
  transaction,
) => {
  let result;
  if (product_image) {
    result = await Product.update(
      { product_name, description, weight_kg, product_image, id_category, price },
      { where: { id_product }, transaction },
    );
  } else {
    result = await Product.update(
      { product_name, description, weight_kg, id_category, price },
      { where: { id_product }, transaction },
    );
  }
  return result;
};

module.exports = {
  getProductsCount,
  getProducts,
  getProductByName,
  createProduct,
  createProductWarehouseRlt,
  deleteProduct,
  updateProduct,
  getProductById,
};

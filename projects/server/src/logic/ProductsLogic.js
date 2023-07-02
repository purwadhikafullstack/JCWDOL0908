const { ProductService, AdminWarehouseService, ProductWarehouseRltService } = require("../service");
const { UnlinkPhoto } = require("../helper/Multer");
const db = require("../model");

const getProductsLogic = async (offset, limit, page, id_category) => {
  try {
    let productsCount;
    let totalPage;
    //check if offset, limit, page value is given
    if (offset && limit && page) {
      // if offset, limit, page value is given, then count total data and total page needed
      productsCount = await ProductService.getProductsCount(id_category);
      productsCount = productsCount[0].dataValues.product_count;
      totalPage = Math.ceil(productsCount / limit);
    }

    let productsList = await ProductService.getProducts(offset, limit, page, id_category);
    productsList = productsList.map((product) => {
      return product.dataValues;
    });

    const result = { productsList, totalPage };
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const postNewProductLogic = async (data) => {
  const { product_name, description, weight_kg, product_image, id_category, price } = data;
  const transaction = await db.sequelize.transaction();
  let result;
  let createData;
  try {
    //checck if name already exists
    const isNameExist = await ProductService.getProductByName(product_name);
    if (isNameExist) throw { errMsg: "name already exists", statusCode: 400 };
    // if name doesn't exist, create product
    createData = await ProductService.createProduct(
      product_name,
      description,
      weight_kg,
      product_image,
      id_category,
      price,
      transaction,
    );
    // grab the created product's id_product data
    const id_product = createData.dataValues.id_product;
    // get all warehouses
    const getWarehouses = await AdminWarehouseService.getWarehousesData();
    // give the relation between created product with all warehouses
    for (let iter = 0; iter < getWarehouses.length; iter++) {
      const id_warehouse = getWarehouses[iter].dataValues.id_warehouse;
      await ProductWarehouseRltService.createProductWarehouseRlt(id_product, id_warehouse, transaction);
    }

    transaction.commit();
    return { error: null, result };
  } catch (error) {
    await UnlinkPhoto(product_image);
    transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const deleteProductLogic = async (id_product) => {
  const transaction = await db.sequelize.transaction();
  try {
    const response = await ProductService.deleteProduct(id_product, transaction);
    if (response[0] !== 1) throw { errMsg: "data not found", statusCode: 404 };
    transaction.commit();
    return { error: null, result: response };
  } catch (error) {
    transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const editProductLogic = async (data) => {
  const { product_name, description, weight_kg, product_image, id_category, price, id_product } = data;
  const transaction = await db.sequelize.transaction();
  let result;
  let updateData;
  console.log(product_image);
  try {
    // check if name already exists
    const isNameExist = await ProductService.getProductByName(product_name, id_product);
    // if name exist send error message
    if (isNameExist) throw { errMsg: "name already exists", statusCode: 400 };
    // get current image pattern data
    const getSingleData = await ProductService.getProductById(id_product, transaction);
    const oldImage = getSingleData.dataValues.product_image;

    // update data
    updateData = await ProductService.updateProduct(
      product_name,
      description,
      weight_kg,
      product_image,
      id_category,
      price,
      id_product,
      transaction,
    );
    result = updateData;
    // delete previous image pattern data
    if (product_image) await UnlinkPhoto(oldImage);

    transaction.commit();
    return { error: null, result };
  } catch (error) {
    await UnlinkPhoto(product_image);
    transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

module.exports = { getProductsLogic, postNewProductLogic, deleteProductLogic, editProductLogic };

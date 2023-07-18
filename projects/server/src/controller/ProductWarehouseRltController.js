const { ProductWarehouseRltLogic } = require("../logic");
const { ProductWarehouseRltService } = require("../service");

const getTotalStockProducts = async (req, res, next) => {
  let { offset, limit, page, name_search, id_category, id_warehouse } = req.query;
  offset = parseInt(offset);
  limit = parseInt(limit);
  page = parseInt(page);
  id_category = parseInt(id_category);
  id_warehouse = parseInt(id_warehouse);
  try {
    const { error, result } = await ProductWarehouseRltLogic.getTotalStockProductsLogic(
      offset,
      limit,
      page,
      name_search,
      id_category,
      id_warehouse,
    );
    // check whether error exists
    if (error) return res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const getStockProduct = async (req, res, next) => {
  const { id_product } = req.params;
  let { id_warehouse } = req.query;
  id_warehouse = parseInt(id_warehouse);
  try {
    const { error, result } = await ProductWarehouseRltLogic.getStockProductLogic(id_product, id_warehouse);
    if (error) return res.status(500).send({ isSuccess: false, message: "Internal server error", error });
    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const updateStock = async (req, res, next) => {
  const { id_warehouse, newStock } = req.body;
  let { id_product } = req.params;
  id_product = parseInt(id_product);
  try {
    const { error, result } = await ProductWarehouseRltLogic.updateStockLogic(id_product, id_warehouse, newStock);

    if (error?.errMsg) return res.status(error.statusCode).send({ isSuccess: false, message: error.errMsg, error });
    if (error) return res.status(500).send({ isSuccess: false, message: "Internal server error", error });

    return res.status(202).send({ isSuccess: true, message: "success update data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const createStock = async (req, res, next) => {
  const { id_warehouse } = req.query;
  let { id_product } = req.params;
  id_product = parseInt(id_product);
  try {
    const { error, result } = await ProductWarehouseRltLogic.createStockLogic(id_product, id_warehouse);

    if (error?.errMsg) return res.status(error.statusCode).send({ isSuccess: false, message: error.errMsg, error });
    if (error) return res.status(500).send({ isSuccess: false, message: "Internal server error", error });

    return res.status(201).send({ isSuccess: true, message: "success create data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const deleteStock = async (req, res, next) => {
  const { id_warehouse } = req.query;
  let { id_product } = req.params;
  id_product = parseInt(id_product);
  try {
    const { error, result } = await ProductWarehouseRltLogic.deleteStockLogic(id_product, id_warehouse);

    if (error?.errMsg) return res.status(error.statusCode).send({ isSuccess: false, message: error.errMsg, error });
    if (error) return res.status(500).send({ isSuccess: false, message: "Internal server error", error });

    return res.status(200).send({ isSuccess: true, message: "success delete data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const getWarehouseWhichProvideProduct = async (req, res, next) => {
  try {
    let { id_product } = req.params;
    id_product = parseInt(id_product);
    const { error, result } = await ProductWarehouseRltService.getWarehouseWhichProvideProduct(id_product);
    if (error) return res.status(500).send({ isSuccess: false, message: "Internal server error", error });
    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = {
  getTotalStockProducts,
  getStockProduct,
  updateStock,
  createStock,
  deleteStock,
  getWarehouseWhichProvideProduct,
};

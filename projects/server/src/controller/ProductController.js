const { ProductService } = require("../service");

const listProducts = async (req, res, next) => {
  try {
    const { page, page_size, name, id_category, price_min, price_max, sort_key, sort_condition } = req.query;
    const { error, data } = await ProductService.listProducts({
      page,
      page_size,
      name,
      id_category,
      price_min,
      price_max,
      sort_key,
      sort_condition,
    });
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(200).json({
      message: "list products success",
      data: {
        metadata: data.metadata,
        products: data.products,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, data } = await ProductService.getProduct(id);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(200).json({
      message: "get product success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listProducts,
  getProduct,
};
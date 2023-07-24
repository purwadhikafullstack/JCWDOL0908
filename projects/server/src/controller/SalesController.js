const { SalesService } = require("../service");

const getTotalSales = async (req, res, next) => {
  try {
    const dataInput = req.query;
    const totalSales = await SalesService.getTotalSales(dataInput);
    return res.status(200).send({ isSuccess: true, message: "success fetched data", result: totalSales });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const topCategories = async (req, res, next) => {
  try {
    const dataInput = req.query;
    const topCategoy = await SalesService.salesCategories(dataInput);
    return res.status(200).send({ isSuccess: true, message: "success fetched data", result: topCategoy });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const topProduct = async (req, res, next) => {
  try {
    const dataInput = req.query;
    const topProduct = await SalesService.salesProduct(dataInput);
    return res.status(200).send({ isSuccess: true, message: "success fetched data", result: topProduct });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = { getTotalSales, topCategories, topProduct };

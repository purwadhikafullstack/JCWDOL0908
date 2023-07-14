const { ProductJournalLogic } = require("../logic");

const getJournals = async (req, res, next) => {
  try {
    let dataInput = req.query.filter;
    dataInput = JSON.parse(dataInput);
    const { id_warehouse, currentMonth, lastMonth } = dataInput;
    if (!(id_warehouse && currentMonth && lastMonth))
      return res.status(400).send({ isSuccess: false, message: "error: bad request" });
    const { error, result } = await ProductJournalLogic.getProductJournalLogic(dataInput);
    if (error) return res.status(500).send({ isSuccess: false, message: "Internal server error", error });
    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const getDetailProductJournalOnAWarehouse = async (req, res, next) => {
  try {
    dataInput = { ...req.params, ...JSON.parse(req.query.filter) };
    const { error, result } = await ProductJournalLogic.getDetailProductJournalOnAWarehouse(dataInput);
    if (error) return res.status(500).send({ isSuccess: false, message: "Internal server error", error });
    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = {
  getJournals,
  getDetailProductJournalOnAWarehouse,
};

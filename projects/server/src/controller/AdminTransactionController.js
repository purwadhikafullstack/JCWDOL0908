const { AdminTransactionLogic } = require("../logic");

const getUserTransactions = async (req, res, next) => {
  try {
    const dataInput = { ...req.query };
    const { error, result } = await AdminTransactionLogic.getUserTransactionsLogic(dataInput);
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const rejectPayment = async (req, res, next) => {
  try {
    const { id_transaction } = req.params;
    const { error, result } = await AdminTransactionLogic.updateStatusLogic(
      id_transaction,
      "rejected",
      "payment-confirmation",
    );
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false, error });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(202).send({ isSuccess: true, message: "payment-rejected", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const approvePayment = async (req, res, next) => {
  try {
    const { id_transaction } = req.params;
    const { error, result } = await AdminTransactionLogic.updateStatusLogic(
      id_transaction,
      "on-process",
      "payment-confirmation",
    );
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false, error });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(202).send({ isSuccess: true, message: "payment-approved", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const { id_transaction } = req.params;
    const { error, result } = await AdminTransactionLogic.cancelOrderLogic(id_transaction);
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false, error });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(202).send({ isSuccess: true, message: "order-canceled", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const autoMutation = async (req, res, next) => {
  try {
    const { id_transaction } = req.params;
    const { error, result } = await AdminTransactionLogic.autoMutationLogic(id_transaction);
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false, error });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(201).send({ isSuccess: true, message: "stock-mutation created", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const sendOrder = async (req, res, next) => {
  try {
    const { id_transaction } = req.params;
    const { error, result } = await AdminTransactionLogic.sendOrderLogic(id_transaction);
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false, error });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(201).send({ isSuccess: true, message: "order are being sent", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = { getUserTransactions, rejectPayment, approvePayment, cancelOrder, autoMutation, sendOrder };

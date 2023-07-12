const { MutationLogic } = require("../logic");
const { MutationValidation } = require("../validation");

const createNewMutationRequest = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const { error: err_validation, value } = await MutationValidation.createNewMutation.validate({ ...data });
    if (err_validation) throw err_validation;

    const { error, result } = await MutationLogic.createNewMutationRequestLogic(data);

    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

    return res.status(201).send({ isSuccess: true, message: "success create request", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const fetchMutationRequests = async (req, res, next) => {
  try {
    const data = req.query;
    const { error, result } = await MutationLogic.fetchMutationRequestsLogic(data);

    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

    return res.status(201).send({ isSuccess: true, message: "success fetch data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const approvingMutationRequests = async (req, res, next) => {
  try {
    const input = req.body;
    const { error, result } = await MutationLogic.approvingMutationLogic(input);
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(202).send({ isSuccess: true, message: "success approve data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const rejectMutationRequests = async (req, res, next) => {
  try {
    const input = req.body;
    const { error, result } = await MutationLogic.rejectMutationLogic(input);
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(202).send({ isSuccess: true, message: "success reject data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const acceptOnDeliveredProduct = async (req, res, next) => {
  try {
    const input = req.body;
    const { error, result } = await MutationLogic.acceptLogic(input);
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(202).send({ isSuccess: true, message: "products are safely mutated", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = {
  createNewMutationRequest,
  fetchMutationRequests,
  approvingMutationRequests,
  rejectMutationRequests,
  acceptOnDeliveredProduct,
};

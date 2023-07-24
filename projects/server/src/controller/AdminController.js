const db = require("../model");
const { AdminWarehouseService } = require("../service");
const { AdminDataValidation } = require("../validation");
const { AdminUserLogic } = require("../logic");

const getAllAdminUser = async (req, res, next) => {
  const { offset, limit, page } = req.query;
  try {
    const { result, error } = await AdminUserLogic.getAllAdminUserLogic(offset, limit, page);

    //check whether error exist/no result found
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    //unknown error
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  const { isAdmin, idRole } = req.query;
  const { id } = req.params;
  try {
    const { error, result } = await AdminUserLogic.getSingleUserLogic(id, isAdmin, idRole);
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    //unknown error
    next(error);
  }
};

const getSingleWarehouseAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await AdminWarehouseService.getSingleWarehouseAdmin(id);
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    //unknown error
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  const { offset, limit, page } = req.query;
  try {
    const { error, result } = await AdminUserLogic.getAllUserLogic(offset, limit, page);
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    //unknown error
    next(error);
  }
};

const getAllWarehouseCity = async (req, res, next) => {
  try {
    const result = await AdminWarehouseService.getAllWarehouseCity();
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    //unknown error
    next(error);
  }
};

const getSpecWarehouseByIdCity = async (req, res, next) => {
  const { id_city } = req.params;
  try {
    const warehouse = await AdminWarehouseService.getSpecificWarehouseByIdCity(id_city);
    return res.status(200).send({ isSuccess: true, result: warehouse, message: "success retrieve data" });
  } catch (error) {
    //unknown error
    next(error);
  }
};

const updateAdminWarehouse = async (req, res, next) => {
  const { id_user, username, email, password, phoneNumber, id_warehouse } = req.body;
  try {
    // validating data
    const { error: err_validation, value } = AdminDataValidation.EditDataAdmin.validate({
      username,
      email,
      phoneNumber,
      id_warehouse,
    });
    if (err_validation) throw err_validation;
    if (password !== "") {
      const { error: err_validation_password, value } = AdminDataValidation.EditDataAdmin.validate({ password });
      if (err_validation_password) throw err_validation_password;
    }

    const { error, result } = await AdminUserLogic.updateAdminWarehouseLogic(
      id_user,
      username,
      email,
      password,
      phoneNumber,
      id_warehouse,
    );
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

    return res.status(202).send({ isSuccess: true, message: "data updated", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error, result } = await AdminUserLogic.deleteUserLogic(id);
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(202).send({ isSuccess: true, result, message: "data deleted" });
  } catch (error) {
    //unknown error
    next(error);
  }
};

const createNewAdmin = async (req, res, next) => {
  const { username, email, phone_number, password, id_warehouse } = req.body;
  try {
    // validating data
    const { error: err_validation, value } = AdminDataValidation.CreateDataAdmin.validate({
      username,
      email,
      phone_number,
      password,
      id_warehouse,
    });

    //check whether any data-validation error exist
    if (err_validation) throw err_validation;
    // if error not exist, create data logic begin
    const { error, result } = await AdminUserLogic.createNewAdminLogic(
      username,
      email,
      phone_number,
      password,
      id_warehouse,
    );
    if (error?.errMsg) res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

    return res.status(201).send({ isSuccess: true, result, message: "data succesfully created" });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = {
  getAllAdminUser,
  getAllUser,
  getSingleUser,
  getSingleWarehouseAdmin,
  getAllWarehouseCity,
  getSpecWarehouseByIdCity,
  updateAdminWarehouse,
  deleteUser,
  createNewAdmin,
};

const { AdminWarehouseService } = require("../service");
const { AdminDataValidation } = require("../validation");
const { AdminWarehouseLogic } = require("../logic");

const getAllWarehouse = async (req, res, next) => {
  try {
    const { offset, limit, page } = req.query;
    const warehouses = await AdminWarehouseLogic.getWarehousesLogic(offset, limit, page);
    const { error, data } = warehouses;

    // check whether error exists
    if (error) return res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(200).send({ isSuccess: true, message: "success fetched data", data });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const deleteWarehouse = async (req, res, next) => {
  try {
    const { id_warehouse } = req.params;
    const response = await AdminWarehouseLogic.deleteWarehouseLogic(id_warehouse);
    const { error, result } = response;

    // check whether error exists
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) return res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(202).send({ isSuccess: true, message: "warehouse deleted", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const getProvinces = async (req, res, next) => {
  try {
    const provinces = await AdminWarehouseService.getProvinces();
    const { error, result } = provinces;

    // check whether error exists
    if (error) return res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const getCitiesByProvinceId = async (req, res, next) => {
  try {
    const { id_province } = req.query;

    const cities = await AdminWarehouseService.getCitiesByProvinceId(id_province);
    const { error, result } = cities;

    // check whether error exists
    if (!result) return res.status(500).send({ isSuccess: false, message: "internal server error", error });
    if (!result.length) return res.status(404).send({ isSuccess: false, message: "not found" });

    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const createWarehouse = async (req, res, next) => {
  let { warehouse_name, address, id_city, id_province } = req.body;
  try {
    // data validation
    const { error: err_validation, value } = AdminDataValidation.CreateWarehouse.validate({
      warehouse_name,
      address,
      id_city,
    });
    if (err_validation) throw err_validation;

    // start create warehouse logic
    const response = await AdminWarehouseLogic.createWarehouseLogic(warehouse_name, address, id_city, id_province);
    const { result, error } = response;

    // check whether error exists
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(201).send({ isSuccess: true, message: "success create data", result });
  } catch (error) {
    next(error);
  }
};

const editWarehouse = async (req, res, next) => {
  let { id_warehouse, warehouse_name, address, id_city, id_province } = req.body;
  try {
    // data validation
    const { error: err_validation, value } = AdminDataValidation.CreateWarehouse.validate({
      warehouse_name,
      address,
      id_city,
    });
    if (err_validation) throw err_validation;

    // start create warehouse logic
    const response = await AdminWarehouseLogic.editWarehouseLogic(
      id_warehouse,
      warehouse_name,
      address,
      id_city,
      id_province,
    );
    const { result, error } = response;

    // check whether error exists
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(202).send({ isSuccess: true, message: "success edit data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = {
  getAllWarehouse,
  deleteWarehouse,
  getProvinces,
  getCitiesByProvinceId,
  createWarehouse,
  editWarehouse,
};

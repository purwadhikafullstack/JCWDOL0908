const db = require("../model");
const { AdminUserMgtService, AdminWarehouseService } = require("../service");
const { AdminDataValidation } = require("../validation");

const getAllAdminUser = async (req, res, next) => {
  const { offset, limit, page } = req.query;
  const response = await AdminUserMgtService.getAllAdminUserLogic(offset, limit, page);
  const { result, error } = response;
  if (!result) return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
};

const getSingleUser = async (req, res, next) => {
  const { isAdmin, idRole } = req.query;
  const { id } = req.params;
  let result;
  try {
    if ((isAdmin === "true" && idRole == "null") || isAdmin === "false") {
      result = await AdminUserMgtService.getSingleUser(id);
    } else if (isAdmin === "true") {
      if (idRole != 1) {
        result = await AdminWarehouseService.getSingleWarehouseAdmin(id);
      } else {
        result = await AdminUserMgtService.getSingleSuperAdmin(id);
      }
    }
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  }
};

const getSingleWarehouseAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await AdminWarehouseService.getSingleWarehouseAdmin(id);
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  }
};

const getAllUser = async (req, res, next) => {
  const { offset, limit, page } = req.query;
  try {
    const allUserCount = await AdminUserMgtService.getAllUserCount();
    const allUser = await AdminUserMgtService.getAllUserWithoutAddress(offset, limit, page);
    const userCount = allUserCount[0].dataValues.user_count;
    const totalPage = Math.ceil(userCount / limit);
    const result = { totalPage, dataAll: allUser };
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  }
};

const getAllWarehouseCity = async (req, res, next) => {
  try {
    const result = await AdminWarehouseService.getAllWarehouseCity();
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  }
};

const getSpecWarehouseByIdCity = async (req, res, next) => {
  const { id_city } = req.params;
  try {
    const warehouse = await AdminWarehouseService.getSpecificWarehouseByIdCity(id_city);
    return res.status(200).send({ isSuccess: true, result: warehouse, message: "success retrieve data" });
  } catch (error) {
    return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  }
};

const updateAdminWarehouse = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  const { id_user, username, email, password, phoneNumber, id_warehouse } = req.body;
  let newRole;
  try {
    const { error, value } = AdminDataValidation.EditDataAdmin.validate({ username, email, phoneNumber, id_warehouse });
    if (error) throw error;
    if (password !== "") {
      const { error, value } = AdminDataValidation.EditDataAdmin.validate({ password });
      if (error) throw error;
      await AdminUserMgtService.updateDataAdminPassword(id_user, password, transaction);
    }
    const isRoleAdminExist = await AdminUserMgtService.findAdminRoleByIdWarehouse(id_warehouse);
    if (!isRoleAdminExist) {
      const createRole = await AdminUserMgtService.createAdminRoleWarehouse(id_warehouse, transaction);
      newRole = createRole.dataValues.id_role;
    }
    newRole = isRoleAdminExist.dataValues.id_role;
    const updatePersonalData = await AdminUserMgtService.updateDataAdmin(
      id_user,
      username,
      email,
      phoneNumber,
      newRole,
      transaction,
    );
    await transaction.commit();
    return res.status(204).send({ isSuccess: true, message: "data updated" });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const transaction = await db.sequelize.transaction();
  try {
    const result = await AdminUserMgtService.deleteUser(id, transaction);
    await transaction.commit();
    return res.status(204).send({ isSuccess: true, message: "data deleted" });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  }
};

const createNewAdmin = async (req, res, next) => {
  const { username, email, phone_number, password, id_warehouse } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const { error, value } = AdminDataValidation.CreateDataAdmin.validate({
      username,
      email,
      phone_number,
      password,
      id_warehouse,
    });
    if (error) throw error;
    const result = await AdminUserMgtService.createNewAdmin(
      username,
      email,
      phone_number,
      password,
      id_warehouse,
      transaction,
    );
    await transaction.commit();
    return res.status(201).send({ isSuccess: true, message: "data succesfully created" });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send({ isSuccess: false, message: "internal server error", error });
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

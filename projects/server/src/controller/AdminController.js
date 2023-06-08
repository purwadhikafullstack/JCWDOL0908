const db = require("../model");
const { createToken } = require("../helper/CreateToken");
const User = db.User;
const Warehouse = db.Warehouse;
const Admin = db.AdminRole;
const { Op } = require("sequelize");
const { AdminUserMgtService } = require("../service");

const getAllAdminUser = async (req, res, next) => {
  const { offset, limit, page } = req.query;
  try {
    const allAdminCount = await AdminUserMgtService.getAllAdminCount();
    const allAdminUser = await AdminUserMgtService.getAllAdmin(offset, limit, page);
    const adminCount = allAdminCount[0].dataValues.user_count;
    const totalPage = Math.ceil(adminCount / limit);
    const result = { totalPage, dataAll: allAdminUser };
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  const { id, isAdmin, idRole } = req.query;
  let result;
  console.log(idRole == "null");
  console.log(isAdmin === "true");
  console.log((isAdmin === "true" && idRole == "null") || isAdmin === "false");
  try {
    if ((isAdmin === "true" && idRole == "null") || isAdmin === "false") {
      result = await AdminUserMgtService.getSingleUser(id);
    } else if (isAdmin === "true") {
      if (idRole != 1) {
        result = await AdminUserMgtService.getSingleWarehouseAdmin(id);
      } else {
        result = await AdminUserMgtService.getSingleSuperAdmin(id);
      }
    }
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    next();
  }
};

const getSingleWarehouseAdmin = async (req, res, next) => {
  const { id } = req.query;
  try {
    const result = await AdminUserMgtService.getSingleWarehouseAdmin(id);
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    next(error);
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
    next(error);
  }
};

const getMyUser = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.params.name,
    },
    include: {
      model: Admin,
      include: {
        model: Warehouse,
      },
    },
  });
  const { id_user, username, is_admin, id_role, admin_role } = user;

  const payload = {
    id_user,
    username,
    is_admin,
    id_role,
    role: admin_role.role_admin,
  };

  const token = createToken(payload);

  return res.status(200).send({
    token,
  });
};

const getAllWarehouse = async (req, res, next) => {
  try {
    const allAdminWarehouse = await Admin.findAll({
      where: {
        id_role: { [Op.not]: 1 },
      },
      include: {
        model: Warehouse,
      },
    });
    return res.status(200).send({ isSuccess: true, result: allAdminWarehouse, message: "success retrieve data" });
  } catch (error) {
    next({ statusCode: 500, message: "Error get warehouse" });
  }
};

const changeAdminWarehouse = async (req, res, next) => {
  const { id_user, id_role_change } = req.body;
  try {
    const changeWarehouse = await Admin.update({ id_role: id_role_change }, { where: { id_user } });
    return res.status(200).send({ isSuccess: true, result: changeWarehouse, message: "success update data" });
  } catch (error) {
    next();
  }
};

const getAllWarehouseCity = async (req, res, next) => {
  try {
    const result = await AdminUserMgtService.getAllWarehouseCity();
    return res.status(200).send({ isSuccess: true, result, message: "success retrieve data" });
  } catch (error) {
    next(error);
  }
};

const getSpecWarehouseByIdCity = async (req, res, next) => {
  const { id_city } = req.query;
  try {
    const warehouse = await AdminUserMgtService.getSpecificWarehouseByIdCity(id_city);
    return res.status(200).send({ isSuccess: true, result: warehouse, message: "success retrieve data" });
  } catch (error) {
    next(error);
  }
};

const updateAdminWarehouse = async (req, res, next) => {};

module.exports = {
  getAllAdminUser,
  getMyUser,
  getAllUser,
  getAllWarehouse,
  changeAdminWarehouse,
  getSingleUser,
  getSingleWarehouseAdmin,
  getAllWarehouseCity,
  getSpecWarehouseByIdCity,
};

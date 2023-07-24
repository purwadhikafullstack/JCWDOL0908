const db = require("../model");
const { AdminUserMgtService, AdminWarehouseService } = require("../service");

const isWarehouseAdmin = (isAdmin, idRole) => {
  return isAdmin === "true" && idRole != 1;
};

const getAllUserLogic = async (offset, limit, page) => {
  try {
    const allUserCount = await AdminUserMgtService.getAllUserCount();
    const allUser = await AdminUserMgtService.getAllUser(offset, limit, page);
    const userCount = allUserCount[0].dataValues.user_count;
    const totalPage = Math.ceil(userCount / limit);
    const result = { totalPage, dataAll: allUser };
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const getSingleUserLogic = async (id, isAdmin, idRole) => {
  let result;
  try {
    if (isAdmin === "false") {
      result = await AdminUserMgtService.getSingleUser(id);
    } else if (isWarehouseAdmin(isAdmin, idRole)) {
      result = await AdminWarehouseService.getSingleWarehouseAdmin(id);
    } else {
      result = await AdminUserMgtService.getSingleSuperAdmin(id);
    }
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const getAllAdminUserLogic = async (offset, limit, page) => {
  try {
    const allAdminCount = await AdminUserMgtService.getAllAdminCount();
    const allAdminUser = await AdminUserMgtService.getAllAdmin(offset, limit, page);
    const adminCount = allAdminCount[0].dataValues.user_count;
    const totalPage = Math.ceil(adminCount / limit);
    const result = { totalPage, dataAll: allAdminUser };
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const deleteUserLogic = async (id) => {
  const transaction = await db.sequelize.transaction();
  try {
    const result = await AdminUserMgtService.deleteUser(id, transaction);
    await transaction.commit();
    return { error: null, result };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const createNewAdminLogic = async (username, email, phone_number, password, id_warehouse) => {
  const transaction = await db.sequelize.transaction();
  try {
    const isUsernameExists = await AdminUserMgtService.findDataByUsername(username);

    if (isUsernameExists.length > 0) throw { errMsg: "error: username already exists", statusCode: 400 };

    // get admin role ID that associated with the selected warehouse id
    const getAdminRole = await AdminUserMgtService.findAdminRoleByIdWarehouse(id_warehouse);

    if (!getAdminRole) throw { errMsg: "error: Admin-role for this warehouse is not yet created", statusCode: 404 };

    const adminRoleId = getAdminRole.dataValues.id_role;
    const hashedPassword = await AdminUserMgtService.hashingPassword(password);
    const createNewAdmin = await AdminUserMgtService.createNewAdmin(
      username,
      email,
      phone_number,
      hashedPassword,
      adminRoleId,
      transaction,
    );
    await transaction.commit();
    return { error: null, result: createNewAdmin };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const updateAdminWarehouseLogic = async (id_user, username, email, password, phoneNumber, id_warehouse) => {
  const transaction = await db.sequelize.transaction();
  try {
    const isUsernameExists = await AdminUserMgtService.findDataByUsernameExceptSelf(username, id_user);
    console.log(isUsernameExists);
    if (isUsernameExists.length > 0) throw { errMsg: "error: username already exists", statusCode: 400 };

    // check whether there is a password change
    if (password !== "") await AdminUserMgtService.updateDataAdminPassword(id_user, password, transaction);

    // get admin role ID that associated with the selected warehouse id
    const getAdminRole = await AdminUserMgtService.findAdminRoleByIdWarehouse(id_warehouse);
    if (!getAdminRole) throw { errMsg: "error: Admin-role for this warehouse is not yet created", statusCode: 404 };
    const adminRoleId = getAdminRole.dataValues.id_role;

    const updatePersonalData = await AdminUserMgtService.updateDataAdmin(
      id_user,
      username,
      email,
      phoneNumber,
      adminRoleId,
      transaction,
    );

    await transaction.commit();
    return { error: null, result: updatePersonalData };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return { error, result: null };
  }
};

module.exports = {
  getAllUserLogic,
  getSingleUserLogic,
  getAllAdminUserLogic,
  deleteUserLogic,
  createNewAdminLogic,
  updateAdminWarehouseLogic,
};

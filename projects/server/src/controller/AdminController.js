const db = require("../model");
const { createToken } = require("../helper/CreateToken");
const User = db.User;
const Warehouse = db.Warehouse;
const Admin = db.AdminRole;
const { Op } = require("sequelize");

// As an admin, I want to manage user data
// Requirements :

// Admin dapat melihat, membuat, memperbarui dan menghapus data user dengan role admin
// Admin dapat melihat semua data user yang telah teregistrasi (bukan hanya admin)
// Warehouse admin tidak dapat mengakses fitur ini

// As an admin, I want to be able to assign admin user to selected warehouse
// Requirements :

// Admin dapat menempatkan warehouse admin user pada gudang tertentu
// Warehouse admin tidak dapat mengakses fitur ini

const getAllAdminUser = async (req, res, next) => {
  const { offset, limit, page } = req.query;
  try {
    const allAdminUser = await User.findAll({
      where: {
        [Op.and]: [{ is_admin: 1 }, { id_role: { [Op.not]: 1 } }],
      },
      include: {
        model: Admin,
        include: {
          model: Warehouse,
        },
      },
      offset: parseInt(offset) * (parseInt(page) - 1),
      limit: parseInt(limit),
    });
    return res.status(200).send({ isSuccess: true, result: allAdminUser, message: "success retrieve data" });
  } catch (error) {
    next();
  }
};

const getAllUser = async (req, res, next) => {
  const { offset, limit, page } = req.query;
  try {
    const allUser = await User.findAll({
      offset: parseInt(offset) * (parseInt(page) - 1),
      limit: parseInt(limit),
    });
    return res.status(200).send({ isSuccess: true, result: allUser, message: "success retrieve data" });
  } catch (error) {
    next();
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
    next();
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

module.exports = {
  getAllAdminUser,
  getMyUser,
  getAllUser,
  getAllWarehouse,
  changeAdminWarehouse,
};

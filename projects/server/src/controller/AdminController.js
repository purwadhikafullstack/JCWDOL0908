const db = require("../model");
const { createToken } = require("../helper/CreateToken");
const User = db.User;
const Warehouse = db.Warehouse;
const Admin = db.AdminRole;
const { Op } = require("sequelize");
const sequelize = db.sequelize;

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
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  const { offset, limit, page } = req.query;
  try {
    const users = await User.findAll({
      where: {
        is_deleted: 0,
      },
      attributes: [[sequelize.fn("COUNT", sequelize.col("id_user")), "user_count"]],
    });

    const allUser = await User.findAll({
      where: {
        is_deleted: 0,
      },
      offset: parseInt(offset) * (parseInt(page) - 1),
      limit: parseInt(limit),
    });

    const userCount = users[0].dataValues.user_count;
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
    // next(error);
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

module.exports = {
  getAllAdminUser,
  getMyUser,
  getAllUser,
  getAllWarehouse,
  changeAdminWarehouse,
};

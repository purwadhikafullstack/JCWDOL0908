const db = require("../model");
const { User } = db;
const { ComparePassword, HashPassword } = require("../helper/Token");

/**
 * UpdateBioUser - a function to update user bio {username and phone_number}
 * @param data{ id, username, phone}
 * @returns {Promise<{data: null, error: Error}|{data: null, error: Error}|{data: *, error: null}>}
 * @constructor
 */
const UpdateBioUser = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    const { id, username, phone } = data;

    // check phone uniqueness
    const phoneCount = await User.count({
      where: {
        phone_number: phone,
        id_user: {
          [db.Sequelize.Op.not]: id,
        },
      },
      transaction: t,
    });

    if (phoneCount > 0) {
      await t.rollback();
      return {
        error: new Error("phone number has been used"),
        data: null,
      };
    }


    const user = await User.update({
      username,
      phone_number: phone,
    }, {
      where: { id_user: id },
      transaction: t,
    });

    if (!user) {
      await t.rollback();
      return {
        error: new Error("User not found"),
        data: null,
      };
    }

    await t.commit();
    const updatedUser = await User.findByPk(id);
    return {
      error: null,
      data: updatedUser,
    };
  } catch (error) {
    await t.rollback();
    return {
      error,
      data: null,
    };
  }
};

const UpdatePasswordUser = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    const { id, oldPassword, newPassword } = data;

    const user = await User.findByPk(id);

    // Check if old password is correct
    const isPasswordValid = await ComparePassword(oldPassword, user.password);

    if (!isPasswordValid) {
      await t.rollback();
      return {
        error: new Error("Old password is incorrect"),
        data: null,
      };
    }

    // Hash new password
    const hashedPassword = await HashPassword(newPassword);

    // Update user
    const updateUser = await User.update({
      password: hashedPassword,
    }, {
      where: { id_user: id },
      transaction: t,
    });

    // remove password from response
    delete user.dataValues.password;

    await t.commit();
    return {
      error: null,
      data: user,
    };

  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};

module.exports = {
  UpdateBioUser,
  UpdatePasswordUser,
};
const db = require("../model");
const { User } = db;

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

module.exports = {
  UpdateBioUser,
};
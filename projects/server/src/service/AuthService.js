const db = require("../model");
const { User } = db;
const { ComparePassword, DecodeToken, GenerateJWT, GenerateToken, HashPassword } = require("../helper/Token");

const { RegisterMail } = require("../mail");
const Mailer = require("../helper/Mailer");
/**
 * MakeAuthService - a function to login user check email and password
 * @param data
 * @returns {Promise<{data: null, error}|{data: (*&{token: void}), error: null}|{data: null, error: Error}>}
 */
const MakeAuthService = async (data) => {
  try {
    const { email, password } = data;

    const user = await User.findOne({
      where: {
        email,
        is_verify: true,
        is_admin: false,
      },
    });

    if (!user) {
      return {
        error: new Error("User not found"),
        data: null,
      };
    }

    const isPasswordValid = await ComparePassword(password, user.password);
    if (!isPasswordValid) {
      return {
        error: new Error("User not found"),
        data: null,
      };
    }

    const token = await GenerateJWT(user);

    // remove password from user
    delete user.dataValues.password;

    return {
      error: null,
      data: {
        ...user.dataValues,
        token,
      },
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};

/**
 * KeepLoginService - check if user exists
 * @param data
 * @returns {Promise<{data: *, error: null}|{data: null, error}|{data: null, error: Error}>}
 */
const KeepLoginService = async (data) => {
  try {
    const { id, email } = data;
    const user = await User.findOne({ where: { id_user: id, email } });
    if (!user) {
      return {
        error: new Error("User not found"),
        data: null,
      };
    }
    return {
      error: null,
      data: user.toJSON(),
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};

/**
 * CreateUserWithEmail - create user with email and send email verification
 * @param data
 * @returns {Promise<{error: null, data: null}|{error: Error, data: null}|{error: Error, data: User}>}
 */
const CreateUserWithEmail = async (data) => {
  const t = await db.sequelize.transaction();
  const { email } = data;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (user) {
      return {
        error: new Error("Email already exists"),
        data: null,
      };
    }

    // Generate token for email verification
    const token = await GenerateToken(email);

    // Create user
    const newUser = await User.create(
      {
        ...data,
        user_token: token,
        is_admin: false,
      },
      { transaction: t },
    );

    // Send email verification
    const mail = RegisterMail.VerifyMail(email, token);
    const send = await Mailer.Transport.sendMail(mail);

    if (!send) {
      console.log("Email failed to send");
      await t.rollback();
      return {
        error: new Error("Email failed to send"),
        data: null,
      };
    }

    await t.commit();
    return {
      error: null,
      data: newUser,
    };
  } catch (error) {
    await t.rollback();
    return {
      error,
      data: null,
    };
  }
};

/**
 * VerifyUser - update user is_verified to true while decoding token
 * @param data
 * @returns {Promise<{data: *, error: null}|{data: null, error}|{data: null, error: Error}>}
 */
const VerifyUser = async (data) => {
  const t = await db.sequelize.transaction();
  const { token, password } = data;

  try {
    // Decode token
    const email = await DecodeToken(token);

    // Check if user exists
    const user = await User.findOne({
      where: {
        email,
        user_token: token,
      },
    });
    if (!user) {
      return {
        error: new Error("User not found"),
        data: null,
      };
    }

    // bcrypt password
    const hashedPassword = await HashPassword(password);

    // Update user
    const updateUser = await User.update(
      {
        is_verify: true,
        password: hashedPassword,
        user_token: null,
      },
      {
        where: { email },
        transaction: t,
      },
    );
    await t.commit();

    return {
      error: null,
      data: updateUser,
    };
  } catch (error) {
    await t.rollback();
    return {
      error,
      data: null,
    };
  }
};

const resetPassword = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    const { email } = data;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        error: new Error("User not found"),
        data: null,
      };
    }

    // Generate token for email verification
    const token = await GenerateToken(email);

    user.user_token = token;
    await user.save({ transaction: t });

    // Send email verification
    const mail = RegisterMail.resetPassword(email, token);
    const send = await Mailer.Transport.sendMail(mail);

    if (!send) {
      console.log("Email failed to send");
      await t.rollback();
      return {
        error: new Error("Email failed to send"),
        data: null,
      };
    }

    await t.commit();
    return {
      error: null,
      data: user,
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
  MakeAuthService,
  KeepLoginService,
  CreateUserWithEmail,
  VerifyUser,
  resetPassword,
};

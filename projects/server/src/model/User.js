const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("user", {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(45),
    },
    email: {
      type: DataTypes.STRING(105),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(105),
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(45),
      unique: true,
    },
    profile_photo: {
      type: DataTypes.STRING(105),
      allowNull: true,
    },
    user_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    is_verify: {
      type: DataTypes.BOOLEAN,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: "user",
    timestamps: false,
  });
};
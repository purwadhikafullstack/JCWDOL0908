const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
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
        defaultValue: null,
      },
      is_verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    },
  );

  // DEFINE RELATIONSHIPS WITH OTHER MODELS
  User.associate = (models) => {
    User.hasMany(models.Address, { foreignKey: "id_user" });
    User.hasMany(models.Cart, { foreignKey: "id_user" });
    User.hasMany(models.Transaction, { foreignKey: "id_user" });
    User.belongsTo(models.AdminRole, { foreignKey: "id_role" });
    User.hasMany(models.MutationProcess, { foreignKey: "created_by" });
    User.hasMany(models.MutationProcess, { foreignKey: "approved_by" });
  };

  return User;
};

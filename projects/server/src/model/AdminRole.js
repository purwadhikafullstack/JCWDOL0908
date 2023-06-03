const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("admin_role", {
    id_role: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_admin: {
      type: DataTypes.STRING,
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "warehouse",
        key: "id_warehouse",
      },
    },
  }, {
    tableName: "admin_role",
    timestamps: false,
  });
};
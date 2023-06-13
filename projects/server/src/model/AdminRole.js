const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AdminRole = sequelize.define(
    "admin_role",
    {
      id_role: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_admin: {
        type: DataTypes.STRING,
      },
      id_warehouse: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "warehouses",
          key: "id_warehouse",
        },
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      tableName: "admin_roles",
      timestamps: false,
    },
  );

  AdminRole.associate = (models) => {
    AdminRole.hasMany(models.User, { foreignKey: "id_role" });
    AdminRole.belongsTo(models.Warehouse, { foreignKey: "id_warehouse" });
  };

  return AdminRole;
};

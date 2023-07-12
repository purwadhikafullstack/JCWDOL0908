const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Warehouse = sequelize.define(
    "warehouse",
    {
      id_warehouse: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      warehouse_name: {
        type: DataTypes.STRING,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
      },
      id_city: {
        type: DataTypes.INTEGER,
        references: {
          model: "cities",
          key: "id_city",
        },
      },
      longitude: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.STRING,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      tableName: "warehouses",
      timestamps: false,
    },
  );

  Warehouse.associate = (models) => {
    Warehouse.hasMany(models.AdminRole, { foreignKey: "id_warehouse" });
    Warehouse.hasMany(models.MutationProcess, { foreignKey: "from_id_warehouse" });
    Warehouse.hasMany(models.MutationProcess, { foreignKey: "to_id_warehouse" });
    Warehouse.hasMany(models.Transaction, { foreignKey: "id_warehouse" });
    Warehouse.hasMany(models.ProductWarehouseRlt, { foreignKey: "id_warehouse" });
    Warehouse.hasMany(models.ProductJournal, { foreignKey: "id_warehouse" });
    Warehouse.belongsTo(models.City, { foreignKey: "id_city" });
  };

  return Warehouse;
};

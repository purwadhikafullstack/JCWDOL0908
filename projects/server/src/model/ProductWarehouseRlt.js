const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProductWarehouseRlt = sequelize.define(
    "product_warehouse_rlt",
    {
      id_product_warehouse: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_product: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id_product",
        },
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      id_warehouse: {
        type: DataTypes.INTEGER,
        references: {
          model: "warehouses",
          key: "id_warehouse",
        },
      },
      booked_stock: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "product_warehouse_rlt",
      timestamps: false,
    },
  );

  ProductWarehouseRlt.associate = (models) => {
    ProductWarehouseRlt.belongsTo(models.Product, { foreignKey: "id_product" });
    ProductWarehouseRlt.belongsTo(models.Warehouse, { foreignKey: "id_warehouse" });
  };

  return ProductWarehouseRlt;
};

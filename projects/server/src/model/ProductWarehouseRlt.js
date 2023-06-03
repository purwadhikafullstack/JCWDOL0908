const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("product_warehouse_rlt", {
    id_product_warehouse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id_product",
      },
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "warehouse",
        key: "id_warehouse",
      },
    },
    booked_stock: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: "product_warehouse_rlt",
    timestamps: false,
  });
};
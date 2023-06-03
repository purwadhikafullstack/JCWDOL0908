const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("transaction_product_rlt", {
    id_transaction_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id_product",
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "transaction",
        key: "id_transaction",
      }
    },
  }, {
    tableName: "transaction_product_rlt",
    timestamps: false,
  });
};
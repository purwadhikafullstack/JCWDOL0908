const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TransactionProductRlt = sequelize.define(
    "transaction_product_rlt",
    {
      id_transaction_product: {
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
      quantity: {
        type: DataTypes.INTEGER,
      },
      id_transaction: {
        type: DataTypes.INTEGER,
        references: {
          model: "transactions",
          key: "id_transaction",
        },
      },
    },
    {
      tableName: "transaction_product_rlt",
      timestamps: false,
    },
  );

  TransactionProductRlt.associate = (models) => {
    TransactionProductRlt.belongsTo(models.Transaction, { foreignKey: "id_transaction" });
    TransactionProductRlt.belongsTo(models.Product, { foreignKey: "id_product" });
  };

  return TransactionProductRlt;
};

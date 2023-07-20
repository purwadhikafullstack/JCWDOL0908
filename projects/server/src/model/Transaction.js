const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Transaction = sequelize.define(
    "transaction",
    {
      id_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total_price: {
        type: DataTypes.INTEGER,
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id_user",
        },
      },
      id_address: {
        type: DataTypes.INTEGER,
        references: {
          model: "addresses",
          key: "id_address",
        },
      },
      status_order: {
        type: DataTypes.STRING,
        defaultValue: "waiting-for-payment",
        allowNull: true,
      },
      payment_proof: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_warehouse: {
        type: DataTypes.INTEGER,
        references: {
          model: "warehouses",
          key: "id_warehouse",
        },
      },
      shipping_cost: {
        type: DataTypes.INTEGER,
      },
      shipping_service: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "transactions",
      timestamps: true,
    },
  );

  Transaction.associate = (models) => {
    Transaction.hasMany(models.TransactionProductRlt, { foreignKey: "id_transaction" });
    Transaction.belongsTo(models.User, { foreignKey: "id_user" });
    Transaction.belongsTo(models.Address, { foreignKey: "id_address" });
    Transaction.belongsTo(models.Warehouse, { foreignKey: "id_warehouse" });
  };
  return Transaction;
};
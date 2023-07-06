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
      payment_proof: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_approve: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      is_sending: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      is_accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      is_canceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
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

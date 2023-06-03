const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("transaction", {
    id_transaction: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id_user",
      },
    },
    address_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "address",
        key: "id_address",
      }
    },
    payment_proof: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_approve: {
      type: DataTypes.BOOLEAN,
    },
    is_sending: {
      type: DataTypes.BOOLEAN,
    },
    is_accepted: {
      type: DataTypes.BOOLEAN,
    },
    is_canceled: {
      type: DataTypes.BOOLEAN,
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "warehouse",
        key: "id_warehouse",
      }
    },
  }, {
    tableName: "transaction",
    timestamps: false,
  });
};
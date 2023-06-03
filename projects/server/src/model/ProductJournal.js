const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("product_journal", {
    id_journal: {
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
    warehouse_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "warehouse",
        key: "id_warehouse",
      }
    },
    activity_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "activity",
        key: "id_activity",
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: "product_journal",
    timestamps: false,
  });
};
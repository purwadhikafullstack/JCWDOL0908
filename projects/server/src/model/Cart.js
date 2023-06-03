const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("cart", {
    id_cart: {
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
    quantity: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id_user",
      },
    },
  }, {
    tableName: "cart",
    timestamps: false,
  });
};
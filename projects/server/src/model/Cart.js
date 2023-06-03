const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Cart = sequelize.define(
    "cart",
    {
      id_cart: {
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
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id_user",
        },
      },
    },
    {
      tableName: "carts",
      timestamps: false,
    },
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "id_user" });
    Cart.belongsTo(models.Product, { foreignKey: "id_product" });
  };

  return Cart;
};

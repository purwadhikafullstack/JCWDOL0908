const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("product", {
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING(45),
      unique: true,
    },
    product_image: {
      type: DataTypes.STRING(105),
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    weight_kg: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id_category",
      }
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: "product",
    timestamps: false,
  });
};
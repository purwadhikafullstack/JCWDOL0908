const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    "product",
    {
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
        type: DataTypes.FLOAT,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      id_category: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id_category",
        },
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      tableName: "products",
      timestamps: true,
    },
  );

  Product.associate = (models) => {
    Product.hasMany(models.Cart, { foreignKey: "id_product" });
    Product.hasMany(models.ProductWarehouseRlt, { foreignKey: "id_product" });
    Product.hasMany(models.MutationProcess, { foreignKey: "id_product" });
    Product.hasMany(models.TransactionProductRlt, { foreignKey: "id_product" });
    Product.hasMany(models.ProductJournal, { foreignKey: "id_product" });
    Product.belongsTo(models.Category, { foreignKey: "id_category" });
  };

  return Product;
};

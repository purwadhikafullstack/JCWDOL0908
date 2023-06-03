const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define(
    "category",
    {
      id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING(45),
        unique: true,
      },
      category_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      tableName: "categories",
      timestamps: false,
    },
  );

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: "id_category" });
  };

  return Category;
};

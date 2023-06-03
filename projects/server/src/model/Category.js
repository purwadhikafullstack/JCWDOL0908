const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("category", {
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
  }, {
    tableName: "category",
    timestamps: false,
  });
};
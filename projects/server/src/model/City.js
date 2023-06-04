const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const City = sequelize.define(
    "city",
    {
      id_city: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      city: {
        type: DataTypes.STRING(45),
      },
      id_province: {
        type: DataTypes.INTEGER,
        references: {
          model: "provinces",
          key: "id_province",
        },
      },
    },
    {
      tableName: "cities",
      timestamps: false,
    },
  );

  // DEFINE RELATIONSHIPS WITH OTHER MODELS
  City.associate = (models) => {
    City.hasMany(models.Warehouse, { foreignKey: "id_city" });
    City.belongsTo(models.Province, { foreignKey: "id_province" });
  };

  return City;
};

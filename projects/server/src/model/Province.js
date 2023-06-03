const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Province = sequelize.define(
    "province",
    {
      id_province: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      province: {
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: "provinces",
      timestamps: false,
    },
  );

  Province.associate = (models) => {
    Province.hasMany(models.City, { foreignKey: "id_province" });
  };

  return Province;
};

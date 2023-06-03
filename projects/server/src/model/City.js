const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("city", {
    id_city: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    city: {
      type: DataTypes.STRING(45),
    },
    province_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "province",
        key: "id_province",
      },
    },
  }, {
    tableName: "city",
    timestamps: false,
  });
};
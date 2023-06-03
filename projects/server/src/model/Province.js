const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("province", {
    id_province: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    province: {
      type: DataTypes.STRING(45),
    },
  }, {
    tableName: "province",
    timestamps: false,
  });
};
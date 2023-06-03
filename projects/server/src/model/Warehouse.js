const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("warehouse", {
    id_warehouse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    warehouse_name: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "city",
        key: "id_city",
      }
    },
    longitude: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: "warehouse",
    timestamps: false,
  });
};
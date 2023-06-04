const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Address = sequelize.define(
    "address",
    {
      id_address: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: DataTypes.STRING(255),
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id_user",
        },
      },
      id_city: {
        type: DataTypes.INTEGER,
        references: {
          model: "cities",
          key: "id_city",
        },
      },
      notes: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
      },
      longitude: {
        type: DataTypes.STRING(255),
      },
      latitude: {
        type: DataTypes.STRING(255),
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      tableName: "addresses",
      timestamps: true,
    },
  );

  // DEFINE RELATIONSHIPS WITH OTHER MODELS
  Address.associate = (models) => {
    Address.belongsTo(models.User, { foreignKey: "id_user" });
    Address.belongsTo(models.City, { foreignKey: "id_city" });
    Address.hasMany(models.Transaction, { foreignKey: "id_address" });
  };

  return Address;
};

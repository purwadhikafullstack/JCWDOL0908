const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProductJournal = sequelize.define(
    "product_journal",
    {
      id_journal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_product: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id_product",
        },
      },
      id_warehouse: {
        type: DataTypes.INTEGER,
        references: {
          model: "warehouses",
          key: "id_warehouse",
        },
      },
      id_activity: {
        type: DataTypes.INTEGER,
        references: {
          model: "activity_type_journal",
          key: "id_activity",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "product_journal",
      timestamps: true,
    },
  );

  ProductJournal.associate = (models) => {
    ProductJournal.belongsTo(models.ActivityTypeJournal, { foreignKey: "id_activity" });
    ProductJournal.belongsTo(models.Product, { foreignKey: "id_product" });
    ProductJournal.belongsTo(models.Warehouse, { foreignKey: "id_warehouse" });
  };

  return ProductJournal;
};

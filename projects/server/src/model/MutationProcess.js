const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MutationProcess = sequelize.define(
    "mutation_process",
    {
      id_mutation: {
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
      quantity: {
        type: DataTypes.INTEGER,
      },
      from_id_warehouse: {
        type: DataTypes.INTEGER,
        references: {
          model: "warehouses",
          key: "id_warehouse",
        },
      },
      to_id_warehouse: {
        type: DataTypes.INTEGER,
        references: {
          model: "warehouses",
          key: "id_warehouse",
        },
      },
      is_approve: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      is_sending: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      is_accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      is_reject: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      created_by: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id_user",
        },
      },
      approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id_user",
        },
      },
      accepted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id_user",
        },
      },
      rejected_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id_user",
        },
      },
    },
    {
      tableName: "mutation_processes",
      timestamps: true,
    },
  );

  MutationProcess.associate = (models) => {
    MutationProcess.belongsTo(models.Product, { foreignKey: "id_product" });
    MutationProcess.belongsTo(models.Warehouse, { foreignKey: "from_id_warehouse" });
    MutationProcess.belongsTo(models.Warehouse, { foreignKey: "to_id_warehouse" });
    MutationProcess.belongsTo(models.User, { foreignKey: "created_by" });
    MutationProcess.belongsTo(models.User, { foreignKey: "approved_by" });
  };

  return MutationProcess;
};

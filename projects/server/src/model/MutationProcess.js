const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("mutation_process", {
    id_mutation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id_product",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    from_id_warehouse: {
      type: DataTypes.INTEGER,
      references: {
        model: "warehouse",
        key: "id_warehouse",
      },
    },
    to_id_warehouse: {
      type: DataTypes.INTEGER,
      references: {
        model: "warehouse",
        key: "id_warehouse",
      },
    },
    is_approve: {
      type: DataTypes.BOOLEAN,
    },
    is_sending: {
      type: DataTypes.BOOLEAN,
    },
    is_accepted: {
      type: DataTypes.BOOLEAN,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    accepted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: "mutation_process",
    timestamps: false,
  });
};
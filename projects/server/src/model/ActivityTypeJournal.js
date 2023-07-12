const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ActivityTypeJournal = sequelize.define(
    "activity_type_journal",
    {
      id_activity: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      activity_name: {
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: "activity_type_journal",
      timestamps: false,
    },
  );

  ActivityTypeJournal.associate = (models) => {
    ActivityTypeJournal.hasMany(models.ProductJournal, { foreignKey: "id_activity" });
  };

  return ActivityTypeJournal;
};

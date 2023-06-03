const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('address', {
        id_address: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING(255)
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id_user'
            }
        },
        city_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'city',
                key: 'id_city'
            }
        },
        notes: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_primary: {
            type: DataTypes.BOOLEAN
        },
        longitude: {
            type: DataTypes.STRING(255)
        },
        latitude: {
            type: DataTypes.STRING(255)
        },
        is_deleted: {
            type: DataTypes.BOOLEAN
        }
    }, {
        tableName: 'address',
        timestamps: false
    });
};
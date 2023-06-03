const dbConfig = require('../config/MysqlConfig')
const { Sequelize} = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASS, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./User')(sequelize);
db.Address = require('./Address')(sequelize);
db.Province = require('./Province')(sequelize);
db.City = require('./City')(sequelize);
db.Product = require('./Product')(sequelize);
db.Category = require('./Category')(sequelize);
db.AdminRole = require('./AdminRole')(sequelize);
db.Warehouse = require('./Warehouse')(sequelize);
db.ProductWarehouseRlt = require('./ProductWarehouseRlt')(sequelize);
db.ActivityTypeJournal = require('./ActivityTypeJournal')(sequelize);
db.ProductJournal = require('./ProductJournal')(sequelize);
db.MutationProcess = require('./MutationProcess')(sequelize);
db.Transaction = require('./Transaction')(sequelize);
db.TransactionProductRlt = require('./TransactionProductRlt')(sequelize);
db.Cart = require('./Cart')(sequelize);

// DEFINE RELATIONSHIPS


module.exports = db;
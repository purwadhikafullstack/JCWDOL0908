const { join } = require("path");
require('dotenv').config({ path: join(__dirname, '../.env') });
const env = process.env

module.exports = {
    HOST: env.MYSQL_HOST || "localhost",
    USER: env.MYSQL_USER || "root",
    PASS: env.MYSQL_PASSWORD || "",
    DB: env.MYSQL_DB_NAME || "test_fp",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
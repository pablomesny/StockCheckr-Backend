const { Sequelize } = require('sequelize');

const db = new Sequelize( 'StockCheckrDB', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    // logging: false
});

module.exports = db;
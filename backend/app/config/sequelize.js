const Sequelize = require('sequelize')
const db = require('./db.config.json')

module.exports = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
})
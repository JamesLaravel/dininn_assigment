// const mysql = require('mysql2')
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3300,
//     user: 'root',
//     password: 'nomsky24',
//     database: 'test',
//     multipleStatements: true,
//     pool: {
//         max: 10,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// })

// module.exports = connection;
const config = require("./config/database")

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.DB_HOST,
    dialect: "mysql",
    //operatorsAliases: false,
    pool: {
        max: config.pool.max || process.env.max,
        min: config.pool.min || process.env.max
    },
    
})

module.exports = sequelize;
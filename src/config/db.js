const {Pool} = require('pg')

module.exports = new Pool({
    user: "postgres",
    password: "021908",
    host:"localhost",
    port: "5432",
    database: "eduk"
})


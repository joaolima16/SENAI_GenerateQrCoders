const Sequelize = require("sequelize");
var connection = new Sequelize({
    host: "localhost",
    username: "root",
    password: "",
    database:"tests",
    dialect:"mysql"
})
module.exports = connection;
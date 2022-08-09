const sequelize = require('../DB/DbConfig')
const {DataTypes} = require('sequelize')
const user = sequelize.define('user',{
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true
    },
    usuario:{
        type:DataTypes.STRING,

    },
    senha:{
        type:DataTypes.STRING
    }
})
module.exports = user;
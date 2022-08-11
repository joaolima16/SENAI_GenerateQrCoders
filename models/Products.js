const db = require('../config/configdb');
const { DataTypes } = require('sequelize');

const products = db.define('products',{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
}) 

module.exports = products;
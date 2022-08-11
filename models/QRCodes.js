const { DataTypes } = require("sequelize");
const db = require('../config/configdb');

const qrCodes = db.define('QRCodes',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    pathImage:{
        type:DataTypes.STRING,
        allowNull:false
    },
})

module.exports = qrCodes;
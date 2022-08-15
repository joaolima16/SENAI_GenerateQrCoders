const productTable = require('../models/Products');
const qrCodeTable = require('../models/QRCodes');
const db = require('../config/configdb');

class Controller{
    static async createTable(req,res){
        try{
            productTable.hasOne(qrCodeTable,{foreignKey:{allowNull:false}});
            qrCodeTable.belongsTo(productTable,{foreignKey:{allowNull:false}});
            await db.sync({force:true});
            return res.status(201).send('Migration sucessful');
        }catch(error){
            if(error) throw error;
            return res.status(500).send('[ERROR] Migration Failed');
        }
    }
}

module.exports = Controller;
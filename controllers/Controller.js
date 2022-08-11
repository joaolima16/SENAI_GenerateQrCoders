const productTable = require('../models/Products');
const qrCodeTable = require('../models/QRCodes');
const db = require('../config/configdb');

class Controller{
    static async createTable(req,res){
        try{
            productTable.hasOne(qrCodeTable);
            qrCodeTable.belongsTo(productTable);
            await db.sync({force:true});
            return res.status(201).send('Migration sucessful');
        }catch(error){
            return res.status(500).send('[ERROR] Migration Failed');
            if(error) throw error;
        }
    }
}

module.exports = Controller;
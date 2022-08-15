const Sequelize = require('sequelize');
const qrcode = require('qrcode');
const fs = require('fs');
const {spawn} = require('child_process');
const path = require('path');
const projectTable = require('../../models/Products');
const qrCodeTable = require('../../models/QRCodes');

class ProjectController{
    static async index(req, res){
        const reference = req.params.qrcode;
        try{
            const qrCode = projectTable.where({name:reference});
            res.status(200).json(qrCode);
        }catch(error){
            res.status(404).send('[ERROR] QR-Code not found');
        }
    }
    
    arrCodes = '';

    static #setArrCodes(data){
        ProjectController.arrCodes = JSON.parse(data);
    }

    static async create(req, res, next){
        try{            
            ProjectController.#createJsonConfig(req.file.filename,req.body.colcodes,req.body.colnames);
            ProjectController.#allCodes();
            var codes = ProjectController.arrCodes?.codes;
            if(codes !== undefined && codes !== ''){
                codes.map(async (item)=>{
                    const nameQrCode = `QRProduct-${item.name}.png`;
                    ProjectController.#createQRCode(nameQrCode,item.code);
                    const projectResult = await projectTable.create({name:item.name});
                    const qrCodeResult = await qrCodeTable.create({
                        productName:item.name,
                        pathImage:`${req.protocol}://${req.headers.host}/${nameQrCode}`,
                        productId:projectResult.id
                    });
                })
                fs.unlinkSync(req.file.path);
            }
            res.status(200).json({message:"Insert process sucessful"});
        }catch(error){
            res.status(500).json({message:"[ERROR] insert excel to system failed"});
            throw error;
        }
    }

    static async update(req, res){

    }
    
    static async delete(req, res){

    }

    static #createJsonConfig(excelName, colCodes, colNames){ 
        const jsonPath = 'controllers\\ExcelController\\excel_config.json';
        const jsonConfig = JSON.stringify({
            file_name:excelName,
            column_codes:colCodes,
            column_names:colNames
        },null,4);
        fs.writeFileSync(jsonPath, jsonConfig);
    }

    static #createQRCode(name, text){
        qrcode.toFile(`public/${name}`, String(text));
    }

    static #allCodes(){
        const process = spawn('python',["index.py"],{
            cwd:path.resolve(__dirname,'../ExcelController'),
        })
        process.stdout.on('data',(response)=>ProjectController.#setArrCodes(response.toString()));
    }
}
module.exports = ProjectController;
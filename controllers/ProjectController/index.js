const Sequelize = require('sequelize');
const fs = require('fs');
const {spawn} = require('child_process');
const path = require('path');
const controller = require('../Controller');
const productTable = require('../../models/Products');
const qrCodeTable = require('../../models/QRCodes');
const QRCodeController = require('../QRCodeController');

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
    
    static async create(req, res){
        /*
            #swagger.description = "Criação de QR-Codes a partir de um arquivo .xlsx <br/> [Acione a rota duas vezes]"
        */
        /*
            #swagger.parameters['colnames']={
                description:'Nome da coluna com os nomes dos items',
                type:'string',
                required:true,
                in:'body',
                example:'modelo_itens',
            }
            
            #swagger.parameters['colcodes']={
                description:'Nome da coluna com os códigos de patrimônio',
                type:'string',
                required:true,
                in:'body',
                example:'codigos',
            }
        */
        try{
            const {colcodes, colnames} = req.body;
            const {filename,path} = req.file;  
            ProjectController.#createJsonConfig(filename,colcodes,colnames);
            ProjectController.#allCodes();
            var codes = ProjectController.arrCodes?.codes;
            if(codes !== undefined && codes !== ''){
                const QRCode = new QRCodeController();
                codes.map(async (item)=>{
                    const nameQrCode = `QRProduct-${item.name}.png`;
                    await QRCode.create(nameQrCode,item.code);
                    const projectResult = await productTable.create({name:item.name});
                    const qrCodeResult = await qrCodeTable.create({
                        productName:item.name,
                        pathImage:`${req.protocol}://${req.headers.host}/${nameQrCode}`,
                        productId:projectResult.id
                    });
                });
                fs.unlinkSync(path);
            }
            res.status(201).json({message:"Insert process sucessful"});
        }
        catch(error){
            res.status(500).json({message:"[ERROR] insert excel to system failed"});
            throw error;
        }
    }

    static async update(req, res){

    }
    
    static async delete(req, res){
        /*
            #swagger.description = "Deletar QRCode da pasta public e da base de dados a partir de um id"
        */
       /*
            #swagger.parameters['id']={
                description:"Insira o id do item que deseja excluir",
                type:"integer",
                required:true,
            }
       */
        try{
            controller.relationshipTables();
            const id = req.params.id;
            const resultProduct = await productTable.findOne({
                where:{id:id},
                include:qrCodeTable, 
            });
            const {qrcode} = resultProduct;
            let fileName = qrcode.pathImage.split('/');
            fileName = fileName[fileName.length-1];
            fs.unlinkSync(path.resolve(`public/${fileName}`))
            productTable.destroy({
                where:{id:id},
                include:qrCodeTable
            })
            res.status(204).json({message:"Content excluded sucessful"})
        }catch(err){
            res.status(500).json({message:"[ERROR] Can't exclude content"});
            throw err;
        }
    }

    arrCodes = '';

    static #setArrCodes(data){
        ProjectController.arrCodes = JSON.parse(data);
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

    static #allCodes(){
        const process = spawn('python',["index.py"],{
            cwd:path.resolve(__dirname,'../ExcelController'),
        })
        process.stdout.on('data',(response)=>ProjectController.#setArrCodes(response.toString()));
    }
}
module.exports = ProjectController;
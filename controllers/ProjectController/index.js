const Sequelize = require('sequelize');
const projectTable = require('../../models/Products');
const spawn = require('child_process').spawn;

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
    
    static async create(req, res, next){
        // const arrProducts = await this.#allCodes();
        // arrProducts.foreach((product)=>{
        //     this.#createQRCode(product.name,product.code)
        // });
    }

    static async update(req, res){

    }
    
    static async delete(req, res){

    }

    static async #createQRCode(name, text){
        return await qrcode.toFile(`public/QRProduct-${name}.png`, text);
    }

    static async #allCodes(){
        const process = spawn('python',['../ExcelController/index.py']);
        const data = process.stdout.on('data',(data)=>data);
        return data.toString();
    }
}
module.exports = ProjectController;
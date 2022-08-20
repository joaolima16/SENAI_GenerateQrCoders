const {spawn} = require('child_process');
const qrcode = require('qrcode');
const path = require('path');
class QRCodeController{
    async create(name, text){
        const pathFile =`public/${name}`; 
        qrcode.toFile(pathFile, String(text));
        QRCodeController.#qrCodeDescription(pathFile,String(text));
    }
    static #qrCodeDescription(pathFile, code){
        const process = spawn('java',['App.java',path.resolve(pathFile),code],{
            cwd:path.resolve(__dirname,'PutCodeInQrCode/src')
        });
        process.stdout.on('data',(response)=>{
            console.log(response.toString());
        });
    }
}

module.exports = QRCodeController;
const userTable = require('../Models/UserTable')
const user = require('../Models/User');
const qrcode = require('qrcode');
const image = '/Public/QrUser-1.png'
const path = require('path')
var contador = 0;
class UsersControllers{
    static async CreateTable(){
        userTable();
    }
    static async CreateUser(req,res,err){
        try{
            await user.create({
                usuario: req.body.username ,
                senha: req.body.password
            
            })
            res.status(200).send("usuario cadastrado com sucesso")
            contador++;
            qrcode.toFile(`Public/QrUser-${contador}.png`,contador.toString(),(err,response)=>{
                if(err) throw err;
                const imagem = `/Public/QrCodeUser-${contador}.png`;
                console.log(path.basename(imagem))
            })
        }
        catch(err){
               res.status(400).send("um erro ocorreu")
        }
       
    }
    static async testePath(){
    
    }
}
module.exports = UsersControllers;
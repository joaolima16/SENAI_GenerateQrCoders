const userTable = require('../Models/UserTable')
const user = require('../Models/User');
const qrcode = require('qrcode');
const image = '/Public/QrUser-1.png'
const path = require('path')
var contador = 0;
var data = '';
const QrFunction = require('../SystemQRCode/QrCode')
class UsersControllers {
    static async CreateTable() {
        userTable();
    }
    static async CreateUser(req, res, err) {
        try {

            // data = await QrFunction(contador);
            qrcode.toFile(`Public/QrUser-${contador}.png`, contador.toString(), async (err, response) => {
                if (err)
                    throw err;
                const imagem = `/Public/QrCodeUser-${contador}.png`;
                data = path.dirname(imagem) + "/" + path.basename(imagem)

                await user.create({
                    usuario: req.body.username,
                    senha: req.body.password,
                    pathQrcode: data
                })
                res.status(200).send("usuario cadastrado com sucesso")
                contador++;
            })
        }
        catch (err) {

            res.status(400).send("um erro ocorreu")
        }

    }

}
module.exports = UsersControllers;
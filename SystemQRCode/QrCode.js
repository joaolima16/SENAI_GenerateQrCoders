const qrcode = require('qrcode');
const path = require('path')
async function GenerateQr(contador){
    var data ='';
    await qrcode.toFile(`Public/QrUser-${contador}.png`,contador.toString(),(err,response)=>{
        if(err) throw err;
        const imagem = `/Public/QrCodeUser-${contador}.png`;
    
         data = path.dirname(imagem) + "/" + path.basename(imagem)
         return data;
    })

}
module.exports = GenerateQr

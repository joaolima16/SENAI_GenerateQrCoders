module.exports = (req,file,cb)=>{
    if(file.mimetype.split('/')[1] === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') cb(null,true);
    else cb(new Error('[ERROR] This is not an excel file'), false);
}
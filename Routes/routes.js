const {Routes, Router} = require('express');
const Controllers = require('../Controllers/UsersControllers')
const rotas = Router();

rotas.get('/criarTabela',Controllers.CreateTable);
rotas.post('/criarUsuario',Controllers.CreateUser,(err)=>{
    if (err) throw err;
});


module.exports = rotas;
const express = require('express')
const app = express();
const routes = require('./Routes/routes')

app.use(express.json());
app.use(routes)


app.listen(3000,(req,res)=>{
    console.log("servidor em operação")
})
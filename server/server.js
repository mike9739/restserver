const express = require('express')
const app = express();
const bodyparser = require('body-parser')
//parse apllication www-form-utlencoded
app.use(bodyparser.urlencoded({extended:false}))
//parse app/json
app.use(bodyparser.json())

require('./config/config')

app.get('/usuario',(req,res)=>{
    res.json('get Usuario')
})
app.post('/usuario',(req,res)=>{
    let body = req.body
    if(body.nombre === undefined){
        res.status(500).json({
            ok:false,
            message:'El nombre es necesario'
        });
    }
    else{
        res.status(200).json({
            persona:body})
    }
    
})
app.put('/usuario/:id',(req,res)=>{
    let id = req.params.id
    res.json({
        id
    })
})
app.delete('/usuario',(req,res)=>{
    res.json('delete usuario')
})

app.listen(process.env.PORT,()=>{
    console.log(`escuchando en ${process.env.PORT}`);
})
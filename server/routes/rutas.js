const express = require('express')
const app = express()
const User = require('../models/users')
app.get('/usuario',(req,res)=>{
    res.json('get Usuario')
})
app.post('/usuario',(req,res)=>{
    let body = req.body
    //se crea la insrancia para el nuevo usuario
    let user = new User({
        name:body.name,
        email:body.email,
        password:body.password,
        role:body.role
    })

    //Guardando el usuario en la base de datos

    user.save((err,userDB)=>{
        //comprueba si no existen errores   
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        //success
        res.status(200).json({
            ok:true,
            user:userDB
        })
    })
    
    
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

module.exports = app;
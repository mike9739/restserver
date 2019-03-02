const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/users')
const _ = require('underscore')
const app = express()
app.get('/usuario',(req,res)=>{
    res.json('get Usuario')
})
app.post('/usuario',(req,res)=>{
    //configura las variables del esquema que se pueden modificar
    let body = _.pick(req.body,['name','email','img','role','state'])
    //se crea la insrancia para el nuevo usuario
    let user = new User({
        name:body.name,
        email:body.email,
        password:bcrypt.hashSync(body.password,10),
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
        //Se borra la contraseña de la respuesta
        // userDB.password = null

        //success
        res.status(200).json({
            ok:true,
            user:userDB
        })
    })
    
    
})
app.put('/usuario/:id',(req,res)=>{
    let id = req.params.id
    let body = req.body

    User.findOneAndUpdate(id,body,{new:true,runValidators:true,context:'query'},(err,userDB)=>{
       
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.status(200).json({
            ok:true,
            user:userDB
        })
    })
})
app.delete('/usuario',(req,res)=>{
    res.json('delete usuario')
})

module.exports = app;
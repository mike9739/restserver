require('./config/config')
const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
app.use(require('./routes/rutas'))

//middlewares
//parse apllication www-form-utlencoded
app.use(bodyparser.urlencoded({extended:false}))
//parse app/json
app.use(bodyparser.json())

//conexion a la base de datos, con la nueva forma de mongodb
mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true }, (err, res) => {
 
    if (err) throw err;
     
    console.log('Base de Datos ONLINE');
     
    })
//configuracion del servidor
app.listen(process.env.PORT,()=>{
    console.log(`escuchando en ${process.env.PORT}`);
})
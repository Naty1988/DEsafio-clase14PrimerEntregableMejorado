const express = require('express')
const app = express()
require('dotenv').config()
const puerto = process.env.PUERTO
const rutas = require('./routes/index')


const admin = true

// Configuración para acceder al req body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(puerto, err => {
    if(err) {
        console.log(`Ocurrió un error: ${err}`)
    } else {
        console.log(`Servidor escuchando el puerto: ${puerto}`)
    }
})

app.use('/api', rutas)
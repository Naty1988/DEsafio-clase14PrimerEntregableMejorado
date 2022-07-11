const { Router } = require('express');
const router = Router()
require('dotenv').config()
let admin = process.env.ADMIN
const { agregarProducto, mostrarProducto, actualizarProducto, borrarProducto } = require('../controllers/productosController')


function midlewareRolTodos(req, res, next) {
    
    if((admin === "true" ) || (admin === "false")) {
        console.log('Tenes acceso')
         next()
        
    }else {
        res.json({ error : -1, descripcion: "ruta 'x' método 'y' no autorizada"})

    }
}

// El router base '/api/productos' implementará cuatro funcionalidades:

// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)

router.get('/id?', midlewareRolTodos, mostrarProducto)



function midlewareRolAdmin(req, res, next) {
    
    if(admin === "true") {
        console.log('Tenes acceso')
         next()
        
    }else {
        res.json({ error : -1, descripcion: "ruta 'x' método 'y' no autorizada"})
    }
}


// POST: '/' - Para incorporar productos al listado (disponible para administradores)

router.post('/', midlewareRolAdmin, agregarProducto)

// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)

router.put('/:id', midlewareRolAdmin, actualizarProducto)

// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)

router.delete('/:id', midlewareRolAdmin, borrarProducto)

module.exports = router
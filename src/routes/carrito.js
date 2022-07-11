const { Router } = require('express');
const router = Router()
require('dotenv').config()
let admin = process.env.ADMIN
const { crearCarrito, vaciarCarrito, listaProductosCarrito, agregarProductoCarrito, eliminarProductoCarrito } = require('../controllers/carritoController')

// El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:

function midlewareRolTodos(req, res, next) {
    
    if((admin === "true" ) || (admin === "false")) {
        console.log('Tenes acceso')
         next()
        
    }else {
        res.json({ error : -1, descripcion: "ruta 'x' método 'y' no autorizada"})
    }
}


// POST: '/' - Crea un carrito y devuelve su id.

router.post('/', midlewareRolTodos, crearCarrito)

// DELETE: '/:id' - Vacía un carrito y lo elimina.

router.delete('/:id', midlewareRolTodos, vaciarCarrito)

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito

router.get('/:id/productos', midlewareRolTodos, listaProductosCarrito)

// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

router.post('/:id/productos', midlewareRolTodos, agregarProductoCarrito)

// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

router.delete('/:id/productos/:id_prod', midlewareRolTodos, eliminarProductoCarrito)

module.exports = router
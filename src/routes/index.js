const { Router } = require('express');
const router = Router()
const rutasCarrito = require('./carrito')
const rutasProductos = require('./productos')

router.use('/productos', rutasProductos)
router.use('/carrito', rutasCarrito)

module.exports = router
const fs = require('fs')

class Producto {
    constructor( id, timestamp, nombre, descripcion, codigo, foto, precio, stock) {
        this.id= id,
        this.timestamp = timestamp,
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.codigo = codigo,
        this.foto = foto,
        this.precio = precio,
        this.stock = stock
    }
}
let productos = []

const traerProductos = async () => {
    try {
        productos = await fs.promises.readFile('./src/productos.txt', 'utf-8')
        productos = JSON.parse(productos)
        console.log('leyendo productos')
    } catch (error) {
        console.log(`Hubo un error en traerProductos: ${error}`)
    }
}

traerProductos()

const actualizarBaseDeDatosProductos = async () => {
    try {
        await fs.promises.writeFile('./src/productos.txt', JSON.stringify(productos))
    } catch (error) {
        console.log(`Hubo un error en actualizarBaseDeDatosProductos: ${error}`)
    }
}

// Controlador de router.post('/', agregarProducto)

const agregarProducto = async (req, res) => {
    console.log('agregarProducto')
    try {

        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        id = Number(productos.length + 1)
        timestamp = new Date().toLocaleDateString()
        const nuevoproducto = new Producto( id, timestamp, nombre, descripcion, codigo, foto, precio, stock) 
        productos.push(nuevoproducto)
        actualizarBaseDeDatosProductos()
        traerProductos()
        res.json(productos)
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

// Controlador de router.put('/:id', actualizarProducto)

const actualizarProducto = (req, res) => {
    console.log('actualizarProducto')

    const { id } = req.params
    let productoActualizar = productos.filter(product => {
        return product.id === id
    })

    console.log('Se actualizará el producto: ', productoActualizar)

    if (req.body.nombre) {
        productos[id - 1].nombre = req.body.nombre
        console.log('Se modifico el campo nombre')
    } else {
        console.log('Campo nombre sin actualizar')
    }

    if (req.body.descripcion) {
        productos[id - 1].descripcion = req.body.descripcion
        console.log('Se modifico el campo descripcion')
    } else {
        console.log('Campo descripcion sin actualizar')
    }

    if (req.body.codigo) {
        productos[id - 1].codigo = req.body.codigo
        console.log('Se modifico el campo codigo')
    } else {
        console.log('Campo codigo sin actualizar')
    }

    if (req.body.foto) {
        productos[id - 1].foto = req.body.foto
        console.log('Se modifico el campo foto')
    } else {
        console.log('Campo foto sin actualizar')
    }

    if (req.body.precio) {
        productos[id - 1].precio = req.body.precio
        console.log('Se modifico el campo precio')
    } else {
        console.log('Campo precio sin actualizar')
    }

    if (req.body.stock) {
        productos[id - 1].stock = req.body.stock
        console.log('Se modifico el campo stock')
    } else {
        console.log('Campo stock sin actualizar')
    }
    console.log('Vista del producto actualizado: ', productos[id - 1])
    
    actualizarBaseDeDatosProductos()
    res.sendStatus(200)
}

// Controlador de router.get('/id?', mostrarProducto)

const mostrarProducto = (req, res) => {

    console.log('Ejecutando mostrarProducto')

    const { id } = req.query

    const producto = productos.filter(product => {
        return product.id === Number(id)
    })

    if (id > productos.length) {
        console.log('El id no existe. Mostrando todos los productos')
        res.json(productos)

    } else {
        console.log(producto)
        res.json(producto)
    }
}

// / Controlador de router.delete('/:id', borrarProducto)

const borrarProducto = (req, res) => {
    console.log('borrarProducto')

    const idBorrar = Number(req.params.id)

    const productoABorrar = productos.filter(product => {
        return product.id === Number(idBorrar)
    })

    console.log(productoABorrar)

    const index = productos.findIndex((elemento) => elemento.id === idBorrar)

    console.log(index)
    if(index === -1) {
        console.log('ID de producto inexistente')
    } else {
        productos.splice(index, 1)
        console.log(`Producto ID: ${idBorrar} borrado`)
        actualizarBaseDeDatosProductos()
        console.log(productos)
    }

}
    module.exports = { agregarProducto, actualizarProducto, mostrarProducto, borrarProducto }
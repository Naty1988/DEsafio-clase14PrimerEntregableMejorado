const fs = require('fs')

let carritos = []
let productos = []

class Carrito {
    constructor(id, timestamp, productosArray) {
        this.id = id,
            this.timestamp = new Date().toLocaleDateString(),
            this.productosArray = []
    }
}

const traerCarritos = async () => {
    try {
        carritos = await fs.promises.readFile('./src/carrito.txt', 'utf-8')
        carritos = JSON.parse(carritos)
        console.log('traje carritos')
        console.log(carritos)
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}
traerCarritos()

const actualizarBaseDeDatosCarrito = async () => {
    try {
        await fs.promises.writeFile('./src/carrito.txt', JSON.stringify(carritos))
        console.log('Base de datos actualizada')
        console.log(carritos)
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

const traerProductos = async () => {
    try {
        productos = await fs.promises.readFile('./src/productos.txt', 'utf-8')
        productos = JSON.parse(productos)
        console.log('leyendo productos')
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}

traerProductos()

// POST: '/' - Crea un carrito y devuelve su id. router.post('/', crearCarrito)

const crearCarrito = async (req, res) => {
    console.log('crearCarrito')
    try {

        let id = Number(carritos.length + 1)
        const nuevoCarrito = new Carrito(id)
        carritos.push(nuevoCarrito)

        console.log(nuevoCarrito)
        console.log(carritos)
        actualizarBaseDeDatosCarrito()
        traerCarritos()

        res.json(`id del carrito creado: ${nuevoCarrito.id}`)
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
    }
}
// DELETE: '/:id' - Vacía un carrito y lo elimina. 
// router.delete('/:id', vaciarCarrito)

const vaciarCarrito = (req, res) => {
    console.log('vaciarCarrito')

    const idCarrito = Number(req.params.id)
    console.log('id carrito', idCarrito)
    const index = carritos.findIndex((elemento) => elemento.id === idCarrito)
    console.log('index ', index)
    if (index === -1) {
        console.log('ID de carrito inexistente')
    } else {
        carritos.splice(index, 1)
        console.log(`Carrito ID: ${idCarrito} borrado`)
        actualizarBaseDeDatosCarrito()
        console.log(carritos)
        res.sendStatus(200)
    }
}

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
// router.get('/:id/productos', listaProductosCarrito)

const listaProductosCarrito = (req, res) => {
    console.log('listaProductosCarrito')

    const { id } = req.params

    let listaProductosCarrito = carritos.filter(car => {
        return car.id === Number(id)
    })
    console.log(id)

    console.log(listaProductosCarrito)

    listaProductosCarrito.map((e) => {
        console.log(e.productosArray)
    })
}

// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
// router.post('/:id/productos', agregarProductoCarrito)

const agregarProductoCarrito = (req, res) => {
    console.log('agregarProductoCarrito')

    const { id } = req.params


    let carritoEncontrado = carritos.filter(car => {
        return car.id === Number(id)
    })
    console.log('id carritto por params', id)

    console.log('Carrito encontrado', carritoEncontrado)

    const productoId = req.body.agregarProducto
    console.log('Agregar producto N°: ', productoId)

    const producto = productos.find(product => product.id === Number(productoId))

    const indexCarrito = carritos.findIndex((elemento) => elemento.id === Number(id))

    console.log('Detalles de producto a agregar: ', producto)
    carritos[indexCarrito].productosArray.push(producto)

    actualizarBaseDeDatosCarrito()

}

// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
// router.delete('/:id/productos/:id_prod', eliminarProductoCarrito)

const eliminarProductoCarrito = (req, res) => {
    console.log('eliminarProductoCarrito')

    const { id } = req.params

    let carritoEncontrado = carritos.filter(car => {
        return car.id === Number(id)
    })

    if (carritoEncontrado.length === 0) {
        console.log(`No existe carrito con el ID: ${id}`)
    } else {
        console.log('id carritto por params', id)

        console.log('Carrito encontrado', carritoEncontrado)

    }

    const { id_prod } = req.params

    let productoEncontrado = productos.filter(car => {
        return car.id === Number(id_prod)
    })
    console.log('id producto por params', id_prod)

    console.log('producto encontrado', productoEncontrado)

    carritoEncontrado.map((e) => {
        console.log(e.productosArray)

        const index = e.productosArray.findIndex((elemento) => elemento.id === Number(id_prod))

        for (let i = 0; i < e.productosArray.length; i++) {

            if (index === -1) {
                console.log(`No hay productos con el id ${id_prod} en el carrito ${id}`)
            } else {
                console.log('encontrado!')
                console.log(index)
                e.productosArray.splice(index, 1)
                console.log(`Borrando producto vuelta de bucle ${i}`)
            }
        }
        console.log(`Producto ID: ${id_prod} borrado`)
        console.log(e.productosArray)
    })

    actualizarBaseDeDatosCarrito()

}

module.exports = { crearCarrito, vaciarCarrito, listaProductosCarrito, agregarProductoCarrito, eliminarProductoCarrito }
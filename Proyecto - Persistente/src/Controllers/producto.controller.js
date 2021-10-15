const productos = require("../models/productos.models")
const redis = require("../utils/redis")

const CrearProductos =  async (req,res) =>{
    const  {nombre,precio} = req.body;
    const existeProducto = await productos.findOne({nombre});
    if (existeProducto) {
        res.status(400).json('El producto ya existe');
    }else{
        const nuevoProducto = new productos ({nombre,precio});
         await nuevoProducto.save();
        res.json(nuevoProducto)
    }
}



const MostrarProductos = async (req,res) => { 
    const Productos = await productos.find();
    redis.setex("productos",3000, JSON.stringify(Productos))
    res.json(Productos)}

const ActualizarProductos = async (req, res) => {
    const idProducto = req.params.id;
    const { nombre, precio } = req.body;
    const existeProducto = await productos.findById(idProducto)
    if (existeProducto) {
        existeProducto.nombre = nombre;
        existeProducto.precio = precio;
         await existeProducto.save();
        redis.del("productos")
        res.json(existeProducto);
    } else {
        res.sendStatus(400).json('Producto no encontrado');
    }
}

const EliminarProductos = async (req, res) => {
    const idProducto = req.params.id;
    const existeProducto = await productos.findById(idProducto)
    if(existeProducto){
         await existeProducto.delete();
         redis.del("productos")
        res.json("El producto ha sido eliminado")
    }else{
        res.sendStatus(400).json('Producto no encontrado');
    }
}


module.exports = {CrearProductos, MostrarProductos, ActualizarProductos, EliminarProductos}

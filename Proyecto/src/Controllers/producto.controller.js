const productos = require("../models/productos.models")

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
    res.json(Productos)}


module.exports = {CrearProductos, MostrarProductos}

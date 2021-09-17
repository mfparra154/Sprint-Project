const {pedidos} = require("../models/pedidos.models")
const usuarios = require("../models/usuario.model")
const productos = require("../models/productos.models")

async function usuarioId (req) {
    try{
        const emailUsuario = req.usuarios.email;
        const {_id} = await usuarios.findOne(emailUsuario);
        return _id;
    }
    catch(e){
        res.status(500).json("Ha ocurrido un error")
    }
}

async function precioTotal(productos){
    let suma = 0;
    const Producto = 
    productos.forEach(u => {
      suma += u.precioProducto * u.cantidadProducto
    });

    return suma;
    console.log( suma);
}

async function estadoPedido(){
    let suma = 0;
    const Producto = 
    productos.forEach(u => {
      suma += u.precioProducto * u.cantidadProducto
    });

    return suma;
}





const obtenerPedidos = async (req,res) =>{
    try{
        const listaPedidos = await pedidos.find()
        res.json(listaPedidos)
    }catch (error){
        res.status(404).json(error);

    }
}

const crearPedido = async (req,res) => {
    try{
      const {medioPago, cantidadProducto} = req.body
      const idProducto = req.params.id;
      const Producto = await productos.findById(idProducto)
      const nombreProducto = Producto.nombreProducto
      const precioProducto = Producto.precioProducto
      const { usuario,direccion} = req.usuarios
      const nuevoPedido = new pedidos ({nombreProducto, precioProducto, cantidadProducto,usuario,direccion,medioPago})
      await nuevoPedido.save();
      res.json(nuevoProducto)
    }catch (e){
        res.status(500).json("Ha ocurrido un error")
    }
}

const actualizarPedido = async (req,res) =>{
    try{
    const idPedido = req.params.id;
    const cantidadProducto = req.body;
    const existePedido = await pedidos.findById(idPedido)
    if(existePedido){
        existePedido.productos.cantidad = cantidadProducto
        await existePedido.save();
        res.json(existePedido)
    }else{
        res.sendStatus(400).json('Pedido no encontrado');
    }
    }
    catch (e){
        res.status(500).json("Ha ocurrido un error")
    }
}

const eliminarPedido = async (req,res) => {
    try{
        const idPedido = req.params.id
        const existePedido = await pedidos.findById(idPedido)
        if(existePedido)
        await existePedido.delete();
        res.json("El pedido ha sido eliminado")
        
    } catch (e){
        res.status(500).json("Ha ocurrido un error")
    }

}

module.exports = { obtenerPedidos, crearPedido, actualizarPedido, eliminarPedido}




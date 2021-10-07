const pedidos = require("../models/pedidos.models")
const { nombreMedioPago }  = require("../Controllers/pagos.controller")
const  {traerUsuario}  = require ("../Controllers/usuario.controller")
const Productos = require("../models/productos.models")


async function agregarPedidos(productos,usuario,direccion,medioPago,estado,precioTotal){
    const Pedido = await new pedidos ({productos,usuario,direccion,medioPago,estado,precioTotal})
    await Pedido.save()
    }

async function estadoPedido(id,estado){
        const Pedido = await pedidos.findById(id)
        Pedido.estado = (estado)
        await Pedido.save()
        return Pedido
    }

async function modificarPedidos(id,productos,usuario,direccion,medioPago,estado,precioTotal) {
    const Pedido = await pedidos.findById(id);
    Pedido.productos= (productos);
    Pedido.usuario = (usuario);
    Pedido.direccion = (direccion);
    Pedido.medioPago = (medioPago);
    Pedido.estado = (estado);
    Pedido.precioTotal =(precioTotal);
    await Pedido.save()
}

async function ordenPendiente(email){
    const pedidoUsuario = await pedidos.findOne({email});
    pedidoUsuario.estado == "pendiente";
    await pedidoUsuario.save()
    return pedidoUsuario
}

async function eliminarPedidos(id){
    const pedidoUsuario = await pedidos.findById(id)
     await pedidoUsuario.delete()
}

async function  modificarlistaProductos(productosPedido) {
    const promesas = productosPedido.map(({idProducto}) => {
        return Productos.findById(idProducto)
    }) 
    const productosSinCantidad = await Promise.all(promesas)
    const productosMod = productosSinCantidad.map((producto) =>{

     return {id:producto.id, nombre:producto.nombre, precio:producto.precio, cantidad:1}
    }) 
    return productosMod
}



 function precioTotal(productos){
    let suma = 0; 
    productos.forEach( (producto) =>{
      suma += producto.precio * producto.cantidad}
    );

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
      const  {productos, idDireccion}  = req.body;
      const {email:emailUsuario} = req.user
      const infoUsuario = await traerUsuario(emailUsuario)
      const { usuario } = infoUsuario;
      const  {direccion} = infoUsuario.direcciones.id(idDireccion)
      const productosPedido = await modificarlistaProductos(productos)
      const PrecioPedido = precioTotal(productosPedido)
    const nuevoPedido = new pedidos( {productos:productosPedido,usuario, direccion,medioPago:"efectivo", estado:"pendiente", precioTotal:PrecioPedido})
    await nuevoPedido.save();
      res.status(200).json({ mensaje: "Pedido creado" });
    }catch (e){
        res.status(500).json("Ha ocurrido un error")
    }
}

const actualizarPedido = async (req,res) =>{
try{
    const {email:emailUsuario} = req.user
    const infoUsuario = await traerUsuario(emailUsuario)
    const { usuario } = infoUsuario;
    const pedidoUsuario = await pedidos.findOne({usuario});
    if(pedidoUsuario.estado == "pendiente"){
    const { productos, idDireccion, idMedioPago  } = req.body;
    const  {direccion} = infoUsuario.direcciones.id(idDireccion)
    const productosPedido = await modificarlistaProductos(productos);
    const PrecioPedido = precioTotal(productosPedido)
    const MedioPago = await nombreMedioPago(idMedioPago);
     pedidoUsuario.productos= (productosPedido);
     pedidoUsuario.usuario= (usuario);
     pedidoUsuario.direccion= (direccion);
     pedidoUsuario.medioPago= (MedioPago);
     pedidoUsuario.estado= "pendiente";
     pedidoUsuario.precioTotal= (PrecioPedido);
     await pedidoUsuario.save();
     console.log(pedidoUsuario);
        res.status(200).json({ mensaje: "Pedido actualizado" }); 
   }else{
        res.status(400).json('Pedido no encontrado');
        }
    }
      catch (e){
       res.status(500).json("Ha ocurrido un error")
       console.log(e);
    }
} 


const actualizarEstadoPedido = async (req,res) => {
try{
    const id = req.params.id;
    const estado = req.body.estado;
    const pedido = await pedidos.findById(id)
    if(pedido){
        if(estado == "pendiente" || estado == "Confirmado" || estado == "Preparando" || estado == "Enviado"
        || estado == "Entregado"){
            res.json(estadoPedido(id, estado))
        }else{
            res.status(400).json({ err: 'Pedido no encontrado' })
            }
         }else{
            res.sendStatus(404)
         }

    }catch (e){
    res.status(500).json("ha ocurrido un error")
    }
}


const confirmarPedido = async (req,res) => {
    try{
        const {email:emailUsuario} = req.user
        const infoUsuario = await traerUsuario(emailUsuario)
        const { usuario } = infoUsuario;
        const pedidoUsuario = await pedidos.findOne({usuario});
        if (pedidoUsuario.estado == "pendiente") {
            pedidoUsuario.estado = "Confirmado";
            await pedidoUsuario.save()
            res.json({ mensaje: "Pedido confirmado" });
        } else {
        res.status(400).json({ err: 'Pedido no encontrado' })
        } 
     }catch (e){
         res.status(500).json("Ha ocurrido un error")
        console.log(e);
   }
}

const eliminarPedido = async (req,res) => {
    try{
        const idPedido = req.params.id
        const existePedido = await pedidos.findById(idPedido)
        if(existePedido){
        await existePedido.delete();
        res.json("El pedido ha sido eliminado")
        }else{
            res.json("El pedido no ha sido eliminado")
        }
        
    } catch (e){
        console.log(e)
        res.status(500).json("Ha ocurrido un error")
        
    }

}

module.exports = { obtenerPedidos, crearPedido, actualizarPedido, actualizarEstadoPedido, confirmarPedido, eliminarPedido}




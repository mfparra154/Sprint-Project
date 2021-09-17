const express = require("express");
const app=express();
app.use(express.json());
const  mongoose  = require("mongoose");

const ProductosPedidoSchema =  new mongoose.Schema(
    {
    nombreProducto: {
        type:String,
        required: true
    },
    precioProducto: {
        type: Number,
        required: true
    },
    cantidadProducto: {
        type: Number,
        required: true
    }

    });

    const PedidosSchema =  new mongoose.Schema({
        productos: [ProductosPedidoSchema],
        usuario: {
            type:String,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        medioPago: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        preioTotal: {
            type: Number,
            required: true
        },
    })






function mostrarPedidos() {
    return Pedidos;
}

function agregarPedidos(id,productos,usuario,direccion,medioPago,estado,precioTotal) {
    id = Date.now();
    const Pedido = {id,productos,usuario,direccion,medioPago,estado,precioTotal}
    Pedidos.push(Pedido)
}

function estadoPedido(id,estado) {
    const index = Pedidos.findIndex(p=>p.id = id);
    Pedidos[index].estado = estado;
    return Pedidos[index]

}

function modificarPedidos(pedido,productos,direccion,medioPago,precioTotal) {
    const index = Pedidos.indexOf(pedido);
   Pedidos[index].Productos =productos ;
   Pedidos[index].direccion=direccion;
   Pedidos[index].medioPago=medioPago;
   Pedidos[index].precioTotal=precioTotal
   

 
}

function ordenPendiente(usuario) {
const ordenesPersona = Pedidos.filter(u => u.usuario == usuario);
const Pendiente = ordenesPersona.filter (u => u.estado == "Pendiente");
return Pendiente;

}


function eliminarPedidos(id) {
    const index = Pedidos.findIndex(pedido => pedido.id == id )
    Pedidos.splice(index,1);
}

function modificarListaProductos(listadeProductos) {
    return listadeProductos.map(u =>{
    const nuevoProducto = obtenerProducto(u.id);
    u.nombre = nuevoProducto.nombre;
    u.precio = nuevoProducto.precio;
    return u;

   })

   
}

function precioTotal(listadeProductos) {
    let suma = 0;
    listadeProductos.forEach(u => {
      suma += u.cantidad * u.precio
    });

    return suma;
}

module.exports = mongoose.model('pedidos', PedidosSchema, ProductosPedidoSchema);

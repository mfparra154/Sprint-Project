const express = require("express");
const app=express();
app.use(express.json());

const { Usuarios } = require('../models/usuario.model');
const { Productos, existeProducto,obtenerProducto} = require('../models/productos.models');
const { MediosPago} = require('../models/pagos.models');

const estadoPedidosAdmin =[
    { "id": 1, "estado" : "Pendiente"},
    {"id": 2,"estado" : "Confirmado"},
    {
    "id": 3,
    "estado" : "Preparando"
    },
    {
    "id": 4,
    "estado" : "Enviado"
    },
    {
    "id": 5,
    "estado" : "Entregado"
    },
    {
     "id": 6,
        "estado" : "Cancelado"
    }
]


const Pedidos = [
    {
    id: 1,
    Productos:[ {
        "id": 1,
        "nombre": "Bagel de Salmon",
        "precio": 425,
        "cantidad":"3"

    }],
    email: "admin@gmail.com", 
    direccion: "Manzana b casa 8", 
    medioPago: "efectivo", 
    estado: "Pendiente",
    precioTotal: 1275},


    {    
    id: 2,
    Productos:[ {
        "id": 2,
        "nombre": "Hamburguesa Clásica",
        "precio": 350,
        "cantidad":"1"},
    {
        "id": 3,
        "nombre": "Sandwich veggie",
        "precio": 310,
        "cantidad":"1"}
    ],
    
    email: "pepitaperez@gmail.com", 
    direccion: "Avenida siempre viva 123", 
    medioPago: "paypal", 
    estado: "Preparando",
    precioTotal: 660,
},
{
    id: 4,
    productos:[ {
        "id": 1,
        "nombre": "Ensalada veggie",
        "precio": 340,
        "cantidad":"3"

    }],
    email: "mafe@gmail.com", 
    direccion: "Manzana b casa 8", 
    medioPago: "efectivo", 
    estado: "Enviado",
    precioTotal: 340}
    
]

function mostrarPedidos() {
    return Pedidos;
}

function agregarPedidos(id,productos,email,direccion,medioPago,estado,precioTotal) {
    id = Date.now();
    const Pedido = {id,productos,email,direccion,medioPago,estado,precioTotal}
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

function ordenPendiente(email) {
const ordenesPersona = Pedidos.filter(u => u.email == email);
const Pendiente = ordenesPersona.find (u => u.estado == "Pendiente");
return Pendiente;

}


function eliminarPedidos(id) {
    const index = Pedidos.findIndex(pedido => pedido.id == id )
    Pedidos.splice(index,1);
}

function modificarListaProductos(listadeProductos) {
   return  listadeProductos.map(u =>{
    const nuevoProducto = obtenerProducto(u.id);
    u.nombre = nuevoProducto.nombre;
    u.precio = nuevoProducto.precio;
    return u ;
       
   })

   
}

function precioTotal(listadeProductos) {
    let suma = 0;
    listadeProductos.forEach(u => {
      suma += u.cantidad * u.precio
    });

    return suma;
}

module.exports = {mostrarPedidos,agregarPedidos,modificarPedidos,eliminarPedidos,estadoPedido,ordenPendiente,agregarPedidos, modificarListaProductos,precioTotal} 



const express = require("express");
const app=express();
app.use(express.json());


const Productos = [];


class Producto{
    constructor(id,nombre,precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
   
}
const producto1 = new Producto (1, "Bagel de Salmon", 425 );
Productos.push(producto1);

const producto2 = new Producto (2, "Hamburguesa Clásica", 350 );
Productos.push(producto2);

const producto3 = new Producto (3, "Sandwich veggie", 310 );
Productos.push(producto3);

const producto4 = new Producto (4, "Ensalada Veggui", 340 );
Productos.push(producto4);

const producto5 = new Producto (5, "Focaccia", 300 );
Productos.push(producto5);

const producto6 = new Producto (6, "Sandwich Focaccia", 440 );
Productos.push(producto6);



//funciones que hacen que las rutas funcionen

function mostrarProductos() {
    return Productos;
}

function agregarProductos (nombre,precio) {
    id = Date.now();
    const producto = {id,nombre,precio};
    Productos.push(producto);
}

function modificarProducto(id,nombre,precio) {
   const index = Productos.findIndex(producto => producto.id == id );
   const nuevoProducto = {id,nombre,precio};
   Productos[index] = nuevoProducto ;
}

function eliminarProducto(id) {
    const index = Productos.findIndex(producto => producto.id == id )
    Productos.splice(index,1);
}

//Pregunta Jairo, porque el send y porque el next
function existeProducto (req,res,next){
    const {id}= req.body;
    if(Productos.find (producto => producto.id === id )){
        next();
    ;
    }else {
     res.send("El producto no existe");
    }
 }

 function obtenerProducto(id) {
    return Productos.find (producto => producto.id === id );
 }

//Hya que agregar funcion para verificar que si existe el producto.
//verificar que lo que llega del requist.body este bien. 



module.exports = {
    mostrarProductos,
    agregarProductos,
    modificarProducto,
    eliminarProducto,
    existeProducto,
    obtenerProducto


};





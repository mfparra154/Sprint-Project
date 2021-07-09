//crear un array de medios de pago
// crear funciones iguales a las de producto (mostrar,crear,eliminar,editar)
const express = require("express");
const app=express();
app.use(express.json());

//

const mediosPago =  [ 
    {
    id: "1",
    nombre: "efectivo"
    }, 
    {
        id: "2",
     nombre: "tarjeta de credito"
    },
    {
        id: "3",
        nombre: "tarjeta debito"
    },
    {
        id: "4",
        nombre: "paypal"
    }
];


function mostrarMedios() {
    return mediosPago;
}
function agregarMedioPago (id,nombre) {
    const nuevoMedio = {id,nombre}
    mediosPago.push(nuevoMedio);
}

function eliminarMedioPago(id) {
    const index =  mediosPago.find(u => u.id === id);
    mediosPago.splice (index,1);
}

function nombreMedioPago(id) {
    const medioPago =  mediosPago.find(u => u.id === id);
    return medioPago.nombre;
    
}

module.exports = {agregarMedioPago, eliminarMedioPago,mostrarMedios,nombreMedioPago}



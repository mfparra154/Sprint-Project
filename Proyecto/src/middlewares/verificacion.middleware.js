const basicAuth = require('express-basic-auth');
const express = require("express");
const app=express();
app.use(express.json());

const { mostrarUsuarios } = require('../models/usuario.model');


const verificacion = (nombre,contrasena) => {
const usuarioEncontrado = mostrarUsuarios().find(u => u.nombre == nombre && u.contrasena == contrasena);


if (usuarioEncontrado) {
    return true;
}   else{
    return false;
} 
}


 //module.exports = verificacion;

 //verificar que lo que llega del requist.body este bien. Se comprueba la verificacion de existencia de producto, usuario, etc
 
 module.exports = verificacion;
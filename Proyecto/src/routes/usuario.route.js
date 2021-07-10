const { Router } = require("express");
const express = require("express");
const router=express.Router();
const { mostrarUsuarios, crearUsuarios} = require('../models/usuario.model');

//No se usa use porque ya estamos dentro de la propia ruta
router.post('/registro', (req,res) =>{
     const {email,contrasena,nombre,usuario,telefono,direccion} = req.body;

     if(email && contrasena && nombre && usuario && telefono && direccion){ 
       const verificarEmail = mostrarUsuarios().find(u => u.email == email);
       if (!verificarEmail) {
        crearUsuarios(email,contrasena,nombre,usuario,telefono,direccion);
       }else{
        res.status(400).json({err:"Email ya registrado"})
       }
        res.status(200).json({mensaje:"Usuario registrado"});
     }else{
        res.sendStatus(400);
     }
     
    }
)

router.post('/login', (req,res) => {
   const {email,contrasena} = req.body;
   if (email && contrasena) {
      const verificarUsuario = mostrarUsuarios().find(u => u.email == email && u.contrasena == contrasena);
     if (verificarUsuario) {
      res.status(200).json({mensaje: "Usuario logueado"})
     }else{
        res.status(404).json({err: "No encontrado"})
     }
   }else{
      res.sendStatus(400);
   }


})

//404 es que no escontro el recurso
// res 201 se creo un objeto o una función con exito
// 400 significa que no ha cumplido con lo parametro
// Si es funcion son parantesis , array [], y si es objeto {}


module.exports = router;
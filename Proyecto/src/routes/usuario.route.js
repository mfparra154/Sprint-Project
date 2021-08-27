const { Router } = require("express");
const express = require("express");
const router=express.Router();
const {crearUsuarios} = require("../Controllers/usuario.controller")


//No se usa use porque ya estamos dentro de la propia ruta
router.post('/registro', crearUsuarios )

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
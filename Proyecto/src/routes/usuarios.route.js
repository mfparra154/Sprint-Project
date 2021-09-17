const express = require("express");
const router=express.Router();
const {crearUsuarios, loginUsuarios, obtenerUsuarios, anadirDireccion} = require("../Controllers/usuario.controller")
const {validateRegisterPost} = require("../middlewares/ValidarPost")
const {validateLoginPost} = require("../middlewares/ValidarPost")
const validarUsuarioRegistrado = require("../middlewares/validarUsuarioRegistrado.middelware")




router.post('/registro', validateRegisterPost,  validarUsuarioRegistrado,  crearUsuarios )

router.post('/anadirdirecciones/:id', anadirDireccion)

router.post('/login', validateLoginPost,  loginUsuarios)

router.get('/obtenerusuarios', obtenerUsuarios)


module.exports = router;
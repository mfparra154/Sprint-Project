const express = require("express");
const esAdministrador = require("../middlewares/EsAdmin.middleware");
const router = express.Router();
const productos = require("../models/productos.models")
router.use(express.json());
require('../utils/db');
const { MostrarProductos, CrearProductos, ActualizarProductos, EliminarProductos } = require("../Controllers/producto.controller")
const {validateProductPost} = require("../middlewares/ValidarPost")
const cache = require("../middlewares/cache")





//mostrar lista de productos
router.get('/mostrar', cache, MostrarProductos);


//agregar producto
//router.post('/crear', esAdministrador,(req,res) =>{
router.post('/crear', esAdministrador,validateProductPost, CrearProductos)

//Actualizar productos
//router.put('/actualizar/:id', esAdministrador, (req,res) =>{
router.put('/actualizar/:id', validateProductPost, ActualizarProductos)

//Eliminar productos

router.delete('/eliminar/:id', EliminarProductos)



module.exports = router;
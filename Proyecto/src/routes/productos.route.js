const express = require("express");
const esAdministrador = require("../middlewares/EsAdmin.middleware");
const router = express.Router();
const productos = require("../models/productos.models")
router.use(express.json());
require('../utils/db');
const { MostrarProductos, CrearProductos } = require("../Controllers/producto.controller")





//mostrar lista de productos
router.get('/mostrar', MostrarProductos);


//agregar producto
//router.post('/crear', esAdministrador,(req,res) =>{
router.post('/crear', CrearProductos)

//Actualizar productos
//router.put('/actualizar/:id', esAdministrador, (req,res) =>{
router.put('/actualizar/:id', async (req, res) => {
    const idProducto = req.params.id;
    const { nombre, precio } = req.body;
    const existeProducto = await productos.findById(idProducto)
    if (existeProducto) {
        existeProducto.nombre = nombre;
        existeProducto.precio = precio;
        existeProducto.save();
        res.json(existeProducto);
    } else {
        res.sendStatus(400).json('Producto no encontrado');
    }

}
)

//Eliminar productos

router.delete('/eliminar/:id', esAdministrador, (req, res) => {
    const idProducto = req.params.id;
    if (parseInt(idProducto) != NaN) {
        const productoExistente = mostrarProductos().findIndex(p => p.id == idProducto);
        if (productoExistente >= 0) {
            eliminarProducto(idProducto);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(400);
    }

})



module.exports = router;
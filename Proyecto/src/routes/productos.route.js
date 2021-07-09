const express = require("express");
const router=express.Router();
const {
    mostrarProductos,
    agregarProductos,
    modificarProducto,
    eliminarProducto,
    existeProducto } = require("../models/productos.models")
    router.use(express.json());

//mostrar producto
router.get('/mostrar', (req,res) => { res.json(mostrarProductos())});
console.log();

//agregar producto
router.post('/crear', (req,res) =>{
    const  {nombre,precio} = req.body;
    const precioNumero = parseFloat(precio);
    if (nombre && precioNumero != NaN) {
       const  productoVerificado = mostrarProductos().find(u => u.nombre == nombre)
       if (!productoVerificado) {
           agregarProductos(nombre,precioNumero);
           res.sendStatus(201);
       }else{
        res.status(400).json({err: "El producto ya existe"});
       }
    }else{
        res.sendStatus(400);
    }
}
)

//Actualizar productos
router.put('/actualizar/:id', (req,res) =>{
    const idProducto = req.params.id;
    const  {nombre,precio} = req.body;
    if (parseInt(idProducto)!=NaN ) {
        const productoExistente = mostrarProductos().findIndex(p => p.id==idProducto);
        if (productoExistente >= 0) {
            modificarProducto(idProducto,nombre,precio);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(400);
    }
   
}
)

//Eliminar productos

router.delete('/eliminar/:id', (req,res) =>{
    const idProducto = req.params.id;
    if (parseInt(idProducto)!=NaN ) {
        const productoExistente = mostrarProductos().findIndex(p => p.id==idProducto);
        if (productoExistente >= 0) {
            eliminarProducto(idProducto);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(400);
    }
    
})



module.exports = router;
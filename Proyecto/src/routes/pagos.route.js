const express = require("express");
const router=express.Router();
const esAdministrador = require("../middlewares/EsAdmin.middleware");
const {mostrarMedios,
    agregarMedioPago,
    eliminarMedioPago,
    nombreMedioPago
} = require('../models/pagos.models')

router.use(express.json());

router.get('/mostrar', (req,res) => { res.json(mostrarMedios())});

router.post('/agregar', esAdministrador, (req,res) =>{
    const  {id,nombre} = req.body;
    const  verificarmedio = mostrarMedios().find(u => u.nombre == nombre);
    if(!verificarmedio){
    res.json(agregarMedioPago(id,nombre))
    }else{
        res.status(400).json({err: "El medio ya existe"});
    }
} );

router.delete('/eliminar/:id', esAdministrador, (req,res) =>{
    const  idMedioPago = req.params.id;
    const  verificarmedio = mostrarMedios().find(u => u.id == idMedioPago)
    if(verificarmedio){
        res.json(eliminarMedioPago(idMedioPago))
        }else{
            res.status(400)
        }
    } );


module.exports = router;

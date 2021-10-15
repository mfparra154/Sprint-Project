const express = require("express");
const router=express.Router();
const esAdministrador = require("../middlewares/EsAdmin.middleware");
const {mostrarMediosPago, crearMediosPago , eliminarMediosPago} = require("../Controllers/pagos.controller")
const {validatePagoPost} = require("../middlewares/ValidarPost");

router.use(express.json());

router.get('/mostrar', mostrarMediosPago);

router.post('/agregar',esAdministrador, validatePagoPost, crearMediosPago );

router.delete('/eliminar/:id', esAdministrador,  eliminarMediosPago  )


module.exports = router;

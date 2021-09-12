const express = require("express");
const router=express.Router();
const esAdministrador = require("../middlewares/EsAdmin.middleware");
const {mostrarMediosPago, crearMediosPago , eliminarMediosPago} = require("../Controllers/pagos.controller")
const {validatePagoPost} = require("../middlewares/ValidarPost");

router.use(express.json());

router.get('/mostrar', mostrarMediosPago);

router.post('/agregar', validatePagoPost, crearMediosPago );

router.delete('/eliminar/:id', eliminarMediosPago  )


module.exports = router;

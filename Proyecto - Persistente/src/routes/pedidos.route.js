const express = require("express");
const router = express.Router();
const esAdministrador = require("../middlewares/EsAdmin.middleware");
const { obtenerPedidos, crearPedido, actualizarPedido, actualizarEstadoPedido, confirmarPedido, eliminarPedido} = require("../Controllers/pedidos.controller")
const {validatePedidoPost} = require("../middlewares/ValidarPost")



router.get('/mostrar', esAdministrador, obtenerPedidos);


router.post('/crear', validatePedidoPost, crearPedido)

router.put('/actualizar', actualizarPedido )

//Modificar estados del pedido por parte de admin
router.put('/actualizar/:id', esAdministrador, actualizarEstadoPedido)

router.put('/confirmar', esAdministrador, confirmarPedido)

router.delete('/eliminar/:id', eliminarPedido)





module.exports = router;
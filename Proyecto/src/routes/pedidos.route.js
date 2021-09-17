const express = require("express");
const router = express.Router();
const esAdministrador = require("../middlewares/EsAdmin.middleware");
const { mostrarPedidos,
    agregarPedidos,
    modificarPedidos,
    eliminarPedidos,
    estadoPedido,
    ordenPendiente,
    modificarListaProductos,
    precioTotal } = require("../models/pedidos.models");


const { usuarioUsuarios } = require("../models/usuario.model")
const { nombreMedioPago } = require("../models/pagos.models")


router.use(express.json());

//mostrar pedidos
router.get('/mostrar', esAdministrador, (req, res) => { res.json(mostrarPedidos()) });


//agregarpedido,  
router.post('/crear', (req, res) => {
    const { productos } = req.body;
    const usuario1 = req.auth.user
    const infoUsuario = usuarioUsuarios(usuario1);
    const { id, usuario, direccion } = infoUsuario;
    const productosPedido = modificarListaProductos(productos);
    agregarPedidos(id, productosPedido, usuario, direccion, "efectivo", "Pendiente", precioTotal(productosPedido));
    res.status(200).json({ mensaje: "Pedido creado" });
})



router.put('/actualizar', (req, res) => {
    const usuario1 = req.auth.user
    const infoUsuario = usuarioUsuarios(usuario1);
    const { usuario } = infoUsuario;
    if (ordenPendiente(usuario)) {
        const { productos, direccion, idMedioPago } = req.body;
        const productosPedido = modificarListaProductos(productos);
        const MedioPago = nombreMedioPago(idMedioPago);

        modificarPedidos(ordenPendiente(usuario), productosPedido, direccion, MedioPago, precioTotal(productosPedido));

        res.json(ordenPendiente(usuario))

    } else {
        res.sendStatus(404)

    }
})


//Modificar estados del pedido por parte de admin
router.put('/actualizar/:id', esAdministrador, (req, res) => {
    const id = req.params.id;
    const estado = req.body.estado;
    const pedido = mostrarPedidos().findIndex(p => p.id == id)
    if (pedido) {
        if (estado == "Pendiente" || estado == "Confirmado" || estado == "Preparando" || estado == "Enviado"
            || estado == "Entregado") {
            res.json(estadoPedido(id, estado))
        } else {
            res.status(400).json({ err: 'Pedido no encontrado' })
        }
    } else {
        res.sendStatus(404)
    }
})

router.put('/actualizar/confirmar', (req, res) => {
    const usuario = req.auth.user;
    const infoUsuario = usuarioUsuarios(usuario);
    if (ordenPendiente(infoUsuario)) {
        ordenPendiente(infoUsuario).estado = "Confirmado";
        res.json({ mensaje: "Pedido confirmado" });

    } else {

    }

})


//eliminar pedido


router.delete('/eliminar/:id', (req, res) => {
    const id = req.params.id;
    if (parseInt(id) != NaN) {
        const pedidoExistente = mostrarPedidos().findIndex(p => p.id == id);
        if (pedidoExistente) {
            eliminarPedidos(id);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(400);
    }





})





module.exports = router;
const express = require("express");
const router=express.Router();
const esAdministrador = require("../middlewares/EsAdmin.middleware");
const{mostrarPedidos,
    agregarPedidos,
    modificarPedidos,
    eliminarPedidos,
    estadoPedido,
    ordenPendiente,
    modificarListaProductos,
    precioTotal } = require("../models/pedidos.models");

const { mostrarProductos,existeProducto,obtenerProducto } = require("../models/productos.models"); 
const {mostrarUsuarios, usuarioUsuarios} = require("../models/usuario.model")
const { nombreMedioPago }= require("../models/pagos.models")


router.use(express.json());

//mostrar pedidos
router.get('/mostrar',esAdministrador,(req,res )=>{res.json(mostrarPedidos())});


//mostrar pedido usuario
router.get('/mipedido',(req,res) =>{
    const email = req.auth.user;
    res.json(mostrarPedidos().filter(o => o.email === email))

})
//agregarpedido,  
router.post('/crear', (req,res) =>{
    const {productos}=req.body;
    console.log(req.body);
    const usuario = req.auth.user
    console.log(req.auth.user);
    const infoUsuario = usuarioUsuarios(usuario);
    const {id,email,direccion} = infoUsuario;
    const productosPedido = modificarListaProductos(productos);
    agregarPedidos(id,productosPedido,email,direccion,"efectivo","Pendiente",precioTotal(productosPedido));
    res.json({mensaje:"Pedido creado"});
    })

    

router.put('/actualizar', (req,res) =>{
    const usuario = req.auth.user
    const infoUsuario = usuarioUsuarios(usuario);
    const {email} = infoUsuario;
    if (ordenPendiente(email)) {
        const {productos,direccion,idMedioPago}=req.body;
        const productosPedido = modificarListaProductos(productos);
        const MedioPago = nombreMedioPago(idMedioPago);

        modificarPedidos(ordenPendiente(email),productosPedido,direccion,MedioPago, precioTotal(productosPedido));
        
       res.json(ordenPendiente(email))
        
    }else{
        res.sendStatus(404)

    }
})


//Modificar estados del pedido por parte de admin
router.put('/actualizar/:id/estado',esAdministrador, (req,res) =>{
    const idPedido = req.params.id;
    const  estado = req.body.estado;
    const pedido = mostrarPedidos().findIndex(p => p.id==id)
    if (pedido) {if(estado == "Pendiente" || estado == "Confirmado" || estado == "Preparando" || estado == "Enviado" 
    || estado == "entregado"){
        res.json(estadoPedido(id,estado))
    }else{
        res.status(400).json({err:'Estado no encontrado'})
    }}else{
        res.sendStatus(404)
    }  
})

router.put('/actualizar/confirmar',(req,res) =>{
    const usuario = req.auth.user;
    const infoUsuario = usuarioUsuarios(usuario);
    const {email} = infoUsuario;
    if (ordenPendiente(email)) {

        ordenPendiente(email).estado = "Confirmado";

       res.json({mensaje: "Pedido confirmado"});
        
    }else{

        res.sendStatus(404);

    }

})


    //eliminar pedido


    router.delete('/eliminar/:id', (req,res) =>{
        const id = req.params.id;
        if (parseInt(id)!=NaN ) {
            const pedidoExistente = mostrarPedidos().findIndex(p => p.id==id);
            if (pedidoExistente) {
                eliminarPedidos(id);
                res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(400);
        }
        




    } )
    




module.exports = router;
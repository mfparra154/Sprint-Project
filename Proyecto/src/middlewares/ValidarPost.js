const schemaRegistro = require("../Schema/registro.schema");
const schemaLogin = require("../Schema/login.schema");
const schemaProducto = require("../Schema/producto.schema");
const schemaPago = require("../Schema/pago.schema");
const schemaPedido = require("../Schema/pedido.schema")

async function validateRegisterPost(req,res,next){
    try{
        await schemaRegistro.validateAsync(req.body);
        next();
    }
    catch (error){
        console.log(error);
        res.status(400).json({
            code: "400",
            message: error.details[0].message
        })
    }
}

async function validateLoginPost(req,res,next){
    try{
        await schemaLogin.validateAsync(req.body);
        next();
    }catch (error){
        console.log(error);
        res.status(400).json({
            code: "400",
            message: error.details[0].message
        })
    }
}

async function validateProductPost(req,res,next){
    try{
        await schemaProducto.validateAsync(req.body);
        next();
    }catch (error){
        console.log(error);
        res.status(400).json({
            code: "400",
            message: error.details[0].message
        })
    }
}

async function validatePagoPost(req,res,next){
    try{
        await schemaPago.validateAsync(req.body);
        next();
    }catch (error){
        console.log(error);
        res.status(400).json({
            code: "400",
            message: error.details[0].message
        })
    }
}

async function validatePedidoPost(req,res,next){
    try{
        await schemaPedido.validateAsync(req.body);
        next();
    }catch (error){
        console.log(error);
        res.status(400).json({
            code: "400",
            message: error.details[0].message
        })
    }
}




module.exports = { validateRegisterPost, validateLoginPost, validateProductPost, validatePagoPost, validatePedidoPost }




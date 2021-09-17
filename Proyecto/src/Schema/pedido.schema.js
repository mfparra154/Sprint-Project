const Joi = require('joi');

const schemaPedido = Joi.object({
    nombreProducto: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    precioProducto: Joi.number()
    .min(3)
    .max(30)
    .required(),
    cantidadProducto: Joi.number()
    .min(3)
    .max(30)
    .required(),
    usuario: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    direccion: Joi.string()
        .alphanum()
        .min(3)
        .required(),
    medioPago: Joi.string()
        .min(3)
        .max(30)
        .required(),
    estado:Joi.string()
         .min(3)
         .max(30)
         .required(),
    precioTotal: Joi.number()
         .min(3)
         .max(30)
         .required(),
})

module.exports = schemaPedido
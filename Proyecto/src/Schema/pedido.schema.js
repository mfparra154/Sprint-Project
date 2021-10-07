const Joi = require('joi');

const schemaPedido = Joi.object({
    productos:Joi.array().items(Joi.object({
        idProducto: Joi.string()
        .required()
    })),
    idDireccion: Joi.string()
        .required()
})

module.exports = schemaPedido
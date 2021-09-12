const Joi = require ('joi');

const schemaProducto = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required(),
    precio: Joi.number()
        .positive()
        .required(),
});

module.exports = schemaProducto
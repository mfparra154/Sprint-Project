const Joi = require ('joi');

const schemaPago = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required(),
});

module.exports = schemaPago
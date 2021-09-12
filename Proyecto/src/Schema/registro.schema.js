const Joi = require('joi');

const schemaRegister = Joi.object({
    usuario: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    nombre: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    telefono: Joi.number()
        .required(),
    direccion: Joi.string()
        .alphanum()
        .min(3)
        .required(),
    contrasena: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

module.exports = schemaRegister
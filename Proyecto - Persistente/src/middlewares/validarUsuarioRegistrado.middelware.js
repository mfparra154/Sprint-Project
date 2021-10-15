const Usuario = require ("../models/usuario.model")

async function validarUsuarioRegistrado(req,res,next){
    const {email, usuario} = req.body;
    const validarEmail = await Usuario.findOne({email});
    const validarUsuario = await Usuario.findOne({usuario})
    if(validarEmail || validarUsuario){
        res.status(400).json("El usuario ya se encuentra registrado")
    }else{
        next()
    }

}

module.exports = validarUsuarioRegistrado
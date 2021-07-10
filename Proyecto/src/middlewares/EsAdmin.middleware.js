const basicAuth = require('express-basic-auth');
const { mostrarUsuarios  } = require('../models/usuario.model');

const esAdministrador = (req,res,next) => {
    const listaUsuarios = mostrarUsuarios();
    const usuario = listaUsuarios.find(u  => u.usuario === req.auth.user);

    if(usuario){
        if (usuario.admin) {
            next();
        }else{
            res.status(401).json(mensaje="Usted no es Administrador");
        }
    }else{
        res.estatus(401).json('Usted no es Administrador');
    }

}

module.exports = esAdministrador;
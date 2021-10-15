const usuarios = require("../models/usuario.model")

const esAdministrador = async (req,res,next) => {
    const email = req.user.email
    const {admin} = await usuarios.findOne({email})
    if(admin){
        next()
    }else{
        res.status(403).json("no es administrador")
    }

}

module.exports = esAdministrador;
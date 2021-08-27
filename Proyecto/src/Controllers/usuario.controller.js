const usuarios = require("../models/usuario.model")

const crearUsuarios = async (req,res) =>{
    const {email,contrasena,nombre,usuario,telefono,direccion} = req.body;
    const existeUsuario = await usuarios.findOne({usuario});
    if(existeUsuario){
        res.status(400).json("Usuario ya registrado")
    } else{
        const nuevoUsuario = new usuarios({email,contrasena,nombre,usuario,telefono,direccion});
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario)
    }
}

const login = async (req,res) =>{
    const {email,contrasena} = req.body;
    
}



module.exports = {crearUsuarios}

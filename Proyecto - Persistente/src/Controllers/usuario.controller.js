const usuarios = require("../models/usuario.model")
const loginSchema = require("../Schema/login.schema")
const bcrypt = require("bcrypt");
const config = require("../utils/config")
const jwt = require("jsonwebtoken")


async function traerUsuario(email) {
     return await usuarios.findOne({email})
    
}

const crearUsuarios = async (req,res) => {
    try{
        const {email,contrasena,nombre,usuario,telefono,direccion} = req.body;
        const nuevoUsuario = new usuarios({
            email,
            contrasena: bcrypt.hashSync(contrasena, parseInt(process.env.SALT_ROUNDS)),
            nombre,
            usuario,
            telefono
        });
        console.log(nuevoUsuario);
        nuevoUsuario.direcciones.push({direccion})
        await nuevoUsuario.save();
        res.status(201).json("El usuario ha sido añadido")
    } catch (e){
        res.status(500).json("Ha ocurrido un error")
      
    }
    
}

const anadirDireccion = async (req,res) => {
    try{
        const idUsuario = req.params.id;
        const direccion = req.body;
        const Usuario =  await usuarios.findById(idUsuario);
        Usuario.direcciones.push(direccion)
        await Usuario.save();
        console.log(Usuario);
        res.status(201).json("La direccion ha sido añadida")
    } catch (e){
        res.status(500).json("Ha ocurrido un error")
    }
}



const loginUsuarios = async (req,res) =>{
    const {email,contrasena} = req.body;
    try {
        const {
            contrasena: contrasenaUsuario,
        } = await usuarios.findOne({ email });

        const resultado = bcrypt.compareSync(contrasena, contrasenaUsuario);
        if (resultado) {
            const token = jwt.sign({
                email
            }, config.contrasenia, {
                expiresIn: 60 * 60 *24
            });
            res.status(200).json({auth: true, token });
        } else {
            res.status(401).json('Unauthorized');
        }
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

const obtenerUsuarios = async (req,res) =>{
    try{
        const listaUsuarios = await usuarios.find()
        res.json(listaUsuarios)
    }catch (error){
        res.status(404).json(error);

    }
}



module.exports = {crearUsuarios, loginUsuarios, obtenerUsuarios , anadirDireccion, traerUsuario}

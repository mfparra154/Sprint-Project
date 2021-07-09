const express = require("express");
const app=express();
app.use(express.json());


const Usuarios = [
    {
        id: 1,
        email: "admin@gmail.com" ,
        contrasena: "123456",
        nombre: "Admin",
        usuario: "Admin",
        telefono: "3182612440",
        direccion: "Dabeiba",
        admin: true
    },
    {
        id:2,
        email: "mf.parra154@gmail.com" ,
        contrasena: "12345678",
        nombre: "Mafe",
        usuario: "Mafe",
        telefono: "555555",
        direccion: "Girardot",
        admin: false
    }
    ];

    function mostrarUsuarios() {
        return Usuarios;
    }

    function crearUsuarios (email,contrasena,nombre,usuario,telefono,direccion) {
        const id = Date.now();
        const nuevoUsuario = {id,email,contrasena,nombre,usuario,telefono,direccion,admin:false}
        Usuarios.push(nuevoUsuario);

        
    }

    function usuarioUsuarios(usuario) {
        return Usuarios.find(u => u.usuario === usuario);
        
    }
    
   


//verificar si el usuario existe
//Verificar si el correo existe
//Verificar si lo que envia esta correcto(esten completos los campos)




module.exports = {
    mostrarUsuarios,
    crearUsuarios,
    usuarioUsuarios

};
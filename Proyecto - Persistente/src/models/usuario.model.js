const express = require("express");
const app=express();
app.use(express.json());
const  mongoose  = require("mongoose");


const direccionSchema = new mongoose.Schema({
    direccion: {
        type: String,
        required: true
    }
});
const UsuarioSchema =  new mongoose.Schema ({

        email: {
            type:String,
            required: true
        } ,
        contrasena: {
            type:String,
            required: true
        },
        nombre: {
            type:String,
            required: true
        },
        usuario: {
            type:String,
            required: true
        },
        telefono: {
            type: Number,
            required: true
        },
        direcciones: [direccionSchema],
        admin: {
            type:Boolean,
            default: false
        },
        isActive: {
            type:Boolean,
            default: true
        },
    });


module.exports = mongoose.model('usuarios', UsuarioSchema);
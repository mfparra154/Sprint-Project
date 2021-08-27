const express = require("express");
const app=express();
app.use(express.json());
const  mongoose  = require("mongoose");

const ProductosSchema =  new mongoose.Schema(
    {
    nombre: {
        type:String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },

    });



module.exports = mongoose.model('productos', ProductosSchema);






const express = require("express");
const app=express();
app.use(express.json());
const  mongoose  = require("mongoose");



const PagosSchema =  new mongoose.Schema(
    {
    nombre: {
        type:String,
        required: true
    }
    });




module.exports = mongoose.model('mediosPago', PagosSchema)



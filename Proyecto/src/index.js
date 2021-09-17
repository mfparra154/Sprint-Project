//const dotenv = require('dotenv').config();
const config = require("./utils/config")

require('./utils/db');

const express = require("express");
const helmet = require ('helmet');
const mongoose = require ('mongoose');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const  {verificacion, errorMiddleware } = require("./middlewares/verificacion.middleware");


const swaggeroptions = require("./utils/swaggeroptions");

const rutaProductos = require("./routes/productos.route");
const rutaPagos = require("./routes/pagos.route");
const rutaPedidos = require("./routes/pedidos.route");
const rutaUsuarios =require("./routes/usuarios.route")

const app=express();
app.use(express.json());
app.use(helmet());
const PORT = config.Puerto || 3000;


const swaggerSpecs = swaggerJsDoc(swaggeroptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))



app.use('/usuarios',rutaUsuarios);
app.use(verificacion,errorMiddleware)
app.use('/productos',rutaProductos);
app.use('/pagos',rutaPagos);
app.use('/pedidos',rutaPedidos);



app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000");
});

module.exports = app;

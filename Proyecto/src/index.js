const express = require("express");
const mongoose = require ('mongoose');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");



const swaggeroptions = require("./utils/swaggeroptions");

//const basicAuth = require('express-basic-auth');

//const verificacion = require("./middlewares/verificacion.middleware");
const rutaProductos = require("./routes/productos.route");
const rutaPagos = require("./routes/pagos.route");
const rutaPedidos = require("./routes/pedidos.route");
const rutaUsuarios =require("./routes/usuario.route")
const app=express();
require('../src/utils/db');

const swaggerSpecs = swaggerJsDoc(swaggeroptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

app.use(express.json());




app.use('/usuarios',rutaUsuarios);
//app.use(basicAuth({authorizer: verificacion }));
app.use('/productos',rutaProductos);
app.use('/pagos',rutaPagos);
app.use('/pedidos',rutaPedidos);



app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000");
});

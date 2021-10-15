const  mongoose  = require("mongoose");

const ProductosPedidoSchema =  new mongoose.Schema(
    {
    nombre: {
        type:String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }

    });

    const PedidosSchema =  new mongoose.Schema({
        productos: [ProductosPedidoSchema],
        usuario: {
            type:String,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        medioPago: {
            type: String,
            required: false

        },
        estado: {
            type: String,
            required: true
        },
        precioTotal: {
            type: Number,
            required: true
        },
    })






module.exports = mongoose.model(' Pedidos', PedidosSchema )

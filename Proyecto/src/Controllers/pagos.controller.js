const MediosPago = require("../models/pagos.models")

const mostrarMediosPago = async (req,res) => {
    const MediosPago = await mediosPago.find();
    res.json(MediosPago)
};

const crearMediosPago = async (req,res) => {
    const  {nombre} = req.body;
    const verificarExistenciaMedio = await  MediosPago.findOne ({nombre})
    if(!verificarmedio){
        const nuevoMedioPago = new MediosPago ({nombre});
        await nuevoMedioPago.save()
    } else{
        res.sendStatus(400).json('El medio de pago ya existe')
    } }

const eliminarMediosPago = async (req,res) => {
    const idMedioPago = req.params.id;
    const verificarMedio = await MediosPago.findById({idMedioPago})
    if (verificarMedio){
        verificarMedio.delete();
        res.json("El medio de Pago ha sido eliminado")
    }else{
        res.sendStatus(400).json('Medio de pago no encontrado');
    }
}





module.exports = {mostrarMediosPago , crearMediosPago, eliminarMediosPago}


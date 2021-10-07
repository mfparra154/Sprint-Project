const mediosPago = require("../models/pagos.models")



async function nombreMedioPago(idMedioPago) {
    //console.log(idMedioPago);
    const medioPago =  await mediosPago.findById(idMedioPago)
   // console.log(medioPago);
    await medioPago.save()
    return medioPago.nombre
    
}

const mostrarMediosPago = async (req,res) => {
    try{
    const MediosPago = await mediosPago.find();
    res.status(201).json(MediosPago);
    }
    catch (e){
        const error = res.status(500).json("Ha ocurrido un error")
        console.log(error);
    }
};

const crearMediosPago = async (req,res) => {
    try{
    const  {nombre} = req.body;
    const verificarExistenciaMedio = await  mediosPago.findOne ({nombre})
    if(!verificarExistenciaMedio){
        const nuevoMedioPago = new mediosPago ({nombre});
        await nuevoMedioPago.save()
        res.status(201).json('Medio de pago creado');
    } else{
        res.status(400).json('El medio de pago ya existe')
    } 
    } catch (e){
        res.status(500).json("Ha ocurrido un error")
        console.log(e);
    }

}

const eliminarMediosPago = async (req,res) => {
    try{
        const idMedioPago = req.params.id;
        const verificarMedio = await mediosPago.findById(idMedioPago)
        if (verificarMedio){
        await verificarMedio.delete();
        res.json("El medio de Pago ha sido eliminado")
        }else{
        res.status(400).json('Medio de pago no encontrado');
        }
    }  catch (e){
        res.status(500).json("Ha ocurrido un error")
        console.log(e);
    } 
}





module.exports = {mostrarMediosPago , crearMediosPago, eliminarMediosPago, nombreMedioPago}


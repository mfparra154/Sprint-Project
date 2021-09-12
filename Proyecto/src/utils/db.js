const mongoose = require ('mongoose');
//const config = require('./config')


(async  () => {
  try{
    const config = require('./config');
    await mongoose.connect(config.ConeccionDB, 
    {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Conectada a la base de datos");
  } catch (error){
    console.error ("No se conecto a la BD")
  }
   

})();
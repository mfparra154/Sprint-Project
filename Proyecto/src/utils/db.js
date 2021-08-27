const mongoose = require ('mongoose');

(async () => {
    await mongoose.connect('mongodb://localhost:27017/acamica2' , 
  {useNewUrlParser: true, useUnifiedTopology: true});

  console.log("Conectado a la BD");
})();
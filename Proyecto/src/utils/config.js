require('dotenv').config();

module.exports = {
    Contrasenia: process.env.SECRETPASSWORD,
    Puerto: process.env.PORT,
    ConeccionDB: process.env.DBCONECCION,
    Redis: process.env.PORTREDIS
    

};


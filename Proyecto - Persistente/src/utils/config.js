const { config } = require('dotenv');

config();

exports.module = {
    contrasenia: process.env.SECRETPASSWORD,
    Puerto: process.env.PORT,
    ConeccionDB: process.env.DBCONECCION,
    Redis: process.env.PORTREDIS
    

};



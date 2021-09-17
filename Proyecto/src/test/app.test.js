const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require("../index");
const Usuario = require("../models/usuario.model")


chai.should();
chai.use(chaiHttp);

describe('Registro de usuario', () => {
    /**
     * Test registro de usuario
     */
    describe('POST/registrar de forma exitosa', () => {
        it('Debe devolver un 200 en status', (done) => {
            const  newUsuario = {
                "email": "test@test.com",
                "contrasena": "test",
                "nombre":  "test",
                "usuario": "test",
                "telefono": 1111111,
                "direccion": "test"
    
            };
            chai.request(app)
                .post('/usuarios/registro')
                .send(newUsuario)
                .end((err,response) => {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done();
                });
        })

        after ( async () => {
             await Usuario.deleteOne(email ='test@test.com');
        });
    });
});

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
        it('Debe devolver un 201 en status', (done) => {
            const  newUsuario = {
                "email": "test@test.com",
                "contrasena": "Test123",
                "nombre":  "testMario",
                "usuario": "testMaria",
                "telefono": "1111111",
                "direccion": "test",
    
            };
            chai.request(app)
                .post('/usuarios/registro')
                .send(newUsuario)
                .end((err,response) => {
                    response.should.have.status(201);
                    response.should.be.an('object');
                    done();
                });
        })

        after ( async () => {
             await Usuario.deleteOne({email :'test@test.com'});
       }
       );
});

const swaggeroptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Delilah Restó - Persistente",
            description: "Aplicación web para domicilios en el delilah restó",
            version: "0.0.1"
        },

        servers: [{
            url: "http://localhost:3000",
            description: "Servidor local",
        }],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                Usuario:
                {
                    type: "object",
                    required: [
                        "email",
                        "contrasena",
                        "nombre",
                        "usuario",
                        "telefono",
                        "direccion"
                    ],
                    properties: {
                        email: {
                            type: "string"
                        },
                        contrasena: {
                            type: "string",
                            format: "password"
                        },
                        nombre: {
                            type: "string"
                        },
                        usuario: {
                            type: "string"
                        },
                        telefono: {
                            type: "string"
                        },
                        direcciones: {
                            type: "string"
                        },
                        admin: {
                            type: "boolean"
                        },
                        isActive: {
                            type: "boolean"
                        } 
                    }
                },
                Producto:
                {
                    type: "object",
                    properties: {
                        nombre: {
                            type: "string"
                        },
                        precio: {
                            type: "number",
                        },
                    }
                },
                MediosPago:
                {
                    type: "object",
                    properties: {
                        id: {
                            type: "number",
                        },
                        nombre: {
                            type: "string",
                        },
                    }
                },
                Pedidos:
                {
                    type: "object",
                    properties: {
                        id: {
                            type: "number",
                        },
                        productos: {
                            type: "array",
                            items: 
                            {$ref: '#/components/schemas/Pedidos'}
                        },
                        email: {
                            type: "string"
                        },
                        direccion: {
                            type: "string"
                        },
                        //medioPago:{
                           // type: "string"
                       // },
                        //precioTotal:{
                        //    type: "number"
                       // }


                    }
                }

            }
        },
        security: [{
            bearerAuth: []
        }],
        tags: [{
            name: "Usuarios",
            description: "Ruta de registro y login de usuarios",
        },
        {
            name: "Productos",
            description: "Ruta de productos ofrecidos por el delilah Restó",
        },
        {
            name: "MediosPago",
            description: "Ruta de medios de Pago",
        },
        {
            name: "Pedidos",
            description: "Ruta para realizar pedidos al restaurante ",
        }],
        paths: {
            "/usuarios/registro": {
                post:
                {
                    tags: ["Usuarios"],
                    security: [],
                    summary: "Registro de un usuario nuevo",
                    description: "Registro de un usuario nuevo",
                    requestBody: {
                        description: "datos del usuario",
                        required: "true",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/Usuario'
                                },
                                examples: {
                                    "ejemplo 1": {
                                        value: {
                                            email: "Margarita@gmail.com",
                                            contrasena: "11010220298",
                                            nombre: "MaiaMargothToro",
                                            usuario: "Margoth",
                                            telefono: "3133855073",
                                            direccion: "Girardot"

                                        }
                                    }
                                }
                            }
                        }
                    },
                    
                    responses: {
                        "200": {
                            description: "Usuario creado",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            mensaje: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }



                        },
                        "400": {
                            description: "Credenciales incorrectas",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            err: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }



                        }


                    }


                }
            },
            "/usuarios/anadirdirecciones/{id}": {
                post:
                {
                    tags: ["Usuarios"],
                    security: [],
                    summary: "Registro de una direccion a la libreta de direcciones",
                    description: "Registro de una direccion a la libreta de direcciones",
                    requestBody: {
                        description: "direccion nueva",
                        required: "true",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/Usuario'
                                },
                                examples: {
                                    "ejemplo 1": {
                                        value: {
                                            direccion: "ManzanaBCasa8"

                                        }
                                    }
                                }
                            }
                        }
                    },
                    
                    responses: {
                        "201": {
                            description: "La direccion ha sido añadida",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            mensaje: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }



                        },
                        "500": {
                            description: "Ha ocurrido un error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            err: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }



                        }


                    }


                }
            },
            "/usuarios/login": {
                post:
                {
                    tags: ["Usuarios"],
                    security: [],
                    summary: "Ingreso del usuario a la plataforma",
                    description: "Ingreso del usuario a la plataforma",
                    requestBody: {
                        description: "email y contrasena del usuario",
                        required: "true",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/Usuario'
                                },
                                examples: {
                                    "ejemplo 1": {
                                        value: {
                                            email: "mafe@gmail.com",
                                            contrasena: "123456",

                                        }
                                    }
                                }
                            }
                        }
                    },
                    
                    responses: {
                        "200": {
                            description: "Usuario logueado",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            mensaje: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }



                        },
                         "400": {
                            description: "Credenciales incorrectas",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            err: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }

                        },
                        "400": {
                            description: "Credenciales incorrectas",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            err: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }

                        },
                        "400": {
                            description: "La contraseña o el correo son incorrectos",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            err: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }

                        },
                        "404": {
                            description: "No encontrado",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            err: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }

                        }



                    }


                }
            },
            "/productos/mostrar":{
                get:
                {
                    tags: ["Productos"],
                    summary: "Mostrar la lista de productos",
                    description: "Listado de todos los platos ofrecidos por el resturante",
                    responses: {
                        "200": {
                            description: "Productos disponibles",
                        },
                        "401": {
                            description: "Solo disponible para usuarios logueados",

                        }
                    }


                }
            },
            "/productos/crear": {
               post:
               {
                tags: ["Productos"],
                summary: "Agregar un producto",
                description: "Agregar un producto",
                requestBody: {
                    description: "datos del producto",
                    required: "true",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/Producto'
                            },
                            examples: {
                                "ejemplo 1": {
                                    value: {
                                        nombre: "cuchuco con espinazo",
                                        precio: "25000"

                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Producto creado",
                    },
                    "400": {
                        description: "Datos incorrectos",

                    },
                    "401": {
                        description: "No esta autorizado",

                    },
                    "403": {
                        description: "No tiene los permisos",

                    }


                } 
               }

            },
            "/productos/actualizar/{id}": {
                put:
                {
                    tags: ["Productos"],
                    summary: "Modificacion de un producto",
                    description: "Modificacion de un producto",
                    parameters:[
                        {
                            name: "id",
                            in: "path",
                            description: "id de producto",
                            required: "true",
                            schema:{
                                type: "number"
                            },
                            example : "1"

                        }
                    ],
                    requestBody: {
                        description: "datos del producto",
                        required: "true",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/Producto'
                                },
                                examples: {
                                    "ejemplo 1": {
                                        value: {
                                            nombre: "Sancocho de Gallina",
                                            precio: "32000"

                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Producto actualizado",
                        },
                        "400": {
                            description: "Datos incorrectos",

                        },
                        "404": {
                            description: "Producto no encontrado",

                        },
                        "401": {
                            description: "No esta autorizado",

                        },
                        "403": {
                            description: "No tiene los permisos",
                        }
                    }
                }
            },"/productos/eliminar/{id}":{
                delete:{
                    tags: ["Productos"],
                    summary: "Eliminación de un producto",
                    description: "Eliminar  un producto",
                    parameters:[
                        {
                            name: "id",
                            in: "path",
                            description: "id de producto",
                            required: "true",
                            schema:{
                                type: "number"
                            },
                            example : "1"

                        }
                    ],
                    responses: {
                        "200": {
                            description: "Producto eliminado",
                        },
                        "400": {
                            description: "id no encontrado",

                        },
                        "404": {
                            description: "Producto no eliminado",

                        },
                        "401": {
                            description: "No esta autorizado",

                        },
                        "403": {
                            description: "No tiene los permisos",
                        }
                    }
                }
            },
            "/pagos/mostrar":{
                get:
                {
                    tags: ["MediosPago"],
                    summary: "Mostrar la lista de medios de pago",
                    description: "Listado de los medios de pago ofrecidos por el restaurante",
                    responses: {
                        "200": {
                            description: "Medios de pago disponibles",
                        },
                        "401": {
                            description: "Solo disponible para usuarios logueados",

                        }
                    }
                }
            },
            "/pagos/agregar":{
                post:
                {
                tags: ["MediosPago"],
                summary: "Agregar un medio de pago",
                description: "Agregar un medio de pago",
                requestBody: {
                    description: "datos del medio de pago",
                    required: "true",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/MediosPago'
                            },
                            examples: {
                                "ejemplo 1": {
                                    value: {
                                        nombre: "pse"

                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Medio creado",
                    },
                    "400": {
                        description: "Datos incorrectos",

                    },
                    "401": {
                        description: "No esta autorizado",

                    },
                    "403": {
                        description: "No tiene los permisos",

                    }


                } 
                }
            },
            "/pagos/eliminar/{id}":{
                delete:
                {
                    tags: ["MediosPago"],
                    summary: "Eliminación de un medio de pago",
                    description: "Eliminación de un medio de pago",
                    parameters:[
                        {
                            name: "id",
                            in: "path",
                            description: "id del medio de pago",
                            required: "true",
                            schema:{
                                type: "number"
                            },
                            example : "1"

                        }
                    ],
                    responses: {
                        "200": {
                            description: "Medio de pago eliminado",
                        },
                        "400": {
                            description: "id no encontrado",

                        },
                        "404": {
                            description: "Medio de pago no eliminado",

                        },
                        "401": {
                            description: "No esta autorizado",

                        },
                        "403": {
                            description: "No tiene los permisos",
                        }
                    }
                }
            },
            "/pedidos/mostrar":{
                get:
                {
                    tags: ["Pedidos"],
                    summary: "Mostrar la lista de pedido",
                    description: "Listado de los pedidos",
                    responses: {
                        "200": {
                            description: "Lista de pedidos",
                        },
                        "400": {
                            description: "No se puede mostrar la lista de pedidos",
                        },
                        "401": {
                            description: "No esta autorizado",
    
                        },
                        "403": {
                            description: "No tiene los permisos",
    
                        }
                    
                    }
                }
            },
            "/pedidos/crear":
            {
                post:
                {
                    tags: ["Pedidos"],
                    summary: "Creación de un pedido por parte del usuario",
                    description: "Creación de un pedido por parte del usuario",
                    requestBody: {
                        description: "datos de los productos y el usuario",
                        required: "true",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/Pedidos'
                                },
                                examples: {
                                    "ejemplo 1": {
                                        value: {
                                            productos: [{id: "613e4b4e57fcf5281040effe" },
                                                 {id: "613e4c4d0afd151360f3aad8" } ],
                                            idDireccion: "613e8199259a2937a4e317a5"

                                        }
                                    }
                                }
                            }
                        }
                    },
                    
                    responses: {
                        "200": {
                            description: "Pedido agregado",
                        },
                        "401": {
                            description: "Solo disponible para usuarios logueados",

                        }


                    }

 
                }
            },
            "/pedidos/actualizar":{
                put:{
                    tags: ["Pedidos"],
                    summary: "Modificacion del pedido por parte del usuario",
                    description: "Modificacion del pedido por parte del usuario",
                    requestBody: {
                        description: "datos del pedido",
                        required: "true",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/Pedidos'
                                },
                                examples: {
                                    "ejemplo 1": {
                                        value: {
                                            productos: [
                                                {
                                                    idProducto:"613e826fb667b344f8e256b7"
                                                    
                                                },
                                                {
                                                    idProducto:"613e826fb667b344f8e256b7"
                                                }
                                            ],
                                            idDireccion:"613e8199259a2937a4e317a5",
                                            idMedioPago:"6148fa849b3f952a6067c1bc"

                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Pedido actualizado",
                        },
                        "400": {
                            description: "Datos incorrectos",

                        },
                        "404": {
                            description: "Pedido no encontrado",

                        },
                        "401": {
                            description: "No esta autorizado",

                        },
                        "403": {
                            description: "No tiene los permisos",
                        }
                    }
                }

            }, 
            "/pedidos/actualizar/{id}":
            {
                put:{
                    tags: ["Pedidos"],
                    summary: "Modificacion del estado de un pedido por parte del admin",
                    description: "Modificacion del estado de un pedido por parte del admin",
                    parameters:[
                        {
                            name: "id",
                            in: "path",
                            description: "id de pedido",
                            required: "true",
                            schema:{
                                type: "number"
                            },
                            example : "2"

                        }
                    ],
                    requestBody: {
                        description: "datos del producto",
                        required: "true",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/Producto'
                                },
                                examples: {
                                    "ejemplo 1": {
                                        value: {
                                            estado:"Enviado"

                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Pedido actualizado",
                        },
                        "400": {
                            description: "Datos incorrectos",

                        },
                        "404": {
                            description: "Pedido no encontrado",

                        },
                        "401": {
                            description: "No esta autorizado",

                        },
                        "403": {
                            description: "No tiene los permisos",
                        }
                    }
             }
            },"/pedidos/confirmar":{
                put:
                {
                    tags: ["Pedidos"],
                    summary: "Confirmación del pedido por parte del usuario",
                    description: " Confirmacion del pedido por parte del usuario",
                    requestBody: {
                        description: "datos del pedido",
                        required: "true",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/Pedidos'
                                },
                                
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Pedido confirmado",
                        },
                        "400": {
                            description: "Datos incorrectos",

                        },
                        "404": {
                            description: "Pedido no encontrado",

                        },
                        "401": {
                            description: "No esta autorizado",

                        },
                        "403": {
                            description: "No tiene los permisos",
                        }
                    }
                }
            }, "/pedidos/eliminar/{id}":{
                delete:{
                    tags: ["Pedidos"],
                    summary: "Eliminación de un pedido",
                    description: "Eliminación de pedido",
                    parameters:[
                        {
                            name: "id",
                            in: "path",
                            description: "id del medio de pago",
                            required: "true",
                            schema:{
                                type: "number"
                            },
                            example : "2"

                        }
                    ],
                    responses: {
                        "200": {
                            description: "Pedido eliminado",
                        },
                        "400": {
                            description: "id no encontrado",

                        },
                        "404": {
                            description: "Pedido no eliminado",

                        },
                        "401": {
                            description: "No esta autorizado",

                        },
                        "403": {
                            description: "No tiene los permisos",
                        }
                    }
                }

            }




        }





    },
    apis: ["./src/routes/*.js"]
}

module.exports = swaggeroptions;
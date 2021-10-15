const expressJWT = require("express-jwt")
const config = require("../utils/config")

const errorMiddleware = (err,req,res,next) => {
    console.log(err);
    res.status(401).json("Unauthorized")
}

const verificacion = expressJWT({
    secret:config.module.contrasenia,
    algorithms: ["HS256"]
}).unless({
    path:["/usuarios/registro"]
})



module.exports = {verificacion,errorMiddleware}

const expressJWT = require("express-jwt")
const config = require("../utils/config")


const verificacion = expressJWT({
    secret:config.Contrasenia,
    algorithms: ["HS256"]
}).unless({
    path:["/usuarios"]
})

const errorMiddleware = (err,req,res,next) => {
    console.log(err);
    res.status(401).json("Unauthorized")
}

module.exports = {verificacion,errorMiddleware}

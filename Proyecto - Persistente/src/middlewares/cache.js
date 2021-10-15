const redis = require("../utils/redis")

const cacheProductos = (req,res,next) =>{
    try{
    redis.get("productos",(err,data) => {
        if(err) throw err;
        if(data) res.json(JSON.parse(data))
        else next()
    });
    }catch{
        res.status(500)
    }
}



module.exports = cacheProductos

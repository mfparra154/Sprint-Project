const redis = require("redis");
const config = require("../utils/config")

module.exports = redis.createClient(config.redis)

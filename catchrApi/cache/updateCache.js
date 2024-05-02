const cache = require ("./cache")

function updateCache(req, res, next) {
    const cacheKey = req.originalUrl
    if (cache[cacheKey]) {
      cache[cacheKey].lastModified = Date.now();
    }
    next();
}


module.exports =  updateCache

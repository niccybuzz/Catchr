const cache = require ("./cache")

function clearCache(){
    delete cache;
}

module.exports = clearCache
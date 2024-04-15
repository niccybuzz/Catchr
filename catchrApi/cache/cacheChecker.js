const cache = require ("./cache")

//A simple cache system to be used for storing info from GET requests
function cacheChecker(req, res, next) {

    //First, get the url requested by the user
    const cacheKey = req.originalUrl;

    // if that url already exists in the cache
    if (cache[cacheKey]) {
        //Load the cached info into an object
        const cachedItem = cache[cacheKey];
        // get the last modified timestamp for the cached info. If not already modified, set to 0
        const lastModified = cachedItem.lastModified || 0;

        // Get the current date for comparison to last modified
        const lastRequestTimestamp = req.lastRequestTimestamp ||  0

        // Check if cached info has been modified since last request
        if (lastModified && lastModified > lastRequestTimestamp) {
            console.log('Item modified since last request. Deleting cache');
            delete cache[cacheKey]; // Invalidate cache entry
        } else {
            console.log('Data found in cache');
            res.json(cachedItem);
            return; // Exit middleware
        }
    } else {
        console.log("No cached item found")
    }

    // Data not found in cache, proceed to fetch from database
    next();
}

module.exports =  cacheChecker
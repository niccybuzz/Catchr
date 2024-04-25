// Authenticates user using JWT
/**
 * Contral point for verifying a user to use specific areas in the API using JSON web tokens
 * Token is set for the user whenever the successfully logs in with matching credentials
 * This function is called when certain requests are made (such as updating user details, adding new cards, deleting accounts)
 * Upon successfuly validation, the user ID and admin status is added to the request object
 * These details can then be used within the method to validate certain things
 */

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        //Splitting the token here to delineate "Bearer" from the token
        token = token.split(' ')[1];

        //verify the token sent in the headers
        jwt.verify(token, 'pokemonKey', (err, decoded) => {
            if (err) {
                return res.status(401).json('Invalid token');
            }
            console.log("Authenticated")
            // if validated, sets the user's ID and admin status into the req.user field which can now be used elsewhere until the token expires
            req.user = decoded;
            next();
        });
    } else {
        console.log("Not Authenticated")
        res.status(401).json('Token is required');
    }
};

module.exports = authenticateJWT;

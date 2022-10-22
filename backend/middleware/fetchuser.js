const jwt = require('jsonwebtoken'); // This is JSON Web Token We User Sign in We give the User A Token, and When a User Again Login, Token Will be check
const JWT_SECRET = "Anonymouse";     // This is Signture.
// This is Middleware, Basically This is a Function Which have 3 params, We Called next() in middleware, because we want req and res value in next param, In this case the next(), call the next function where we Use fetchuser as a middleware, 
// Its Used in auth.js in 3rd Route as a middleware.

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Please Authenticate using a Valid Token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(token);
        // console.log(data);
        // console.log(data.user);
        req.user = data.user // Here we Set User ID to req.user
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please Authenticate using a Valid Token" })
    }

}

module.exports = fetchuser;
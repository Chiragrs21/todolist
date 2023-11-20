var jwt = require('jsonwebtoken');
const jwt_secret = 'cidyg8fygc8ywfwif'

const fetchuser = ((req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send("Please authenticate user login credentials:")
    }
    try {
        const data = jwt.verify(token, jwt_secret)
        req.collection = data
        next();
    }
    catch {
        res.status(401).json({ "masg": "Please enter the valid token" })
    }

})


module.exports = fetchuser
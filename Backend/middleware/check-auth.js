const jwt = require("jsonwebtoken");

const middleWareJwt = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    }
    catch (error) {
        res.status(401).json({ message: "You Are Not authenticated!" });
    };

}

module.exports = middleWareJwt;
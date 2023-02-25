const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    const header = req.header("authorization");
    if (!header) return res.status(401).send("no token provided");

    token = header.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(400).send("invalid token");
        }
        req.user = decoded;
        next();
    })
}

module.exports = { isAuth };
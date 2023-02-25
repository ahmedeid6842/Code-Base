const jwt = require("jsonwebtoken");

const createAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    })
}

const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })
}

const sendAccessToken = (req, res, accessToken) => { // to send access token in respose
    res.send({
        accessToken,
        email: req.body.email
    })
}

const sendRefreshToken = (res, refreshToken) => { // to send refresh token in response
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/refresh_token" //specify that cookie only send with that endpoint ,, it's for asking a new access token
    })

}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}
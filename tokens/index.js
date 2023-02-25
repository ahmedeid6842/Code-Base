require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./userSchema");
const error = require("./error");
const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } = require("./tokens");
const { isAuth } = require("./isAuth");

const app = express();

//use express middleware for easier cookie handling
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//1. register a user
app.post("/register", async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("user already exists");
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = new User({
        email,
        password
    });
    await user.save();
    return res.send("user created");
})

//2. login a user
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("user doesn't exist");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status.send("password not correct");

    const accesstoken = createAccessToken(user._id);
    const refreshtoken = createRefreshToken(user._id);
    user.refreshToken = refreshtoken;
    await user.save();

    sendRefreshToken(res, refreshtoken);
    sendAccessToken(req, res, accesstoken);
    //send tokens : refreshToken as cookie and accessToken as regular header  

})

//3. logout a user
app.post("/logout", async (req, res) => {
    res.clearCookie("refreshToken", { path: "/refresh_token" }); // clrear refresh token that stored in user
    return res.send("logged out");
})

//4. setup a protected route
app.post("/protected", isAuth, async (req, res) => {
    return res.send("get to protected route");
})

//5. get a new access token with a refresh token
app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(400).send("no refresh token");
    let decoded;
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, decodedd) => {
        if (error) return res.status(400).send("invalid token")
        return decodedd;
    })
    let user = await User.findById(decoded.userId);
    if (!user) return res.status(404).send("user not exists");

    console.log(user);
    if (user.refreshToken !== token) return res.status(400).send("incorrect token");

    const accessToken = createAccessToken(decoded.userId);
    return res.send({ accessToken })

})

app.use(error);
mongoose.connect("mongodb://127.0.0.1:27017/token").then(() => {
    app.listen(process.env.PORT, console.log(`listening on port ${process.env.PORT}`));
})


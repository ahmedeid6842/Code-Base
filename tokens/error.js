module.exports = function (error, req, res,next) {
    console.log(error.message);
    return res.status(500).send("somthing went wrong")
}
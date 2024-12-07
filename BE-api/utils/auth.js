const { User } = require("../models/index.model")
const { ERR } = require("./response")

const tokenCheck = async (req, res, next) => {
    const email = req.body.email || req.params.email
    const token = req.body.token || req.params.token
    // console.log("Email dan Token yang diterima:", email, token)


    if (!email || !token) {
        return ERR(res, 400, "Error, no data provided!")
    }

    try {
        const user = await User.findOne({ email, token })
        if (!user) {
            return ERR(res, 401, "Error, unauthorized!")
        }
        req.user = user
        next()
    } catch (error) {
        return ERR(res, 500, "Error, can't check token!")
    }
}

module.exports = { tokenCheck }
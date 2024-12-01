const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String,
    },
    token: {
        required: true,
        type: String
    },
    favoriteMovies: Array
})

module.exports = {
    User: mongoose.model("User", UserSchema)
}
const { ERR, OK } = require("../utils/response")
const { User } = require("../models/index.model")

const GetFavoriteMovies = async (req, res) => {
    return OK(res, 200, req.user, "Get Favorite Movies Success!")
}

const AddFavoriteMovies = async (req, res) => {
    try {
        //tangkap data film dari client
        const { data } = req.body

        //ambil model dari mongoose
        const user = await User.findById(req.user._id)

        //menentukan key yang ingin diupdate
        user.favoriteMovies.push(data)

        //action untuk update/insert user data
        await user.save()

        return OK(res, 201, user.favoriteMovies, "Add Favorite Movies Success!")
    } catch (error) {
        return ERR(res, 500, "Error Adding Favorite Movies!")
    }
}

const RemoveFavoriteMovies = async (req, res) => {
    try {
        const { email, token, movieId } = req.body
        const result = { email, token, movieId }
        return OK(res, 200, result, "Remove Favorite Movies Success!")
    } catch (error) {
        return ERR(res, 500, "Error Removing Favorite Movies!")
    }
}

const SignInToken = async (req, res) => {
    try {
        const { email, token } = req.body
        const user = new User({ email, token })
        await user.save()
        return OK(res, 200, null, "Sign-in Token Saved!")
    } catch (error) {
        return ERR(res, 500, "Error Saving Sign-in Token!")
    }
}

module.exports = {
    SignInToken,
    GetFavoriteMovies,
    AddFavoriteMovies,
    RemoveFavoriteMovies
}
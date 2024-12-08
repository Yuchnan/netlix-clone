const { ERR, OK } = require("../utils/response")
const { User } = require("../models/index.model")
const argon2 = require("argon2")

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
        const { movieID } = req.body
        const user = await User.findById(req.user._id)

        //validasi
        const isMovieExist = user.favoriteMovies.some(movie => movie.id == movieID)

        if (!isMovieExist) return ERR(res, 404, "Movie ID Not Found!")

        //menyimpan/menimpa list favorite movies yang tidak sama dengan input user
        user.favoriteMovies = user.favoriteMovies.filter(movie => movie.id !== movieID)

        await user.save()

        return OK(res, 204, null, "Remove Favorite Movies Success!")
    } catch (error) {
        return ERR(res, 500, "Error Removing Favorite Movies!")
    }
}

const CheckFavoriteMovies = async (req, res) => {
    const { movieID } = req.body
    try {
        const user = await User.findById(req.user._id)
        const isFavorited = await user.favoriteMovies.some(movie => movie.id === movieID)

        return OK(res, 200, { isFavorited }, "Checking Favorite Movie by ID Success!")
    } catch (error) {
        return ERR(res, 500, "Error Checking Favorite Movies ID!")
    }
}

const SignInToken = async (req, res) => {
    try {
        const { email, password, token } = req.body
        //menggunakan let karena else mengandung keyword *new*
        let user = await User.findOne({ email })

        if (!user) return ERR(res, 400, "User Not Found!")

        const isPasswordOk = await argon2.verify(user.password, password)

        if (!isPasswordOk) return ERR(res, 400, "Wrong Password!")

        user.token = token

        await user.save()
        return OK(res, 200, null, "Sign-in Token Saved!")
    } catch (error) {
        return ERR(res, 500, "Error Saving Sign-in Token!")
    }
}

const SignOutToken = async (req, res) => {
    const user = await User.findById(req.user._id)
    user.token = null

    await user.save()
    return OK(res, 200, null, "Sign-out Success!")
}

const SignUpUser = async (req, res) => {
    const { email, password } = req.body
    const hashPass = await argon2.hash(password)

    try {
        const user = await User.findOne({ email })

        if (user) return ERR(res, 400, "Email Not Available!")

        const addNewUser = new User({ email, password: hashPass })
        await addNewUser.save()
        return OK(res, 201, addNewUser._id, "Sign-up Success!")
    } catch (err) {
        console.log("error: ", err)
        return ERR(res, 500, "Sign-up Failed!")
    }
}

module.exports = {
    SignInToken,
    SignOutToken,
    GetFavoriteMovies,
    AddFavoriteMovies,
    RemoveFavoriteMovies,
    CheckFavoriteMovies,
    SignUpUser
}
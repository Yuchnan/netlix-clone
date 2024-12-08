const router = require("express").Router()
const UserController = require("../controllers/index.controller")
//middleware auth
const { tokenCheck } = require("../utils/auth")

router.get("/my-movies/:email/:token", tokenCheck, UserController.GetFavoriteMovies)
router.post("/my-movies", tokenCheck, UserController.AddFavoriteMovies)
router.delete("/my-movies", tokenCheck, UserController.RemoveFavoriteMovies)
router.post("/my-movies/check", tokenCheck, UserController.CheckFavoriteMovies)

//user sign-in token
router.post("/my-token", UserController.SignInToken)

//user sign-out token
router.delete("/my-token", tokenCheck, UserController.SignOutToken)

//sign-up user
router.post("/sign-up", UserController.SignUpUser)

module.exports = router
const router = require("express").Router()
const UserController = require("../controllers/index.controller")
//middleware auth
const { tokenCheck } = require("../utils/auth")

router.get("/my-movies/:email/:token", tokenCheck, UserController.GetFavoriteMovies)
router.post("/my-movies", tokenCheck, UserController.AddFavoriteMovies)
router.delete("/my-movies", tokenCheck, UserController.RemoveFavoriteMovies)

//user sign-in token
router.post("/my-token", UserController.SignInToken)

module.exports = router
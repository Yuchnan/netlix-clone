require("dotenv").config()

const express = require("express")
const cors = require("cors")
const routes = require("./routes/index.route")
const mongoose = require("mongoose")

const { API_PORT, MONGO_URL } = process.env

const app = express()
const PORT = API_PORT

app.use(express.json())
app.use(cors()) 

mongoose.connect(MONGO_URL)
    .catch(err => {
        console.log("Tidak dapat terkoneksi dengan MongoDB")
        throw err
    })

app.use(routes)

app.listen(PORT, () => {
    console.log("Server API jalan di port " + PORT)
})

module.exports = app
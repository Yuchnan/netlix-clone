require("dotenv").config()
const express = require("express")
const cors = require("cors")
const routes = require("./routes/index.route")
const mongoose = require("mongoose")

const { OK, ERR } = require('./utils/response')
const { API_PORT, MONGO_URL } = process.env

const app = express()
const PORT = API_PORT

app.use(express.json())
app.use(cors()) 

mongoose.connect(MONGO_URL)
    .then(() => console.log("Berhasil terkoneksi dengan MongoDB"))
    .catch(err => {
        console.log("Tidak dapat terkoneksi dengan MongoDB")
        console.error(err)
    })

app.use(routes)

app.get("/", (request, response) => {
    const data = {
        isRunning: true,
        serverVersion: "1.0.0"
    }
    OK(response, 200, data, "success getting server main endpoint")
})

app.listen(PORT, () => {
    console.log("Server API jalan di port " + PORT)
})
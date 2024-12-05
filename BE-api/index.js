require("dotenv").config()

const express = require("express")
const cors = require("cors")
const routes = require("./routes/index.route")
const mongoose = require("mongoose")
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocs = YAML.load("./swagger.yaml")

const { API_PORT, MONGO_URL } = process.env

const app = express()
const PORT = API_PORT

app.use(express.json())
app.use(cors()) 

app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs)
)

// http://localhost:3002/docs

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
const cors = require("cors")
const express = require("express")
const { OK, ERR } = require('./utils/response')
const routes = require("./routes/index.route")

const app = express()
const PORT = 3002

app.use(express.json())
app.use(cors())

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
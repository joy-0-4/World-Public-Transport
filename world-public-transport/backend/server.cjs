const connect = require("./connect.cjs")
const express = require("express")
const cors = require("cors")
const methodOverride = require('method-override')
const companies = require("./companyRoutes.cjs")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(companies)
app.use(methodOverride('X-HTTP-Method-Override'))

app.listen(PORT, () => {
    connect.connectToServer()
    console.log("Server is running")
})
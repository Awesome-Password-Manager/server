const express = require("express")
const bodyparser = require("body-parser")
const api = require("./routes/api")
require('dotenv').config()

const app = express()

const VERSION = "1.0.0"
const PORT = process.env.PORT

app.use(bodyparser.json())
app.use("/api", api)

if (process.env.SIMPLE !== "true"){
    // web
    app.use(express.static("static")) 

    app.all("*", (req, res)=>{
        res.redirect("/")
    })
}

app.listen(PORT, ()=>{
    console.log(`
                Awesome Password Manager - Server v${VERSION}
            github.com/Awesome-Password-Manager/apm-server
                    Server started on port ${PORT}
    `)
})
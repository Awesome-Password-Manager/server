const express = require("express")
const api = require("./routes/api.js")
const config = require("./lib/config.js")
const app = express()

const VERSION = "2.0"
const PORT = config["port"]

app.use(express.json())
app.use("/api", api)
app.use(express.static("static")) 

app.use((err, req, res, next) => {
    res.send({ error: 2 })
})

app.all("*", (req, res)=>{
    res.redirect("/")
})

app.listen(PORT, ()=>{
    console.log(`
Passctl Server v${VERSION}      
github.com/passctl/server
#################################
Server started on port ${PORT}
    `)
})

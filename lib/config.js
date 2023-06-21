const fs = require("fs")
const keys = ["port", "vault-max", "pass"]
let config = {}

try{
    config = JSON.parse(fs.readFileSync("config.json"))
}catch(err){
    console.log("Error reading config!", err.message)
    process.exit()
}

keys.forEach(k=>{
    if(config[k]===undefined){
        console.log("Required key not found in the config:",k)
        process.exit()
    }
})
module.exports = config

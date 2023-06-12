const crypto = require("crypto")

function checkpass(cfg, pass){
        return cfg["pass"]===crypto.createHash("sha512").update(pass).digest("hex")
}

function keycheck(k, stor){
    // key must be 101 char long
    if(k.length!==101){
        return false
    }
    
    // key must contain upper/lowercase letters and numbers
    const valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for(let i = 0; i < k.length; i++){
        if(!valid.includes(k[i])){
            return false
        }
    }

    // key must exist in generated keys list
    let keys = stor.get("keys")
    if(keys===undefined){
        return false
    }

    if(!keys.includes(k)){
        return false
    }

    return true
}

function genkey() {
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    const length = 101
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charslen = chars.length

    let key = ""
    
    let i = 0
    while (i < length) {
      key += chars.charAt(Math.floor(Math.random() * charslen))
      i += 1
    }

    return key
}

module.exports = { keycheck, genkey, checkpass }

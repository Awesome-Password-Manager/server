const express = require("express")
const Storage = require("../lib/storage.js")
const config = require("../lib/config.js")
const { keycheck, genkey, checkpass } = require("../lib/keyutil.js")

const api = express.Router()
const storage = new Storage()
storage.update()

api.use(["/gen", "/set/*"], (req,res,next)=>{
    if(!req.body.pass)
        return res.json({ error: 2 })

    if(!checkpass(config, req.body.pass))
        return res.json({ error: 4 })

    next()
})

api.get("/ping", (req,res)=>{
    res.json({ error: 0 })
})

api.post("/gen", (req,res)=>{
    if(storage.get("keys")===undefined){
        storage.add("keys", [])
    }

    let keys = storage.get("keys")
    let k = genkey()
    keys.push(k)
    storage.add("keys", keys)
    res.json({ error: 0, key: k })
})

api.get("/get/:key", (req,res)=>{
    if(!req.params.key)
        return res.send({ error: 1 })

    let key = req.params.key

    if(!keycheck(key, storage))
        return res.send({ error: 1 })

    let data = storage.get(key)

    if(data===undefined)
        return res.send({ error: 0, vault: "" })

    res.send({ error: 0, vault: data })
})

api.post("/set/:key", (req,res)=>{
    if(
        !req.params.key || 
        !req.body.vault
    )
        return res.send({ error: 2 })

    let key = req.params.key
    let data = req.body.vault

    if(!keycheck(key, storage))
        return res.send({ error: 1 })

    if(config["vault-max"]!==-1)
        if(data.length>parseInt(config["vault-max"]))
            return res.send({ error: 3 })

    storage.add(key, data)
    res.send({ error: 0 })
})

module.exports = api

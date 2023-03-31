const express = require("express")
const Storage = require("../lib/storage")
const { keycheck, genkey } = require("../lib/keyutil");
const { checkCAPTCHA } = require("../lib/captcha")
const { application } = require("express");

const api = express.Router()
const storage = new Storage()
storage.update()

// error codes:
// 0 -> no errors
// 1 -> invalid format (something wrong with parameters)
// 2 -> not found
// 3 -> invalid request (something wrong with the data provided)
// 4 -> too much data


api.get("/ping", (req,res)=>{
    res.json({"error":0})
})

api.get("/captcha", (req,res)=>{
    res.json({"error":0,"site":process.env.SITE_KEY})
})

api.post("/gen", (req,res)=>{
    if(!checkCAPTCHA(req,res))
        return

    if(storage.get("keys")===undefined){
        storage.add("keys", [])
    }

    let keys = storage.get("keys")
    let k = genkey()
    keys.push(k)
    storage.add("keys", keys)
    res.json({"error":0,"key":k})
})

api.get("/get/:key", (req,res)=>{
    if(!req.params.key)
        return res.send({"error":1})

    let key = req.params.key
    let data = storage.get(key)

    if(!keycheck(key, storage))
        return res.send({"error":2})

    if(data===undefined)
        return res.send({"error":0, "data":""})

    res.send({"error":0, "data":data})
})

api.post("/set/:key", (req,res)=>{
    if(req.params.key === undefined || req.body.data === undefined)
        return res.send({"error":1})

    let key = req.params.key
    let data = req.body.data

    if(!keycheck(key, storage))
        return res.send({"error":3})

    if(data.length>10000)
        return res.send({"error":4})

    storage.add(key, data)
    res.send({"error":0})
})

module.exports = api
function checkCAPTCHA(req,res){
    if(process.env.SIMPLE === "true")
        return true

    if(
        req.body.captcha === '' ||
        req.body.captcha === undefined ||
        req.body.captcha === null
    ){
        res.json({"error":1})
        return false
    }

    let verify = `https://google.com/recaptcha/api/siteverify?secret=${process.env.PRIV_KEY}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`
    request(verify, (err, response, body)=>{
        body = JSON.parse(body)
        if(body.success!==undefined&&!body.success)
            res.json({"error":3})
            return false
    })

    return true
}

module.exports = {checkCAPTCHA}
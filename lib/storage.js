const fs = require("fs")

class Storage{
    constructor(){
        this.path = __dirname+"/../storage.json"
        this.storage = {}
    }

    update(){
        try{
            this.storage = JSON.parse(fs.readFileSync(this.path))
        }catch{
            this.storage = {}
        }
    }

    save(){
        fs.writeFileSync(this.path, JSON.stringify(this.storage))
    }

    add(key, value){
        this.storage[key] = value
        this.save()
    }

    get(key){
        return this.storage[key]
    }
}

module.exports = Storage
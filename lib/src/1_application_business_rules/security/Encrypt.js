module.exports = class {

    hash(value){
        throw new Error("Abstract method call")
    }

    compare(value, hash){
        throw new Error("Abstract method call")
    }
}
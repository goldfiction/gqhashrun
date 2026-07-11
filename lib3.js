fs=require("fs")
Blowfish = require('blowfish-node')

log = console.log

encrypt = function (secret, message) {
    bf = new Blowfish(secret, Blowfish.MODE.ECB, Blowfish.PADDING.NULL)
    bf.setIv('abcdefgh'); // optional for ECB mode; bytes length should be equal 8
    return (bf.encodeToBase64(JSON.stringify({ message: message })))    
}

decrypt = function (secret, message) {
    bf = new Blowfish(secret, Blowfish.MODE.ECB, Blowfish.PADDING.NULL)
    bf.setIv('abcdefgh'); // optional for ECB mode; bytes length should be equal 8
    return (bf.decode(message, Blowfish.TYPE.JSON_OBJECT).message)
}

module.exports = { encrypt: encrypt, decrypt: decrypt }
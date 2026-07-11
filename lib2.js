fs=require("fs")

Blowfish = require('blowfish-node')
secret = process.argv[4] || process.env.masterKey || process.env.backupKey || "secret"
//console.log("sec:" + secret)
//console.log(process.env.masterKey)
bf = new Blowfish(secret, Blowfish.MODE.ECB, Blowfish.PADDING.NULL)
bf.setIv('abcdefgh'); // optional for ECB mode; bytes length should be equal 8

log = console.log

//log(process.argv)
if (process.argv[2] == "encrypt") {
    log(bf.encodeToBase64(JSON.stringify({ message: process.argv[3] })))
}
else if (process.argv[2] == "decrypt") {
    log(bf.decode(process.argv[3], Blowfish.TYPE.JSON_OBJECT).message)
}
else if (process.argv[2] == "encryptfile") {
    log(bf.encodeToBase64(JSON.stringify({ message: fs.readFileSync(process.argv[3]).toString() })))
}
else if (process.argv[2] == "decryptfile") {
    log(bf.decode(fs.readFileSync(process.argv[3]).toString(), Blowfish.TYPE.JSON_OBJECT))
}

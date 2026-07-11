fs=require("fs")
log = console.log

//log(process.argv)
if (process.argv[2] == "encrypt") {
    log(btoa(process.argv[3]))
}
else if (process.argv[2] == "decrypt") {
    log(atob(process.argv[3]))
}
else if (process.argv[2] == "encryptfile") {
    log(btoa(fs.readFileSync(process.argv[3])))
}
else if (process.argv[2] == "decryptfile") {
    log(atob(fs.readFileSync(process.argv[3])))
}

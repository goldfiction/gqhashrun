fs = require("fs")
app = require("./lib4.js")

var secret = process.argv[3] || process.env.masterKey || process.env.backupKey || "secret"
var message=""
if(process.argv[2])
    message = fs.readFileSync(process.argv[2]).toString().trim()
try {
    result = app.run(secret, message)
} catch (e) {
    console.error(e)
}
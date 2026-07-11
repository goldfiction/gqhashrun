fs = require("fs")
lib3 = require("./lib3.js")
coffee = require('coffeescript')

var secret = process.argv[3] || process.env.masterKey || process.env.backupKey || "secret"
var message=""
if(process.argv[2])
  message = fs.readFileSync(process.argv[2]).toString()

hashrun=function(secret=secret,message=message) {
  content = lib3.decrypt(secret, message)
  try {
    contentObj = eval(content)
    return contentObj    
  } catch (e) {
    script = coffee.compile(content)
    //console.log(script)
    contentObj = eval(script)
    return contentObj
  }
}

module.exports = {run:hashrun,default:hashrun}
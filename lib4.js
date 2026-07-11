fs = require("fs")
lib3 = require("./lib3.js")
coffee = require('coffeescript')

function evaluateToModuleExports(coffeeCode, filename = 'eval.coffee') {
  // 1. Compile CoffeeScript to JavaScript
  jsCode = coffee.compile(coffeeCode, { filename })
  
  // 2. Create a temporary, isolated module
  m = new module.constructor()
  m.paths = module.paths
  
  // 3. Evaluate the compiled JavaScript and attach to exports
  m._compile(jsCode, filename)
  
  // 4. Return the resulting module.exports
  return m.exports
}

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
    contentObj = evaluateToModuleExports(content)
    return contentObj
  }
}

module.exports = {run:hashrun,default:hashrun}
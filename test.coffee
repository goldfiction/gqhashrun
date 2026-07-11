fs=require 'fs'
log=console.log
err=console.error
execSync= require('child_process').execSync
#app1=require './lib1.js'
#app2=require './lib2.js'
app3=require './lib3.js'
app4=require './lib4.js'
assert=require 'assert'
tests=require 'gqtest'

it=tests.it
run=tests.doRun

execcmd=(cmd,cb)->
  try
    output = execSync(cmd).toString()
    #log('Script Output:')
    #log(output)
    cb(null,output)
  catch e
    err('Execution failed:')
    err(e.stderr.toString())
    cb(e)

# dummy test for code integrity
it "should be able to run",(done)->
  done()

it "should be able to encrypt in blowfish",(done)->
  execcmd "node lib2.js encrypt testmessage secret",(e,r)->
    r=r.trim()
    log r
    assert.equal r,"ic7WEuHIxowWUclxdiRiklLpyWrLMXBh6ohY9XSzShE="
    done(e)

it "should be able to decrypt in blowfish",(done)->
  execcmd "node lib2.js decrypt ic7WEuHIxowWUclxdiRiklLpyWrLMXBh6ohY9XSzShE= secret",(e,r)->
    r=r.trim()
    log r
    assert.equal r,"testmessage"
    done(e)

it "should be able to encrypt in blowfish w/ master pw",(done)->
  execcmd "cross-env masterKey=testkey node lib2.js encrypt testmessage",(e,r)->
    r=r.trim()
    log r
    assert.equal r,"hRGGT3yWH/zYvAcL5K4ye0lxB3O46noyXM58JDYLRxc="
    done(e)

it "should be able to decrypt in blowfish w/ master pw",(done)->
  execcmd "cross-env masterKey=testkey node lib2.js decrypt hRGGT3yWH/zYvAcL5K4ye0lxB3O46noyXM58JDYLRxc=",(e,r)->
    r=r.trim()
    log r
    assert.equal r,"testmessage"
    done(e)

result=null
it "should be able to encrypt a script",(done)->
  result=app3.encrypt("secret",fs.readFileSync("./testcase.js").toString())
  log result
  assert.equal result,"ic7WEuHIxoycI4MrRuLIws41Letd9eBG/FsiXUCMfrduhMB78RcmnQ=="
  done()

it "should be able to decrypt a script and run it",(done)->
  result2=app3.decrypt("secret",result)
  log result2
  eval result2
  assert.equal c,3
  done()

it "should be able to hashrun a script",(done)->
  result3=app4.run("secret",result)
  log result3
  assert.equal result3,3
  done()

it "should be able to hashrun a script from file",(done)->
  result4=app4.run("secret",fs.readFileSync("./testcase.hash").toString().trim())
  log result4
  assert.equal result4,3
  done()

it "should be able to encrypt a coffee script",(done)->
  result5=app3.encrypt("secret",fs.readFileSync("./testcase2.coffee").toString())
  log result5
  assert.equal result5,fs.readFileSync("testcase2.hash").toString().trim()
  done()

it "should be able to hashrun a coffee script",(done)->
  result6=app4.run("secret",fs.readFileSync("testcase2.hash").toString().trim())
  log result6
  done()

it "should be able to hashrun a coffee script hash from run.js",(done)->
  execcmd "node run.js testcase2.hash secret",(e,r)->
    r=r.trim()
    log r
    assert.equal r,"4"
    done e

run()
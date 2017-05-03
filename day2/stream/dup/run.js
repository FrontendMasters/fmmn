var log = require('./api.js')

var stream = log()
var n = 0
var iv = setInterval(function () {
  stream.write(Date.now() + '\n')
  if (n++ === 5) {
    clearInterval(iv)
    stream.end()
  }
}, 100)

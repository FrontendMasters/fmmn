var net = require('net')
var crypto = require('crypto')
var pump = require('pump')
var pw = 'abc123'

net.createServer(function (stream) {
  pump(
    stream,
    crypto.createDecipher('aes192',pw),
    net.connect(5000,'localhost'),
    crypto.createCipher('aes192',pw),
    stream,
    function (err) {
      console.error(err)
    }
  )
}).listen(5005)

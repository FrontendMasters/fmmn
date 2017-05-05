var wsock = require('websocket-stream')
var http = require('http')
var onend = require('end-of-stream')
var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')

var server = http.createServer(function (req, res) {
  st(req,res)
})
server.listen(5000)

var count = 0
var streams = []
wsock.createServer({ server: server }, function (stream) {
  streams.push(stream)
  console.log('CONNECTED', streams.length)
  count++
  streams.forEach(function (s) {
    s.write(count + '\n')
  })
  onend(stream, function () {
    var ix = streams.indexOf(stream)
    streams.splice(ix,1)
    console.log('DISCONNECTED', streams.length)
  })
})

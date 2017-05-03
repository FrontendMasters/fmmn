var http = require('http')
var ecstatic = require('ecstatic')
var through = require('through2')

var server = http.createServer(ecstatic(__dirname + '/public'))
server.listen(5000)

var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  stream.pipe(loud()).pipe(stream)
})

function loud () {
  return through(function (buf, enc, next) {
    next(null, buf.toString().toUpperCase())
  })
}

var net = require('net')
net.createServer(function (stream) {
  stream.pipe(stream)
}).listen(5000)

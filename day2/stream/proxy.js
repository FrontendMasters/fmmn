var net = require('net')
net.createServer(function (stream) {
  stream.pipe(net.connect(5000,'localhost')).pipe(stream)
}).listen(5005)

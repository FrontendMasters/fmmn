var http = require('http')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(process.stdout)
    req.once('end', function () {
      res.end('ok\n')
    })
  } else {
    res.setHeader('content-type','text/plain')
    fs.createReadStream('hello.txt').pipe(res)
  }
})
server.listen(5000)

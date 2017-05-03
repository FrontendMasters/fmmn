var http = require('http')
var concat = require('concat-stream')
var qs = require('querystring')

var server = http.createServer(function (req, res) {
  console.log(req.method, req.url, req.headers)
  // todo: make sure the user can only upload
  // a finite amount of data
  req.pipe(concat(function (body) {
    var params = qs.parse(body)
    console.log(params)
    res.end('ok\n')
  }))
})
server.listen(5000)

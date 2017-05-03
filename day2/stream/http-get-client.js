var http = require('http')
var req = http.request({
  method: 'GET',
  host: 'localhost',
  port: 5000,
  url: '/'
}, function (res) {
  console.log(res.statusCode)
  res.pipe(process.stdout)
})
req.end()

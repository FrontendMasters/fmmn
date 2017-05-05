var test = require('tape')
var elevenizer = require('../')
var http = require('http')
var concat = require('concat-stream')

var server
test('setup', function (t) {
  server = http.createServer(function (req, res) {
    var n = req.url.slice(1)
    elevenizer(n, function (err, result) {
      if (err) {
        res.statusCode = 400
        res.end(err)
      } else res.end(String(result))
    })
  })
  server.listen(0, function () {
    t.end()
  })
})

test('single digits', function (t) {
  t.plan(6)
  testDigit(1,111)
  testDigit(3,333)
  testDigit(9,999)
  function testDigit (n, expected) {
    var req = http.request({
      host: 'localhost',
      port: server.address().port,
      path: '/' + n
    }, function (res) {
      t.equal(res.statusCode, 200)
      res.pipe(concat(function (body) {
        t.equal(Number(body.toString()), expected)
      }))
    })
    req.end()
  }
})

test('teardown', function (t) {
  server.close(function () {
    t.end()
  })
})

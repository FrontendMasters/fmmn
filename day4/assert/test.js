var assert = require('assert')
var fs = require('fs')

assert.equal(1+2,3)
countLines(function (err, n) {
  assert.ifError(err)
  assert.equal(n, 3)
})

function countLines (cb) {
  fs.readFile('file.txt', 'utf8', function (err, src) {
    if (err) cb(err)
    else cb(null, src.trim().split('\n').length)
  })
}

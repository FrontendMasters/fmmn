var duplexify = require('duplexify')
var mkdirp = require('mkdirp')
var fs = require('fs')

module.exports = function (name) {
  var d = duplexify()
  mkdirp('logs', function (err) {
    var w = fs.createWriteStream('logs/' + name + '.log')
    d.setWritable(w)
  })
  return d
}

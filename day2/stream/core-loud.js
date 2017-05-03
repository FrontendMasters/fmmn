var fs = require('fs')
var Transform = require('stream').Transform
process.stdin
  .pipe(toupper())
  .pipe(process.stdout)

function toupper () {
  return new Transform({
    transform: function (buf, enc, next) {
      next(null, buf.toString().toUpperCase())
    }
  })
}

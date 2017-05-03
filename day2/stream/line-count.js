var split = require('split2')
var to = require('to2')
var lineCount = 0

process.stdin
  .pipe(split())
  .pipe(to(write,end))
  
function write (buf, enc, next) {
  lineCount++
  next()
}
function end (next) {
  console.log(lineCount)
  next()
}

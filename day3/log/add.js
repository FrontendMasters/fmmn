var level = require('level')
var db = level('log.db')
var hyperlog = require('hyperlog')
var log = hyperlog(db, { valueEncoding: 'json' })

var msg = process.argv[2]
var links = process.argv.slice(3)
log.add(links, { message: msg, time: Date.now() }, function (err, node) {
  if (err) console.error(err)
  else console.log(node)
})

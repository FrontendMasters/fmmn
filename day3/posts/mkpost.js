var level = require('level')
var db = level('posts.db', { valueEncoding: 'json' })
var strftime = require('strftime')
var randomBytes = require('crypto').randomBytes

var name = process.argv[2]
var msg = process.argv.slice(3).join(' ')
var time = strftime('%F %T')

var id = randomBytes(16).toString('hex')
var batch = [
  { key: 'post!' + id, value: { name: name, time: time, body: msg } },
  { key: 'post-name!' + name + '!' + time + '!' + id, value: 0 },
  { key: 'post-time!' + time + '!' + name + '!' + id, value: 0 }
]
db.batch(batch, function (err) {
  if (err) console.error(err)
})

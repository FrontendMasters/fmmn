var level = require('level')
var db = level('posts.db', { valueEncoding: 'json' })

var name = process.argv[2]
db.put('user!' + name, {}, function (err) {
  if (err) console.error(err)
})

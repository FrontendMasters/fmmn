var level = require('level')
var db = level('inc.db', { valueEncoding: 'json' })

db.get('count', function (err, value) {
  var n = (value || 0) + 1
  db.put('count', n, function (err) {
    if (err) console.error(err)
    else console.log(n)
  })
})

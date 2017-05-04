var level = require('level')
var db = level('posts.db', { valueEncoding: 'json' })
var to = require('to2')

db.createReadStream({ gt: 'post!', lt: 'post!~' })
  .pipe(to.obj(function (row, enc, next) {
    var id = row.key.split('!')[0]
    var name = row.value.name
    var time = row.value.time
    var body = row.value.body
    console.log(time + ' <' + name + '> ' + body)
    next()
  }))

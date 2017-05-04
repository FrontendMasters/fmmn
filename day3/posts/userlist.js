var level = require('level')
var db = level('posts.db', { valueEncoding: 'json' })
var to = require('to2')

db.createReadStream({ gt: 'user!', lt: 'user!~' })
  .pipe(to.obj(function (row, enc, next) {
    console.log(row.key.split('!')[1])
    next()
  }))

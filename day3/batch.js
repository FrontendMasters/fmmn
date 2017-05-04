var level = require('level')
var db = level('batch.db', { valueEncoding: 'json' })
var to = require('to2')

db.createReadStream({ gt: 'n5', lt: 'n8' })
  .pipe(to.obj(function (row, enc, next) {
    console.log(row)
    next()
  }))

/*
var batch = []
for (var i = 0; i < 10; i++) {
  batch.push({ key: 'n' + i, value: i*1000 })
}
db.batch(batch, function (err) {
  if (err) console.error(err)
})
*/

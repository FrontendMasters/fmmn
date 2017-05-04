var level = require('level')
var db = level('ix.db')
var to = require('to2')

db.createReadStream()
  .pipe(to.obj(function (row, enc, next) {
    console.log(row)
    next()
  }))

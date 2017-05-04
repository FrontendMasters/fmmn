var level = require('level')
var db = level('log.db')
var hyperlog = require('hyperlog')
var log = hyperlog(db, { valueEncoding: 'json' })
var to = require('to2')

log.createReadStream()
  .pipe(to.obj(function (row, enc, next) {
    console.log(row)
    next()
  }))

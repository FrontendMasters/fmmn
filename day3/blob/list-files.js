var blobs = require('content-addressable-blob-store')
var store = blobs('img.blob')
var level = require('level')
var db = level('img.db', { valueEncoding: 'json' })
var to = require('to2')

db.createReadStream()
  .pipe(to.obj(function (row, enc, next) {
    console.log({
      key: row.key.split('!')[1],
      value: row.value
    })
    next()
  }))

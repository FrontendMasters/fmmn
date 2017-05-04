var level = require('level')
var db = level('log.db')
var idb = level('ix.db')
var hyperlog = require('hyperlog')
var indexer = require('hyperlog-index')
var strftime = require('strftime')
var log = hyperlog(db, { valueEncoding: 'json' })

var dex = indexer({
  log: log,
  db: idb,
  map: function (row, next) {
    var key = strftime('%F %T', new Date(row.value.time))
    console.log('key=', key)
    console.log('value=', row.key)
    idb.put(key, row.key, next)
  }
})

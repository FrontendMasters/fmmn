var blobs = require('content-addressable-blob-store')
var store = blobs('img.blob')

var hash = process.argv[2]
store.createReadStream(hash)
  .pipe(process.stdout)

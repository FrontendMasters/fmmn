var fs = require('fs')
var r = fs.createReadStream(process.argv[2])
r.pipe(process.stdout)

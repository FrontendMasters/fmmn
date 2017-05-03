 var net = require('net')
 var rpc = require('rpc-stream')
 
 net.createServer(function (stream) {
   stream.pipe(rpc({
     hello: function (name, cb) {
       cb(null, 'howdy ' + name)
     }
   })).pipe(stream)
 }).listen(5000)

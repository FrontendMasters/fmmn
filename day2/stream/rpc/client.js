     var net = require('net')
     var rpc = require('rpc-stream')
     
     var client = rpc()
     client.pipe(net.connect(5000, 'localhost')).pipe(client)
     var remote = client.wrap(['hello'])
     
     remote.hello(process.env.USER, function (err, msg) {
       if (err) return console.error(err)
       console.log(msg)
       client.end()
     })

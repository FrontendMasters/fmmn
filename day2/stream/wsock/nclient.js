var wsock = require('websocket-stream')
var stream = wsock('ws://localhost:5000')
process.stdin.pipe(stream).pipe(process.stdout)

# streams

node.js has a handy interface for shuffling data around
called streams

---
# stream origins

```
"We should have some ways of connecting programs like garden
hose--screw in another segment when it becomes necessary to
massage data in another way. This is the way of IO also."
```

[Doug McIlroy. October 11, 1964](
http://cm.bell-labs.com/who/dmr/mdmpipe.html)

---
# why streams?

* we can compose streaming abstractions
* we can operate on data chunk by chunk

---
# composition

Just like how in unix we can pipe commands together:

```
$ <mobydick.txt.gz gunzip | sed -r 's/\s+/\n/g' | grep -i whale | wc -l
1691
```

---
We can pipe abstractions together with streams using `.pipe()`:

```
fs.createReadStream('mobydick.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(replace(/\s+/g, '\n'))
  .pipe(filter(/whale/i))
  .pipe(linecount(console.log))
```

---
# chunk by chunk

With streams, we can operate on data chunk by chunk, without
buffering everything into memory.

This means we can write programs that operate on very large
files or lazily evaluate network data as it arrives!

It also means we can have hundreds or thousands of
concurrent streams without using much memory.

---
# fs

We can read a file and stream the file contents to stdout:

``` js
var fs = require('fs')

fs.createReadStream('greetz.txt')
  .pipe(process.stdout)
```

---

```
$ echo beep boop > greetz.txt
$ node greetz.js
beep boop
```

---

now let's transform the data before we print it out!

---
# fs

You can chain `.pipe()` calls together just like the `|`
operator in bash:

``` js
var fs = require('fs')

fs.createReadStream('greetz.txt')
  .pipe(...)
  .pipe(process.stdout)
```

---
# fs

``` js
var fs = require('fs')
var through = require('through2')

fs.createReadStream('greetz.txt')
  .pipe(through(toUpper))
  .pipe(process.stdout)

function toUpper (buf, enc, next) {
  next(null, buf.toString().toUpperCase())
}
```

---
# fs

``` js
var fs = require('fs');
var through = require('through2');

fs.createReadStream('greetz.txt')
  .pipe(through(toUpper))
  .pipe(process.stdout)

function toUpper (buf, enc, next) {
  next(null, buf.toString().toUpperCase())
}
```

---
# stdin


Instead of reading from a file, we could read from stdin:

``` js
var through = require('through2');

process.stdin
  .pipe(through(toUpper))
  .pipe(process.stdout)

function toUpper (buf, enc, next) {
  next(null, buf.toString().toUpperCase())
}
```

---
# through2

through2 is a module you can install with npm:

```
$ npm install through2
```

---

or you can use stream.Transform from node core:

``` js
var Transform = require('stream').Transform
var toUpper = new Transform({
  transform: function (buf, enc, next) {
    next(null, buf.toString().toUpperCase())
  }
})

process.stdin
  .pipe(toUpper)
  .pipe(process.stdout)
```

---
# through2 vs stream.Transform

* `through2(opts={...}, write, end)`
* `new Transform({ transform: write, flush: end, ... })`

---
# through(write, end)

With through there are 2 parameters: `write` and `end`.
Both are optional.

* `function write (buf, enc, next) {}`
* `function end () {}`

Call `next()` when you're ready for the next chunk.
If you don't call `next()`, your stream will hang!

Call `this.push(VALUE)` inside the callback to put VALUE
into the stream's output.

Use a `VALUE` of `null` to end the stream. 

---
# through()

If you don't give through any arguments, these are the
default values for write and end:

* `function write (buf, enc, next) { this.push(buf); next() }`
* `function end () { this.push(null) }`

This means that `through()` with no arguments will pass
everything written as input directly through to its output.

---
# concat-stream

`npm install concat-stream`

concat-stream buffers up all the data in the stream:

```
var concat = require('concat-stream')
process.stdin.pipe(concat(function (body) {
    console.log(body.length)
}))
```

You can only write to a concat-stream. You can't read from a
concat-stream.

Keep in mind that all the data will be in memory.

---
# stream types

There are many kinds of streams. We've seen two types
already: transform (through2) and writable (concat-stream).

* readable - produces data: you can pipe FROM it
* writable - consumes data: you can pipe TO it
* transform - consumes data, producing transformed data
* duplex - consumes data separately from producing data

---
# stream types in code

* readable: `readable.pipe(A)`
* writable: `A.pipe(writable)`
* transform: `A.pipe(transform).pipe(B)`
* duplex: `A.pipe(duplex).pipe(A)`

---
# writable stream methods

We've seen `.pipe()` which is a method of all readable
streams (readable, transform, and duplex).

Any stream you can write to (writable, transform, and duplex
streams) has these methods:

* `.write(buf)`
* `.end()`
* `.end(buf)`
* `.on('finish', function () {})`
* (...).pipe(stream)

---
# readable stream methods

* `stream.pipe(...)`
* `stream.once('end', function () {})`

you probably won't need to call these very often:

* `stream.read()`
* `stream.on('readable', function () {})`

you can let a module or `.pipe()` take care of calling those

---
# readable: paused mode

default behavior with automatic backpressure

---
# readable: flowing mode

data is consumed as soon as chunks are available (no backpressure)

turn on flowing mode with:

* `stream.resume()`
* `stream.on('data', function (buf) {})`

---
# transform

readable + writable stream where:

```
input -> transform -> output
```

All the readable AND writable methods are available.

---
# duplex

readable + writable stream where
input is decoupled from output

like a telephone!

```
input -> duplex
duplex -> output
```

All the readable AND writable methods are available.

---
# duplex

If you see:

    a.pipe(stream).pipe(a)

then you are dealing with a duplex stream.

---
# object streams

Normally you can only read and write buffers and strings
with streams. However, if you initialize a stream in
`objectMode`, you can use any kind of object (except for
`null`):

``` js
var through = require('through2')
var tr = through.obj(function (row, enc, next) {
  next(null, (row.n * 1000) + '\n')
})
tr.pipe(process.stdout)
tr.write({ n: 5 })
tr.write({ n: 10 })
tr.write({ n: 3 })
tr.end()
```

---
output:

```
5000
10000
3000
```

---
# core streams in node

many of the APIs in node core provide stream interfaces:

* fs.createReadStream()
* fs.createWriteStream()
* process.stdin, process.stderr
* ps.stdin, ps.stdout, ps.stderr
* net.connect(), tls.connect()
* net.createServer(function (stream) {})
* tls.createServer(opts, function (stream) {})

...

---
# http core streams

``` js
// req: readable, res: writable
http.createServer(function (req, res) {})

// req: writable, res: readable
var req = http.request(opts, function (res) {})
```

---
# http

``` js
var http = require('http')
var server = http.createServer(function (req, res) {
  req.pipe(process.stdout)
  res.end('hello thar!\n')
})
server.listen(5000)
```

---
# crypto core streams

```
* `crtypo.createCipher(algo, password)` - transform stream to encrypt
* `crtypo.createDecipher(algo, password)` - transform stream to decrypt
* `crypto.createCipheriv(algo, key, iv)` - transform stream to encrypt with iv
* `crypto.createDecipheriv(algo, key, iv)` - transform stream to decrypt with
* iv
* `crypto.createHash(algo)` - transform stream to output cryptographic hash
* `crypto.createHMAC(algo, key)` - transform stream to output HMAC digest
* `crypto.createSign(algo)` - writable stream to sign messages
* `crypto.createVerify(algo)` - writable stream to verify signatures
```

---
# zlib core streams

```
* `zlib.createGzip(opts)` - transform stream to compress with gzip
* `zlib.createGunzip(opts)` - transform stream to uncompress with gzip
* `zlib.createDeflate(opts)` - transform stream to compress with deflate
* `zlib.createDeflateRaw(opts)` - transform stream to compress with raw deflate
* `zlib.createInflate(opts)` - transform stream to uncompress with deflate
* `zlib.createInflateRaw(opts)` - transform stream to uncompress with raw deflate
* `zlib.createUnzip(opts)` - transform stream to uncompress gzip and deflate
```

---
# split2

split input on newlines

This program counts the number of lines of input, like `wc -l`:

``` js
var split = require('split2')
var through = require('through2')

var count = 0
process.stdin.pipe(split())
  .pipe(through(write, end))

function write (buf, enc, next) {
  count++
  next()
}
function end () {
  console.log(count)
}
```

---
# split2

A note about split2:

In each line, the trailing `'\n'` is removed.

---
# split2

You can give `split()` a custom string or regex to split on:

This program splits on all whitespace:

``` js
var split = require('split2')
process.stdin.pipe(split(/\s+/))
  .pipe(through(function (buf, enc, next) {
    console.log('word=' + buf.toString())
    next()
  }))
```

---
# websocket-stream

streaming websockets in node and the browser

---
# websocket-stream: server

``` js
var http = require('http')
var wsock = require('websocket-stream')
var through = require('through2')

var server = http.createServer(function (req, res) {
  res.end('not found\n')
}).listen(5000)
wsock.createServer({ server: server }, function (stream) {
  stream.pipe(louder()).pipe(stream)
})

function louder () {
  return through(function (buf, enc, next) {
    next(null, buf.toString().toUpperCase())
  })
}
```

---
# websocket-stream: node client

``` js
var wsock = require('websocket-stream')
var stream = wsock('ws://localhost:5000')
process.stdin.pipe(stream).pipe(process.stdout)
```

---
# websocket-stream: browser client

``` js
var wsock = require('websocket-stream')
var to = require('to2')
var html = require('yo-yo')
var root = document.body.appendChild(document.createElement('div'))
var output = []
update()

var stream = wsock('ws://localhost:5000')
stream.pipe(to(function (buf, enc, next) {
  output.push(buf.toString())
  update()
  next()
}))

function update () {
  html.update(root, html`<div>
    <form onsubmit=${onsubmit}>
      <input name="msg" type="text">
    </form>
    <pre>${output.join('')}</pre>
  </div>`)
  function onsubmit (ev) {
    ev.preventDefault()
    stream.write(this.elements.msg.value + '\n')
    this.reset()
  }
}
```

---
# collect-stream

collect a stream's output into a single buffer

for object streams, collect output into an array of objects

``` js
var collect = require('collect-stream')
var split = require('split2')

var sp = process.stdin.pipe(split(JSON.parse))
collect(sp, function (err, rows) {
  if (err) console.error(err)
  else console.log(rows)
})
```

This module is very useful for unit tests.

---
# from2

create a readable stream with a pull function

``` js
var from = require('from2')
var messages = [ 'hello', ' world\n', null ]

from(function (size, next) {
  next(null, messages.shift())
}).pipe(process.stdout)
```

---
# to2

create a writable stream with a write and flush function

``` js
var to = require('to2')
var split = require('split2')

process.stdin.pipe(split()).pipe(to(function (buf, next) {
  console.log(buf.length)
  next()
}))
```

---
# duplexify

``` js
var duplexify = require('duplexify')
var d = duplexify()

d.setReadable(...)
d.setWritable(...)
```

---
# pump

``` js
var pump = require('pump')

pump(stream1, stream2, stream3, ...)
```

---
# pumpify

``` js
var pump = require('pumpify')

var stream = pump(stream1, stream2, stream3, ...)
```

---
# end-of-stream

reliably detect when a stream is finished

``` js
var onend = require('end-of-stream')
var net = require('net')

var server = net.createServer(function (stream) {
  var iv = setInterval(function () {
    stream.write(Date.now() + '\n')
  }, 1000)
  onend(stream, function () {
    clearInterval(iv)
  })
})
server.listen(5000)
```

---
# rpc-stream

call methods defined by a remote endpoint

---
# rpc-stream: server.js

``` js
var net = require('net')
var rpc = require('rpc-stream')

net.createServer(function (stream) {
  stream.pipe(rpc({
    hello: function (name, cb) {
      cb(null, 'howdy ' + name)
    }
  })).pipe(stream)
}).listen(5000)
```

---
# rpc-stream: client.js

``` js
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
```

---
# multiplex

pack multiple streams into a single stream

---
# multiplex: server

``` js
var net = require('net')
var multiplex = require('multiplex')
var rpc = require('rpc-stream')
var fs = require('fs')

net.createServer(function (stream) {
  var plex = multiplex()
  stream.pipe(plex).pipe(stream)
  var client = rpc({
    read: function (name, cb) { 
      if (!/^[\w-]+$/.test(name)) { 
        return cb(new Error('file not allowed'))
      }
      var r = fs.createReadStream('files/' + name)
      r.on('error', cb)
      r.pipe(plex.createStream('file-' + name)).pipe(r)
      cb(null)
    }
  })
  client.pipe(plex.createSharedStream('rpc')).pipe(client)
}).listen(5000)
```

---
# multiplex: client

``` js
var net = require('net')
var multiplex = require('multiplex')
var rpc = require('rpc-stream')

var plex = multiplex(function (stream, id) {
  if (/^file-/.test(id)) {
    console.log('RECEIVED FILE ' + id.replace(/^file-/,''))
    stream.pipe(process.stdout)
  }
})
plex.pipe(net.connect(5000)).pipe(plex)

var client = rpc()
client.pipe(plex.createSharedStream('rpc')).pipe(client)

var remote = client.wrap(['read'])
remote.read(process.argv[2], function (err) {
  if (err) console.error(err)
})
```


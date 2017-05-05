var choo = require('choo')
var html = require('choo/html')
var wsock = require('websocket-stream')
var split = require('split2')
var to = require('to2')
var stream = wsock('ws://' + location.host)

var app = choo()
app.route('/', function (state, emit) {
  return html`<body>
    <h1>${state.visitors}</h1>
    <div>${state.x}</div>
    <button onclick=${onclick}>CLICK ME</button>
  </body>`
  function onclick (ev) {
    emit('increment-x')
  }
})
app.mount('body')

app.use(function (state, bus) {
  stream.pipe(split()).pipe(to(function (buf, enc, next) {
    bus.emit('set-visitors', Number(buf.toString()))
    next()
  }))
})
app.use(require('./reduce.js'))

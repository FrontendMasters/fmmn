var html = require('yo-yo')
var wsock = require('websocket-stream')
var split = require('split2')
var to = require('to2')
var stream = wsock('ws://' + location.host)
stream.pipe(split()).pipe(to(function (buf, enc, next) {
  bus.emit('set-visitors', Number(buf.toString()))
  bus.emit('update')
  next()
}))

var state = {
  visitors: 0,
  x: 0
}
var EventEmitter = require('events')
var bus = new EventEmitter
require('./reduce.js')(bus, state)

var root = document.body.appendChild(document.createElement('div'))
update()
bus.on('update', update)

function update () {
  html.update(root, html`<div>
    <h1>${state.visitors}</h1>
    <div>${state.x}</div>
    <button onclick=${onclick}>CLICK ME</button>
  </div>`)
  function onclick (ev) {
    bus.emit('increment-x')
  }
}

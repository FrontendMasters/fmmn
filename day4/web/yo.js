var html = require('yo-yo')
var state = {
  n: 5,
  x: 0
}
var EventEmitter = require('events')
var bus = new EventEmitter
require('./reduce.js')(bus, state)

var root = document.body.appendChild(document.createElement('div'))
update()
bus.on('update', update)

setInterval(function () {
  bus.emit('increment-n')
}, 1000)

function update () {
  html.update(root, html`<div>
    <h1>${state.n}</h1>
    <div>${state.x}</div>
    <button onclick=${onclick}>CLICK ME</button>
  </div>`)
  function onclick (ev) {
    bus.emit('increment-x')
  }
}

var wsock = require('websocket-stream')
var through = require('through2')
var stream = wsock('ws://' + location.host)
var html = require('yo-yo')
var root = document.body.appendChild(document.createElement('div'))
var output = []
update()

stream.pipe(through(function (buf, enc, next) {
  output.push(buf.toString())
  update()
  next()
}))

function update () {
  html.update(root, html`<div>
    <form onsubmit=${onsubmit}>
      <input type="text" name="msg">
    </form>
    <pre>${output.join('')}</pre>
  </div>`)
  function onsubmit (ev) {
    ev.preventDefault()
    stream.write(this.elements.msg.value + '\n')
    this.reset()
  }
}

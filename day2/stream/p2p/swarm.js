var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var onend = require('end-of-stream')
var through = require('through2')
var to = require('to2')
var html = require('yo-yo')
var root = document.body.appendChild(document.createElement('div'))

var hub = signalhub('streams-day', [ 'https://signalhub.mafintosh.com' ])
var sw = swarm(hub)
var output = []
var peers = {}
update()

function update () {
  html.update(root, html`<div>
    <form onsubmit=${onsubmit}>
      <input type="text" name="msg">
    </form>
    <pre>${output.join('')}</pre>
  </div>`)
  function onsubmit (ev) {
    ev.preventDefault()
    var msg = this.elements.msg.value
    Object.keys(peers).forEach(function (id) {
      peers[id].write(msg + '\n')
    })
    this.reset()
  }
}

sw.on('peer', function (peer, id) {
  peers[id] = peer
  onend(peer, function () {
    delete peers[id]
  })
  peer.pipe(to(function (buf, enc, next) {
    output.push(buf.toString())
    update()
    next()
  }))
})

function toupper () {
  return through(function (buf, enc, next) {
    next(null, buf.toString().toUpperCase())
  })
}

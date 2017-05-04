var level = require('level-browserify')
var sub = require('subleveldown')
var db = level('wiki.db')
var hyperlog = require('hyperlog')
var log = hyperlog(sub(db,'log'), { valueEncoding: 'json' })
var html = require('yo-yo')
var hyperkv = require('hyperkv')
var kv = hyperkv({ log: log, db: sub(db,'kv') })
var to = require('to2')

var root = document.body.appendChild(document.createElement('div'))
var docs = {}

var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')

var swarm = wswarm(signalhub('cool-wiki',['http://localhost:5008']))
swarm.on('peer', function (peer, id) {
  console.log('PEER',id)
  peer.pipe(log.replicate({ live: true })).pipe(peer)
})
update()
getlist()
setInterval(function () {
  getlist()
}, 1000)

function update () {
  html.update(root, html`<div>
    <form onsubmit=${onsubmit}>
      <div><input name="title"></div>
      <div><textarea name="content"></textarea></div>
    </form>
  </div>`)
  function onsubmit (ev) {
    ev.preventDefault()
    var title = this.elements.title.value
    var content = this.elements.content.value
    kv.put(title, { body: content }, function (err, node) {
      if (err) return console.error(err)
      console.log('node=',node)
    })
    this.reset()
  }
}

function getlist () {
  kv.createReadStream()
    .pipe(to.obj(function (row, enc, next) {
      console.log('row=',row)
      next()
    }))
}

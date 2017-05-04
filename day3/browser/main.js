var level = require('level-browserify')
var db = level('whatever', { valueEncoding: 'json' })
var html = require('yo-yo')
var root = document.body.appendChild(document.createElement('div'))
var count = '?'
update()
db.get('count', function (err, value) {
  count = value || 0
  update()
})

function update () {
  html.update(root, html`<div>
    <h1>${count}</h1>
    <button onclick=${onclick}>CLICK ME</button>
  </div>`)
  function onclick (ev) {
    count++
    db.put('count', count, function (err) {
      if (err) console.error(err)
      else update()
    })
  }
}

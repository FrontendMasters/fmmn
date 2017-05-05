var html = require('yo-yo')
var n = 5
var root = document.body.appendChild(document.createElement('div'))
update()

setInterval(function () {
  n++
  update()
}, 1000)

function update () {
  html.update(root, html`<div>
    <h1>${n}</h1>
  </div>`)
}

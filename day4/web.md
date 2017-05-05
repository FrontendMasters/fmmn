# modular web dev

---
# the web these days

the web is these:

* service workers
* template strings
* redux architecture

but also these:

* indexedDB
* webaudio
* webgl

---
# starting from zero

```
$ echo '{}' > package.json
$ npm install --save ...
```

---
# template strings

``` js
var n = 5
console.log(`hi
  n=${n}
  wow`)
```

* can span multiple lines
* interpolation with `${...}`

---
# tagged template strings

    fn`...`

---
# hyperx

```
var hyperx = require('hyperx')
var html = hyperx(function (tagName, props, children) {
  console.log(tagName, props, children)
  // ...
})
var n = 3
console.log(html`<div>
  <h1>${n*1000}</h1>
</div>`)
```

---
# yo-yo/bel/morphdom

dom diffing with real DOM nodes

* faster in some cases than a virtual dom
* interop with vanilla DOM modules

---
# managing state

* uni-directional flow
* one state object

---
# routing

in server and in the browser

* history.pushState

``` js
window.addEventListener('click', function (ev) {
  var el = ev.target
  if (el.tagName.toUpperCase() === 'A'
  && el.getAttribute('href')) {
    // if the link can be handled by the router,
    // call ev.preventDefault()
  }
})
```

---
# choo

minimal (4kb) modular redux architecture
https://choo.io/

using:

* yo-yo/bel/hyperx
* sheetify

---
# choo

``` js
var html = require('choo/html')
var choo = require('choo')
var strftime = require('strftime')
var app = choo()
app.route('/', function (state, emit) {
  return html`<body>
    <h1>${strftime('%F %T', state.time)}</h1>
  </body>`
})
app.mount('body')

app.use(function (state, emitter) {
  state.time = 0
  setInterval(function () {
    state.time = new Date
    emitter.emit('render')
  }, 1000)
})
```

---
# building for production

browserify transforms for yo-yo/bel/choo dev:

* yo-yoify
* unassertify
* sheetify

or bankai includes these by default with no config:

```
$ bankai build main.js public/
```

---
# webgl

redraws, managing state

---
# webgl performance tips

```
60fps = 1 frame / 60 seconds
1 frame = 1/60 seconds ~ 16.7 milliseconds
```

avoid allocations and the GC

---
# glslify

modular webgl shaders!

``` js
var glsl = require('glslify')
console.log(glsl`
  #pragma glslify: snoise = require('glsl-noise/simplex/4d')
  attribute vec3 position, normal;
  uniform mat4 projection, view;
  void main () {
    gl_Position = projection * view
      * (position + normal*snoise(vec4(position,time)*0.1));
  }
`)

budo main -- -t glslify

---
# audio

npm i webaudio

or http://studio.substack.net

``` js
var baudio = require('webaudio')
var b = baudio(function (t) {
  return Math.sin(Math.PI*2*400*t) // 400Hz
})
b.play()
```


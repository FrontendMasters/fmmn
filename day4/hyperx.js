     var hyperx = require('hyperx')
     var html = hyperx(function (tagName, props, children) {
       console.log(tagName, props, children)
       // ...
     })
     var n = 3
     console.log(html`<div>
       <h1>${n*1000}</h1>
     </div>`)

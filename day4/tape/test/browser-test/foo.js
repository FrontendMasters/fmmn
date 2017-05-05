var test = require('tape')

test('whatever', function (t) {
  t.ok(/chrome/i.test(window.navigator.appVersion))
  t.equal(1+1,2)
  t.equal(555,5*111)
  t.end()
})

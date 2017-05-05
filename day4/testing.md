# testing

writing tests in node and the browser

---
# assert

require('assert')

* assert.ok()
* assert.equal()
* assert.deepEqual()
* assert.notOk()
* assert.notEqual()
* assert.notDeepEqual()
* assert.ifError()

---
# problems with assert

* exceptions stop execution
* false positive when test blocks don't run 

---
# test anything protocol (TAP)

old text protocol from the perl test suite (late 80s?)

* test cases begin with ok/not ok
* must plan out a number of assertions

http://testanything.org

---
# tap example

```
TAP version 13
# defined-or
ok 1 empty arguments
ok 2 1 undefined
ok 3 2 undefined
ok 4 4 undefineds
ok 5 false[0]
ok 6 false[1]
ok 7 zero[0]
ok 8 zero[1]
ok 9 first arg
ok 10 second arg
ok 11 third arg
# falsy
ok 12 should be equal

1..12
# tests 12
# pass  12

# ok
```

---
# tap failing case

```
not ok 30 in 1.5 weeks
  ---
    operator: equal
    expected: |-
      '2015-04-24 09:46:01'
    actual: |-
      '2015-04-24 21:46:01'
    at: Test.<anonymous> (/home/substack/projects/parse-messy-time/test/parse.js:141:7)
  ...
```

---
# tap/tape modules

* npm i tap # for node
* npm i tape # for node and the browser

---
# tap/tape api

``` js
var test = require('tape')
//var test = require('tap').test

test('optional test name', function (t) {
  t.plan(2)
  t.ok(2 > 1)
  setTimeout(function () {
    t.equal('hi', 'h'+'i')
  }, 100)
})

test('another test', function (t) {
  t.equal(1+1, 2, 'one plus one')
  t.end()
})
```

---
# setup and teardown

``` js
var server
test('setup', function (t) {
  server = http.createServer()
  server.on('listening', function () {
    t.end()
  })
})

// ...

test('teardown', function (t) {
  server.close(function () {
    t.end()
  })
})
```

---
# testing in the browser

if you're using tape:

```
$ npm i -g browserify browser-run
$ browserify test/*.js | browser-run -b chrome
```

browser-run copies console.log() to stdout

---
# writing testable code

* make code easy to run in varied ways
* use instance variables, not global state

---
## i/o shell

push I/O to the outermost layers

---
# code coverage

how much of your code gets run when you test

---
## abstract syntax tree

data structure for code

modules:

* acorn
* falafel

---
## coverify

$ npm i -g coverify browserify browser-run

in node:

  $ browserify -t coverify test/*.js --node | node | coverify
  
in the browser:

  $ browserify -t coverify test/*.js | browser-run -b chrome | coverify

---
## nyc

```
$ npm i -g nyc
$ nyc npm test
$ nyc report
----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
All files |      100 |      100 |      100 |      100 |                |
 index.js |      100 |      100 |      100 |      100 |                |
----------|----------|----------|----------|----------|----------------|
```

---
# npm scripts

in package.json:

``` json
{
  "scripts": {
    "build": "browserify main.js > public/bundle.js",
    "test": "tape test/*.js"
  }
}
```

---
# continuous integration

run tests every time you push code

---
# travis-ci config

git add .travis.yml

```
language: node_js
node_js:
  - "7"
  - "6"
  - "4"
```

---
# travis-ci github web hook

https://travis-ci.org/$USER/$REPO

click "activate repo"

---
# travis-ci badge

example markdown to include in your readme:

```
[![build status](https://travis-ci.org/substack/node-browserify.svg)](https://travis-ci.org/substack/node-browserify)
```


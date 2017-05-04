# leveldb!

an embedded key/value database

---
# embedded vs standalone

* embedded - in-process library
* standalone - separate service

---
# embedded databases

* leveldb
* sqlite
* berkeleydb

---
# standalone databases

* postgresql
* mysql
* mongodb
* couchdb

---
# install

Since leveldb is a standalone databse,
you can install it with npm:

```
npm install level
```

---
# and then

``` js
var level = require('level')
var db = level('./whatever.db')
```

---
# valueEncoding

``` js
var level = require('level')
var db = level('./whatever.db', { valueEncoding: 'json' })
```

---
# what leveldb is good for

* running the same database in node and the browser
* when your data isn't very relational
* building your own kappa architecture

---
# level methods

* `db.get()`
* `db.put()`
* `db.del()`
* `db.batch()`
* `db.createReadStream()`

---
# put

set a value for a key with `.put()`

``` js
var level = require('level')
var db = level('./whatever.db')
db.put('key', 'value', function (err) {
  if (err) console.error(err)
})
```

---
# get

load a value for a key with `.get()`

``` js
var level = require('level')
var db = level('./whatever.db')
db.get('key', function (err, value) {
  if (err) console.error(err)
  else console.log('value=', value)
})
```

---
# del

delete a value at a key with `.del()`:

---
# atomicity

either all transactions succeed
or all transactions fail

---
# consistency

atomicity is important to enforce consistency

Suppose a user has just signed up.
We might need to create:

* a record for their 
* a record for their login username and password

---
# batch

insert multiple records at a time, atomically

``` js
db.batch([
  {"key":"foo","value":"123"},
  {"key":"bar","value":"456"}
], function (err) { })
```

---
# createReadStream

`db.createReadStream(opts)`:

Returns a readable objectMode stream.

* opts.gte - greater than or equal to
* opts.gt - greater than
* opts.lte - less than or equal to
* opts.lt - less than
* opts.limit - maximum number of results
* opts.reverse - higher keys before lower keys

---
# createReadStream

```
db.createReadStream({
  gt: "a",
  lt: "m"
})
```

* `gt: "a"` - greater than "a"
* `lt: "m"`  - less than "m"

---
# thinking lexicographically

keys are sorted by their string values:

* aaaaa
* bb
* ccccc

---
# numbers get converted into strings!

* "1"
* "12"
* "3"
* "4"
* "555"
* "6"

---
# organizing your keys

key/value structure we might use for
a user/post system:

``` json
[{"key":"user!substack","value":{"bio":"beep boop"}},
{"key":"user!maxogden","value":{"bio":"cats."}},
{"key":"post!substack!2015-01-04 11:45","value":"cool beans"}]
{"key":"post!maxogden!2015-01-03 17:33","value":"soup."}]
```

---

This will let us efficiently query for a user's posts:

``` js
db.createReadStream({
  gt: "post!substack",
  lt: "post!substack!~"
})
```

---

In either case,
what if we want to get ALL the posts on the system?

---
# secondary indexes

We can use `.batch()` to create multiple keys for each post:

``` js
var now = new Date().toISOString()
var id = crypto.randomBytes(16).toString('hex')
var subkey = now + '!' + id
db.batch([
  {type:'post',key:'post!substack!'+subkey,value:msg},
  {type:'post',key:'post!'+subkey,value:msg},
])
```

---
# querying our indexes

now to get all the posts system-wide sorted by date,
we can do:

``` js
db.createReadStream({
  start: "post!",
  end: "post!~"
})
```

---
# subleveldown

we can create nested sub-databases with subleveldown:

``` js
var level = require('level')
var sublevel = require('subleveldown')
var db = level('whatever.db')

var catsdb = sublevel(db, 'cats')
var robodb = sublevel(db, 'robots')

catsdb.put('msg', 'meow')
robodb.put('msg', 'beep boop')
```

and `catsdb` and `robodb` will each key a unique namespace
for a `msg` key.

---
# level-livefeed

subscribe to a live feed of changes to the database

``` js
var liveStream = require('level-livefeed')
var stream = liveStream(db, {})
```

---
# designing modules

* only do `require('level')` at the outermost layer
* your module should expect to be passed a db instance

---
# leveldb in the browser

* `require('level-browserify')` instead of `require('level')`

Uses IndexedDB internally to present the levelup API.

---
# what to store and not store in level

* best for tiny documents
* documents can point at binary data by hash

some good modules for blob storage:

* content-addressable-blob-store
* hypercore (can also replicate!)
* webtorrent
* torrent-blob-store


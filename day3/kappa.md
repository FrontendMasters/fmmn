# kappa architecture

enterprise architecture

* immutable, append-only logs are the source of truth
* materialized views built from the logs

also good for p2p!

---
# append-only logs

* use hashes to build a merkle DAG
* trivial naive replication: concatenate

---
# hyperlog

append-only merkle DAG log store

* link to other documents by cryptographic hash
* hooks for cryptographic signing and vertification

``` js
var level = require('level')
var hyperlog = require('hyperlog')
var log = hyperlog(level('log.db'), { valueEncoding: 'json' })
```

---
# hyperlog-index

build materialized views on top of a hyperlog

``` js
var indexer = require('hyperlog-index')
var dex = indexer({
  log: log,
  db: db,
  map: function (row, next) {
    // store data for row then call next()
  }
})
```

---
# hyperkv

* p2p key/value store as a materialized view over a hyperlog
* multi-value register conflict strategy

``` js
var hyperkv = require('hyperkv')
var kv = hyperkv({ log: log, db: db })
```

---
# multi-value register

instead of picking a "winner", accept plurality

for any given key, there could be many legitimate values

---
# hyperkv

``` js
kv.put(key, value, { links: links }, cb)
kv.get(key, function (err, values) {
  // could be many forks!
})
```

---
# hyperlog-sodium

more easily configure hyperlog for cryptographic signing

---
# kappa architecture examples

* secure scuttlebutt - p2p social database
* osm-p2p - map database built on hyperlog, hyperkv, hyperlog-kdb-index
* dat/hyperdrive - p2p file sync over an append-only merkle DAG log

---
# webrtc swarm with hyperlogs

```
var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var level = require('level-browserify')
var hyperlog = require('hyperlog')
var log = hyperlog(level('whatever'), { valueEncoding: 'json' })
var sw = swarm(signalhub('cool-swarm'))
sw.on('peer', function (stream, id) {
  stream.pipe(log.replicate({ live: true })).pipe(stream)
})
```

---
# project idea

p2p wiki in the browser with cryptographic signing
over a webrtc swarm using:

* hyperlog
* hyperkv
* chloride
* level-browserify
* webrtc-swarm
* images using hypercore? (and multiplexing the replication stream)


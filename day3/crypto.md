# crypto

---
# hashes

``` js
var createHash = require('crypto').createHash
var createHash = require('createHash')

var stream = createHash(algorithm)
```

algorithms:

* sha1
* sha256
* sha512
* md5

---
# symmetric ciphers

* requires a shared secret (like a password)

---
# asymmetric crypto

* public/private keypairs
* need to know somebody's public key to send them a secret message

---
# random number generator

secure entropy needed for generating keys, nonces

``` js
window.crypto.getRandomValues(new Uint8Array(8))
```

If your RNG is bad, your crypto will be bad.

---
# don't roll your own crypto™

very easy to mess something up

* replay attacks
* timing attacks
* padding/compression oracle attacks
* side channels
* downgrade attacks

so many: https://en.wikipedia.org/wiki/Category:Cryptographic_attacks

---
# use libsodium/nacl

* works in node and the browser
* `require('chloride')`
* uses only good crypto algorithms
* resists timing attacks

---
# sodium generate keypairs

```
var sodium = require('chloride')
console.log(sodium.crypto_sign_keypair())
console.log(sodium.crypto_box_keypair())
```

---
# combined vs detached

* combined mode - output contains the original message + signature
* detached mode - output contains only the signature

---
# sodium sign/verify combined

``` js
var signedData = sodium.crypto_sign(msg,secretKey)
var msg = sodium.crypto_sign_open(signedData,publicKey)
// msg is undefined if the signature failed
```

---
# sodium sign/verify detached

``` js
var sig = sodium.crypto_sign_detached(msg, secretKey)
var ok = sodium.crypto_sign_verify_detached(sig,msg,publicKey)
```

---
# sodium authenticated encryption combined

symmetric cipher with message authentication code (MAC)
to prevent tampering

``` js
var nonce = crypto.randomBytes(24)
var key = crypto.randomBytes(32)
var cipherText = sodium.crypto_secretbox_easy(msg, nonce, key)
var clearText = sodium.crypto_secretbox_open_easy(cipherText, nonce, key)
```

---
# sodium public key encrypt combined

``` js
sodium.crypto_box_easy()
sodium.crypto_box_open_easy()
```

etc

---
# secret connection

npm install secret-handshake pull-stream-to-stream

---
# merkle DAGs

* hash every document
* point to other docs by their hash inside the doc itself

examples:

* git
* ipfs
* secure scuttlebutt
* dat/hypercore

---
# merkle DAGs

security properties:

* tamper-proof: changing a doc changes every hash that points at it
* with signing, docs are also authenticated

you can receive merkle DAG nodes from untrusted peers over gossip protocols

---
# merkle DAGs

demo: DIY merkle DAG using shasum


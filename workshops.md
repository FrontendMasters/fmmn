# day 1: command-line

Learn the command-line.

So many reference materials, open source tools, blog posts, and job descriptions
assume command-line proficiency, but the resources for learning the command-line
effectively are scattered and largely unhelpful for people who aren't already
familiar with how to get by in a unix system.

Join James Halliday (substack) as we dive into the command-line. You will:

* Become comfortable with the unix command-line using the bash shell.
* Log in to remote servers to edit files and run commands.
* Edit files with vim, a command-line text editor.
* Search and match patterns using regular expressions.
* Automate command-line tasks with their own shell scripts.
* Administer user permissions and system services.

## schedule

* 08:30 - system check, hello
* 09:00 - commands, input/output, and some history
* 09:30 - directories and files, environment variables, flags
* 10:00 - pipes, redirects, scripts, interpolation
* 10:30 - permissions, signals, job control
* 11:00 - user accounts, ssh, public keys
* 11:30 - screen
* 12:00 - lunch etc
* 13:00 - services, init scripts, cron
* 13:30 - regular expressions, grep, sed
* 14:30 - vim basics and practice
* 16:00 - closing notes and wrap up

We will start out the day by covering basic command-line concepts hands-on.
These skills will build up into more advanced techniques and we will begin to
apply our growing knowledge of the command-line and common utility programs by
writing shell scripts, connecting to remote servers over ssh, and administering
user accounts, permissions, and system services.

After lunch, we will use regular expressions to search for patterns and format
text. We will edit text files on the command-line with vim.

## who is this for?

This workshop is for people who want to become effective at the command-line.
Students should be comfortable computer users, but no programming or prior
command-line experience is required.

If you've recently learned some programming, plan to learn programming soon, or
have been programming for a while but never got around to learning the
command-line and a unix system in depth, this workshop is for you!

## prerequisites

Bring a computer running a unix operating system such as GNU/Linux or MacOSX.

If you have a Windows computer, please install Linux. Most Linux installers will
let you dual boot your computer into both Linux and Windows if you want to keep
Windows around. If you don't know where to start, download Ubuntu from
https://www.ubuntu.com/ and install from a bootable USB stick.

---
# day 2: networking and streams

Learn about networking and node.js streams.

Streams let you glue together sources and sinks of I/O with backpressure to
produce effective data pipelines for processing data. How do streams relate to
network protocols such as TCP, HTTP, and websockets?

Join James Halliday (substack) as we dive into networking with streams. You
will:

* Use curl and netcat to send and receive network requests.
* Learn the stream types: readable, writable, transform, duplex.
* Use stream modules from npm to build streaming pipelines.
* Learn about text-based network protocols such as http, irc, and email.
* Write tcp, http, and websocket servers and clients using node.js.
* Build symmetric streaming protocols.

## schedule

* 08:30 - system check, hello
* 09:00 - TCP, UDP, and netcat
* 09:30 - text-based network protocols
* 10:00 - http servers, headers, and curl
* 11:00 - streaming interface basics
* 11:30 - basic stream modules
* 12:00 - lunch etc
* 13:00 - streaming transports galore: websockets, webrtc, p2p
* 13:30 - advanced streaming modules
* 14:00 - implementing core streams
* 15:00 - rpc, multiplexing, and symmetric protocols
* 16:00 - closing notes and wrap up

## who is this for?

This workshop is for people who want to learn more about streams in node.js and
the network protocols and fundamentals that streams sit on top of.

If you know some node.js or frontend js but want to dive deeper into how a
server and client work and how to write glue around IO, this workshop is for
you!

## prerequisites

You should have some familiarity with javascript and the command-line.

---
# day 3:  leveldb and crypto

Learn about crypto basics and leveldb, a modular database.

Cryptography provides a foundation for secure communications and distributed systems.
LevelDB provides a modular ecosystem to persist and query data in node.js and
the browser. These techniques will let you build completely different kinds of
webapps that are fault tolerant, work offline, and can even replicate p2p.

Join James Halliday (substack) as we dive into crypto fundamentals and leveldb.
You will:

* Sign, verify, and encrypt with libsodium/nacl.
* Use cryptographic hashes to build secure data structures.
* Store data in the browser using IndexedDB wrappers.
* Design modular data schemas over lexicographic keys.
* Build data pipelines for live, streaming data.
* Synchronize data and build indexes using the kappa architecture

All of the content relies on libraries that work in both node.js and the
browser.

## schedule

* 08:30 - system check, hello
* 09:00 - querying and updating data
* 09:30 - thinking lexicographically
* 10:00 - modular database design
* 10:30 - leveldb in the browser
* 11:00 - hashes and signing
* 11:30 - merkle DAGs and secure data structures
* 12:00 - lunch etc
* 13:00 - asymmetric and symmetric encryption
* 13:30 - logs, materialized views, and the kappa architecture
* 14:30 - project: verified secure gossip network
* 16:00 - closing notes and wrap up

## who is this for?

This workshop is for people who are proficient in javascript and want to explore
some advanced concepts and architectures.

If you know your way around node.js or frontend and you want to know how to
build offline-first, secure applications, this workshop is for you!

A knowledge of node.js streams will be beneficial but is not strictly required.

# day 4: testing and modular frontend

Learn how to write unit tests for node.js and the browser and build up a modular
frontend brick by brick.

Join James Halliday (substack) as we dive into javascript testing fundamentals
and modular frontend development. You will:

* Write unit tests that run in node.js and the browser.
* Set up code coverage, build scripts, and continuous integration.
* Learn cutting edge front-end architectures.
* Build a modern webapp from zero.
* Run the same code on the server and the client.
* Automate tasks with npm scripts.

## schedule

* 08:30 - system check, hello
* 09:00 - assert and the test anything protocol
* 09:30 - testing in the browser
* 10:00 - code coverage and the AST
* 10:30 - testing workflows
* 11:00 - package.json scripts
* 11:30 - template strings
* 12:00 - lunch etc
* 13:00 - routing and servers
* 13:30 - diy redux
* 14:00 - realtime modules
* 14:30 - browser api modules
* 15:00 - webaudio, webgl, etc!
* 16:00 - closing notes and wrap up

## who is this for?

This workshop is for people who want to know how to start testing and how to
quickly whip up modern web apps without having to wade through a bunch of
boilerplate or configuration.

If you know javascript but you haven't started writing tests or if you want to
make webdev fun again, this workshop is for you!

## prerequisites

You should have some familiarity with javascript.


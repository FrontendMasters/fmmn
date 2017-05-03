# networking

servers, clients, and protocols!

---
# servers and clients

Any networked computer can be a server,
any networked computer can be a client!

---
# packets

tiny chunks of data

For example, if we have a payload:

```
This is the message we want to send. It contains
information. XXXX YYyY ZZzZ QRSTUV ABCDEFG BLAH BLAH.
```

it might get broken up into multiple packets:

    This is the message we want to send. It conta

and:

    ins
    information. XXXX YYyY ZZzZ QRSTUV ABCDEFG BLAH BLAH.

---
# tcp vs udp

TCP - reliable transport: if a packet is not acknowledged
(ACK) on the other end, it gets resent

UDP - unreliable transport: packets are sent but there is no
confirmation that the packet was received at the other end

---
# tcp vs udp uses

UDP - sometimes used for streaming video and audio, some games

TCP - everything else

---
# protocols

the language that computer programs speak to each other

Examples of network protocols:

* HTTP - browse web pages
* HTTPS - browse web pages with encryption
* SMTP - send and receive emails
* IMAP, POP3 - load emails from an inbox
* IRC - chat
* FTP - file transfer
* SSH - remote shell over an encrypted connection
* SSL - low-level secure data transfer (used by HTTPS)

---
# ports

Each computer can have many services.

A port is a number between 1 and 65535 that 
differentiates among the services on a system.

---
# customary ports

Any service can listen on any port, but there are customary
ports for many protocols:

* 21 - ftp (control port)
* 22 - ssh
* 25 - smtp
* 80 - http
* 443 - https
* 3306 - mysql
* 5432 - postgresql
* 5984 - couchdb
* 6667 - irc

---
# port and permissions

By default, systems can only listen to ports below 1024 as
the root user:

```
$ nc -lp 1024
^C
$ nc -lp 1023
Can't grab 0.0.0.0:1023 with bind : Permission denied
```

---
# servers

Sometimes when people say "server" they mean a computer
program that listens for incoming connections.

Other times when people say "server" they mean a computer
that is configured to run server programs.

Any computer can be a server!

---
# clients

Clients are computer programs that connect to servers.

initiate a connection

Any computer can be a client!

---
# peer to peer

Aside from servers and clients, there is a third role in
computer networks: peer.

In a peer to peer network, clients establish connections
directly to other clients. Nodes in the network are
symmetric with no fixed central servers.

Examples of peer to peer protocols:

* bittorrent
* webrtc

---
# netcat

netcat can create tcp and udp connections and servers

```
sudo apt-get install netcat
```

With netcat you can speak tcp directly.

---
# netcat server and client

```
$ nc -lp 5000
```

or if that doesn't work try:

```
$ nc -l 5000
```

then connect to your server in another terminal:

```
$ nc localhost 5000
```

Type messages in each session and see the messages on the
other session.

---
# http

hypertext transfer protocol

how web servers and web browsers communicate

---
# http verbs

HTTP requests begin with a VERB.
Here are some things each VERB is used for:

* GET - fetch a document
* POST - submit a form
* HEAD - fetch metadata about a document
* PUT - upload a file

---
# http headers

Next come the headers.

Headers have a key followed by a colon followed by a value:

```
key: value
```

---
# http

```
$ nc google.com 80
GET / HTTP/1.0
Host: google.com


```

Make sure to hit `return` twice after `Host: google.com`.

---
The server responds with a version and status code
(301 means redirect) followed by some headers.

The body is separated from the headers by an empty line:

```
HTTP/1.0 301 Moved Permanently
Location: http://www.google.com/
Content-Type: text/html; charset=UTF-8
Date: Mon, 12 Jan 2015 01:26:19 GMT
Expires: Wed, 11 Feb 2015 01:26:19 GMT
Cache-Control: public, max-age=2592000
Server: gws
Content-Length: 219
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
Alternate-Protocol: 80:quic,p=0.02

<HTML><HEAD><meta http-equiv="content-type"
content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.com/">here</A>.
</BODY></HTML>
```

---
```
$ nc google.com 80
GET / HTTP/1.0
Host: www.google.com

HTTP/1.0 200 OK
Date: Mon, 12 Jan 2015 01:26:34 GMT
Expires: -1
Cache-Control: private, max-age=0
Content-Type: text/html; charset=ISO-8859-1
Set-Cookie: PREF=ID=ef742f69ec142ebf:FF=0:TM=1421025994:LM=1421025994:S=F1aTCyHJIJ82Pk1n; expires=Wed, 11-Jan-2017 01:26:34 GMT; path=/; domain=.google.com
Set-Cookie: NID=67=bsMXxsgStx4qF_9eM34aG2sYr_-tJpQsh2IW0CUQx3I2K8-HAfbAm1LKcuHZUMfFwupYqdrthJAN-PguV9ftUtEtr5Tb3NUvJ6zIutDXtEQxb_SDoSpYiHpYrPpkJW1x; expires=Tue, 14-Jul-2015 01:26:34 GMT; path=/; domain=.google.com; HttpOnly
P3P: CP="This is not a P3P policy! See http://www.google.com/support/accounts/bin/answer.py?hl=en&answer=151657 for more info."
Server: gws
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
Alternate-Protocol: 80:quic,p=0.02
Accept-Ranges: none
Vary: Accept-Encoding
```
---
# http post

Forms in html are often delivered with a POST:

```
POST /form HTTP/1.1
Host: localhost
Content-Length: 51
Content-Type: application/x-www-form-urlencoded

title=whatever&date=1421044443&body=beep%20boop%21
```
---
using this simple node http server,
we can decode the POST body:

``` js
var http = require('http')
var parseform = require('body/any')

var server = http.createServer(function (req, res) {
  console.log(req.method, req.url, req.heders)
  parseform(req, res, function (err, params) {
    console.log(params)
    res.end('ok\n')
  })
})
server.listen(5000)
```
---
When the POST payload arrives and is decoded, we get:

```
$ node server.js
{ title: 'whatever', date: '1421044443', body: 'beep boop!\n' }
```
---
and the server responds with:

```
HTTP/1.1 200 OK
Date: Mon, 12 Jan 2015 06:37:51 GMT
Connection: keep-alive
Transfer-Encoding: chunked

3
ok

0
```
---
# curl

You can also send http requests with the curl command:

```
$ curl -s http://substack.net
```

issues a GET request to substack.net and prints the body.

To see just the headers, use `-I`:

```
$ curl -sI http://substack.net
```

The `-s` gets rid of annoying progress output.

---
# curl: issuing a POST

Use `-X` to set the http verb (POST) and `-d` to set
form parameters:

```
$ curl -X POST http://localhost:5000 -d title=whatever \
  -d date=1421044443 -d body='beep boop!'
```

---
# smtp

smtp is the protocol used to deliver email messages.

Here we can send an email from `trump@whitehouse.gov` to
`substack@localhost`.

The lines that start with a number are messages from the
server.

---
```
$ nc localhost 25
220 zzz ESMTP Exim 4.84_2 Tue, 02 May 2017 21:29:36 -0700
helo localhost
250 zzz Hello localhost [127.0.0.1]
mail from: trump@whitehouse.gov
250 OK
rcpt to: substack@localhost
250 Accepted
data
354 Enter message, ending with "." on a line by itself
Subject: FAKE NEWS

You're fired.
.
250 OK id=1d5lvL-00026H-DW
quit
221 zzz closing connection
```
---
Since this email was sent locally, I can read the message
with the `mail` command:

```
$ mail
Mail version 8.1.2 01/15/2001.  Type ? for help.
"/var/mail/substack": 1 message 1 new
>N  1 trump@whitehouse.  Tue May 02 21:30   16/491   FAKE NEWS
```
---
Seems legit:

```
& n
Message 1:
From trump@whitehouse.gov Tue May 02 21:30:09 2017
Envelope-to: substack@localhost
Delivery-date: Tue, 02 May 2017 21:30:09 -0700
Subject: FAKE NEWS
From: trump@whitehouse.gov
Date: Tue, 02 May 2017 21:30:05 -0700

You're fired.

```
---
# irc

irc is an ancient text-based chat protocol that is still
very popular among programmers.

To play around, pick a nick (like whatevz) and hop on a
server (such as irc.freenode.net):

```
$ nc irc.freenode.net 6667
nick whatevz
user whatevz whatevz irc.freenode.net :whatevz
join #cyberwizard
privmsg #cyberwizard :hack the planet!
```

---
# irc commands

* nick - identify as a user
* user - also identify as a user
* join - join a channel
* privmsg - send a message to a channel

---
# text protocols

So far, we've seen a number of text protocols:

* http
* smtp
* irc

These are nice protocols to implement because you can
inspect the data going over the wire visually and type
requests using the keyboard.

---
# binary protocols

In binary protocols, you can't just type messages with the
keyboard like we've been doing. You've got to write programs
that unpack the incoming bytes and pack outgoing bytes
according to the specification.

---
# ssh

```
$ nc substack.net 22
SSH-2.0-OpenSSH_6.0p1 Debian-4+deb7u2
help
Protocol mismatch.
```

Aside from the initial greeting, the rest of the ssh
protocol expects binary.

---
Luckily, the ssh command does the work of speaking the
protocol for us:

```
$ ssh substack.net
substack@origin : ~ $ 
```

---
# inspecting protocols

To inspect protocols, you can capture everything coming out
of and into your wireless or ethernet card using:

* wireshark for a graphical tool
* tcpdump for a command-line tool

---
# tcpdump

First install tcpdump:

    sudo apt-get install tcpdump

then do:

```
$ sudo tcpdump -X
```

to see each packet with a hexadecimal representation in the
middle and ascii on the right.

---
To filter the output so that we only see HTTP traffic, we
can filter the output to only show traffic on port 80:

```
$ sudo tcpdump 'tcp port 80' -X
```
---
If you look carefully, there are HTTP requests:

```
23:07:37.655461 IP 10.0.0.2.40646 > 104.131.0.235.http: Flags [P.], seq 1:77, ack 1, win 115, options [nop,nop,TS val 62572874 ecr 2756441271], length 76
0x0000:  4500 0080 0231 4000 4006 c4d7 0a00 0002  E....1@.@.......
0x0010:  6883 00eb 9ec6 0050 ece3 cb1c 857a efc5  h......P.....z..
0x0020:  8018 0073 15ec 0000 0101 080a 03ba c94a  ...s...........J
0x0030:  a44b f4b7 4745 5420 2f20 4854 5450 2f31  .K..GET./.HTTP/1
0x0040:  2e31 0d0a 5573 6572 2d41 6765 6e74 3a20  .1..User-Agent:.
0x0050:  6375 726c 2f37 2e32 362e 300d 0a48 6f73  curl/7.26.0..Hos
0x0060:  743a 2073 7562 7374 6163 6b2e 6e65 740d  t:.substack.net.
0x0070:  0a41 6363 6570 743a 202a 2f2a 0d0a 0d0a  .Accept:.*/*....
```
---
and HTTP responses:

```
0x0030:  03bb 7d44 4854 5450 2f31 2e31 2032 3030  ..}DHTTP/1.1.200
0x0040:  204f 4b0d 0a63 6f6e 7465 6e74 2d74 7970  .OK..content-typ
0x0050:  653a 2074 6578 742f 6874 6d6c 0d0a 4461  e:.text/html..Da
0x0060:  7465 3a20 4d6f 6e2c 2031 3220 4a61 6e20  te:.Mon,.12.Jan.
0x0070:  3230 3135 2030 373a 3130 3a32 3420 474d  2015.07:10:24.GM
0x0080:  540d 0a43 6f6e 6e65 6374 696f 6e3a 206b  T..Connection:.k
0x0090:  6565 702d 616c 6976 650d 0a54 7261 6e73  eep-alive..Trans
```
---
and HTML:

```
0x01a0:  0d0a 3137 3136 0d0a 3c68 3120 6964 3d22  ..1716..<h1.id="
0x01b0:  6f66 666c 696e 652d 6465 6365 6e74 7261  offline-decentra
0x01c0:  6c69 7a65 642d 7369 6e67 6c65 2d73 6967  lized-single-sig
0x01d0:  6e2d 6f6e 2d69 6e2d 7468 652d 6272 6f77  n-on-in-the-brow
0x01e0:  7365 7222 3e6f 6666 6c69 6e65 2064 6563  ser">offline.dec
0x01f0:  656e 7472 616c 697a 6564 2073 696e 676c  entralized.singl
0x0200:  6520 7369 676e 2d6f 6e20 696e 2074 6865  e.sign-on.in.the
0x0210:  2062 726f 7773 6572 3c2f 6831 3e0a 3c70  .browser</h1>.<p
```
---
also try:

```
$ sudo tcpdump 'tcp port 80' -A
```
---
If you run `tcpdump` on a wifi connection,
you will also see unencrypted traffic from other users.

Please respect their privacy!

But also note that anyone could be sniffing in on your
unencrypted traffic, and not just at the level of wifi.

---
# protocol links

* [smtp rfc](http://www.faqs.org/rfcs/rfc821.html)
* [irc rfc](http://www.faqs.org/rfcs/rfc2812.html)
* [http rfc](http://www.faqs.org/rfcs/rfc2616.html)

---
EOF

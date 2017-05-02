# regular expressions

regex is a pattern-matching language

many programming languages and system tools
have a regex engine

---
# system tools with regex

* grep
* sed
* perl
* vim
* less

---
# regex in javascript

* str.split(re)
* str.match(re)
* str.replace(re,
* re.test(str)
* re.exec(str)

---
# common regex format

* `/PATTERN/` - match
* `s/PATTERN/REP/` - replace

You can also have FLAGS at the end:

* `/PATTERN/FLAGS`
* `s/PATTERN/REP/FLAGS`

---
# sometimes you need the slashes

```
$ echo cat cabbage | sed 's/a/@/g'
c@t c@bb@ge
```

---
# sometimes the slashes are implied

```
$ echo -e 'one\ntwo\nthree' | grep ^t
two
three
```

---
# sometimes the slashes are not slashes at all

```
$ echo 'xyz party' | sed 's!xyz!cat!'
cat party
```

---
# replacing in javascript

``` js
'1 two three\n'.replace(/1/, 'one')
```

similar to:

``` sh
echo '1 two three' | sed 's/1/one/'
```

---
# match testing in javascript

``` js
if (/^-(h|-help)$/.test(process.argv[2])) {
  console.log('usage: ...')
}
```
---
# capturing in javascript

``` js
var m = /^hello (\S+)/.test('hello cat')
console.log(m[1]) // cat
```

---
# splitting in javascript

``` js
> 'one_two-three'.split(/[_-]/)
[ 'one', 'two', 'three' ]
```

---
# flags

```
/PATTERN/FLAGS
s/PATTERN/REP/FLAGS
```

* i - case insensitive
* g - match all occurences (global)
* m - treat string as multiple lines
* s - treat string as a single line

---
# metacharacters

* `.` matches any character
* `?` - zero or one time
* `*` - zero or more times
* `+` - one or more times

* `[]` - character class
* `^` - anchor at the beginning
* `$` - anchor to the end

* `(a|b)` - match a or b

* `()` - capture group
* `(?:)` non capture group

* `\d` - digit `[0-9]`
* `\w` - word `[A-Za-z0-9_]`
* `\s` - whitespace `[ \t\r\n\f]`

---
`.` matches any character

```
$ echo hello beep boop | sed 's/b..p/XXXX/g'
hello XXXX XXXX
```

---
# quantifiers

* `?` - zero or one time
* `*` - zero or more times
* `+` - one or more times

```
$ echo 'dog and doge' | sed 's/doge\?/DOGE/g'
DOGE and DOGE
$ echo 'beep bp beeeeep' | sed 's/be*p/BEEP/g'
BEEP BEEP BEEP
$ echo 'beep bp beeeeep' | sed 's/be\+p/BEEP/g'
BEEP bp BEEP
```

---
# when to escape metacharacters

In some engines, you need to escape metacharacters
such as `+` and `?`. In others, you don't.

In javascript and perl, you generally don't need to
escape metacharacters. To use sed and grep in a
similar way, use:

* `sed -r`
* `grep -E`

---
# character class

`[...]`

Any characters inside the square brackets will
match.

For example, to match a vowel character: `[aeiou]`.

```
$ echo 'beep and boop' \
| sed 's/b[aeiou]\+p/BXXP/g'
BXXP and BXXP
```

---
# character class ranges

`[A-Z]`

You can use `-` to specify ranges.

```
$ echo 'beep and boop' | sed 's/[a-f]/X/g'
XXXp XnX Xoop
```

---
# negated character class

`[^...]`

Put a `^` after the opening square bracket in a
character class to negate it.

For example, to match a non-vowel character: `[^aeiou]`

```
$ echo 'beep boop' | sed 's/[^aeiou]/Z/g'
ZeeZZZooZ
```

---
# character class sequences

Regex engines provide many pre-defined character class sequences:

* `\w` - word character: `[A-Za-z0-9_]`
* `\W` - non-word character: `[^A-Za-z0-9_]`
* `\s` - whitespace: `[ \t\r\n\f]`
* `\S` - non-whitespace: `[^ \t\r\n\f]`
* `\d` - digit: `[0-9]`
* `\D` - non-digit: `[^0-9]`

---
# anchors

* `^` - anchor at the beginning
* `$` - anchor to the end

---
# groups

(a|b) - match a or b

* `()` capture group
* `(?:)` non capture group

---
# capture groups in sed

```
$ echo 'hey <cool> whatever' | sed -r 's/<([^>]+)>/(\1)/g'
hey (cool) whatever
```

---
# back references in sed

```
$ echo 'hey cool cool beans' | sed -r 's/(\S+) \1/REPEATED/'
hey REPEATED beans
```

---
# capture groups in javascript

``` js
var str = 'hey <cool> whatever'
var m = /<([^]+)>/.exec(str)
console.log(m[1]) // cool
```

``` js
var str = 'hey <cool> whatever'
console.log(str.replace(/<([^]+)>/,'MATHEMATICAL'))
```


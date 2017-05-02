# vim

vim is a popular command-line text editor

---
# vim cheat sheet

Keep this handy as you experiment with vim:

http://www.fprintf.net/vimCheatSheet.html

Here is another guide that covers the commands
incrementally:

http://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/

---
# why vim?

* edit files on a remote server over ssh
* works without a graphical desktop environment
* many programming-specific features
* really fast editing

---
# why vim - remote editing

When you log in over ssh to administer a server,
all you've got is a command-line interface.

If you are comfortable with vim, you can work on
the remote system with the same ease and
familiarity as your local environment.

---
# why vim - graphics not required

Not all systems have graphical environments!

What do you do if the graphical environment on
your computer stops working?

What if you want to configure a device that
doesn't have a graphics card?

---
# why vim - programming-specific features

vim is very carefully tuned to be effective for
programming.

* easily change the indentation on blocks of text
* syntax highlighting for many programming languages
* fluid interface with the system shell

---
# why vim - really fast editing

vim is designed from the ground-up to be very fast
to use once you've learned its terse commands

Many of the commands are designed to keep your
fingers on the home row of the keyboard so that
you can drift seemlessly between editing and
typing.

---
# alternatives

Here are some other command-line text editors:

* nano
* emacs
* vi

nano is much easier to learn than vim because it
doesn't have many features.

emacs has a huge number of features and is very
configurable

vi is a precursor to vim from 1983. vi's features
are a subset of vim, and vi tends to already be
installed on many systems.

---
# interface

Unlike many command-line programs, vim is
interactive.

vim uses ANSI codes to control a cursor and
position blocks of text on the screen.

---
# ansi codes

ANSI codes are special instructions that your
terminal interprets and renders.

ANSI codes can:

* move the text cursor around
* change colors
* set modes

---
# ansi codes - colors!

Try this command:

```
$ echo -e '\x1b[38;5;44mwow'
```

also try changing "44" to some other values.

Try stacking multiple color codes:

```
$ echo -e '\x1b[38;5;44mso \x1b[38;5;33mcool'
```

---
brighter version:

```
$ echo -e '\x1b[1m\x1b[38;5;44mso\x1b[38;5;1mcool'
```

Play around! Here is a list of some codes:
https://en.wikipedia.org/wiki/ANSI_escape_code#CSI_codes

---
# ansi codes

Applications like vim make heavy use of ansi codes.

---
# and now: let's learn vim!

First: type `vim`

If that doesn't work, install vim.

On a debian or ubuntu system do:

```
sudo apt-get install vim vim-common
```

to get vim plus extras like syntax hilighting.

---
# now we're in vim!

Type `i` to go into insert mode.

Now you can type normally.

---
# saving and quitting

Hit `esc` to get out of insert mode.

Now type:

    :w foo.txt

to save your file as `foo.txt`.

---
You can go back into insert mode by typing `i`
again or you can quit by typing:

    :q

Once you've quit, you can open your file back up
again by running:

    $ vim foo.txt

---
or you can do just `vim` and then from command
mode do:

    :o foo.txt

If you've opened a file already, you can just type
`:w` to save the file, you don't need to type its
name every time.

---
# modes

Time to recap what just happened!

The first thing you'll notice is how we used 2
modes: command mode and insert mode.

If you're in command mode, press `i` to go into
insert mode.

If you're in insert mode, press `esc` to go into
command mode.

---
If it says `-- INSERT --` at the bottom left of
your terminal, you're in insert mode!

Otherwise you're in command mode.

---
# vim is a language

Next, let's combine some commands.

Try `:wq` to save and then quit.

Try `:q!` to quit without saving.

---
# moving around - hjkl

In insert mode, the arrow keys do work, but you
should practice not using them!

Instead, in command mode:

* h - moves left one character
* j - moves down one line
* k - moves up one line
* l - moves right one character

---
# hjkl elsewhere...

* the `less` command uses j and k for up and down
* https://twitter.com - j and k
* many tiling window managers such as xmonad

---
# moving around - even more!

You can move all kinds of places quickly in
command mode:

* ^ or 0 - move to the start of the current line
* $ - move to the end of the current line
* gg - jump to the beginning of the file
* G  - jump to the end of the file

---
# delete

There are so many ways to delete!

* x - delete the character under the cursor
* dd - delete the current line
* d$ or D - delete from the cursor to the end of
  the current line
* d0 or d^ - delete from the cursor to the start
  of the current line

---
You'll notice that we've already seen `0` and `$`
before! You can repurpose each of the moving
around commands to delete text.
These all work:

* dG - delete from the current position to the end
  of the file
* dgg - delete from the current position to the
  start of the file
* dj - delete the current line and the line below
* dk - delete the current line and the line above
* 2dd, 3dd etc - delete the next N lines

---
Even `dl` and `dh` work!

Remember that vim is a language!

---
# searching

You can search for text using regular expressions.

* /PATTERN - search forward for PATTERN
* ?PATTERN - search backward for PATTERN

Press:

* n - jump to the next match
* N - jump to the previous match

---
PATTERN is a regular expression, but you can just
treat it as an ordinary text match for the most
part.

You can combine searching with deleting too:

* d/PATTERN - delete to the next match of PATTERN
* d?PATTERN - delete to the previous match of PATTERN
* dn - delete to the next already matched pattern
* dN - delete to the previous already matched pattern

---
# jumping

You can also skip ahead to individual characters
in a simple way on the current line:

* f + CHAR - search forward on the current line to CHAR
* t + CHAR - search forward on the current line to
  the character before CHAR
* F + CHAR - search backward on the current line to CHAR
* T + CHAR - search backward on the current line
  to the character after CHAR

---
These are very useful in combination with the
delete operators! They combine as you might
expect:

* df + CHAR - delete forward on the current line to CHAR
* dt + CHAR - delete forward on the current line
  to the character before CHAR
* dF + CHAR - delete backward on the current line to CHAR
* dT + CHAR - delete backward on the current line
  to the character after CHAR

---
# search and replace

    :s/PATTERN/REPLACEMENT/FLAGS

Try these on a line with the string cats:

    :s/cat/dog/
    :s/cat/dog/g
    :s/cat/dog/i

---
# replace everything

    :%s/cat/dog/ig

Replaces "cat" with dog everywhere in the entire
file, case insensitively.

---
# regex flags

* i - case insensitive
* g - global replace (per line)

---
# visual select

Press `v` to go into visual select mode.
Move the cursor around to select text.

Once you've selected a block, you can press:

* `y` - "yank" the text into the paste buffer
* `x` or `d` - delete the selected text
* `>>` - indent the text right by shiftwidth
* `<<` - indent the text left by shiftwidth

---
# paste

Once you've populated the paste buffer by yanking
or deleting, press `p` to paste.

---
# visual modes

* `v` - select by characters
* `V` - select by lines
* ctrl-`v` - select in a block

---
# more insert modes

There are more ways to insert mode than just `i`:

* `o` - go into insert mode, inserting a new line
below the current line
* `O` - go into insert mode, inserting a new line
* above the current line
* `a` - go into insert mode at one character to
the right
* `A` - go into insert mode at the end of the
current line

---
# fancy odds and ends

* `J` - move the next line to the end of the
current line
* (backtick)+`.` - jump to the last edit

---
# insert a file

You can insert a file at the cursor position with:

```
:r otherfile.txt
```

---
# insert with a command in place

You can insert the output of a command at the
cursor position with `:r!`.

For example, to insert the output of the `pwd`
command:

```
:r!pwd
```

---
# .vimrc

* autoindento
* expandtab
* tabstop
* shiftwidth (sw)

my vimrc:

https://gist.github.com/substack/7745bb6ff9ad58d4805d

---
# set -o vi

You can use vi shorthand in bash too!

Just do:

    $ set -o vi

now press esc and hjkl your way around!

----
# escape is too far away!

It's common for vim users to remap their
keyboards.

One common thing to do is swap the caps lock key
with the escape key because escape is such a
common key in vim.

---
# xmodmap for escape

In linux you can use xmodmap to remap your keys.

Save this text to a file called `.xmodmap` in your
home directory:

    remove Lock = Caps_Lock
    keysym Escape = Caps_Lock
    keysym Caps_Lock = Escape
    add Lock = Caps_Lock

---
now run `xmodmap ~/.xmodmap` to enable your
swapped keys.

Add this command to your login scripts so that
each time you log in you won't need to remember to
run the command every time you log in.

---
# built-in escape alternative

You can also use ctrl+`]` to get out of insert mode.

---
# EOF

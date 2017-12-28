# unix

introduction to the unix command-line

---
# unix

UNIX was an operating system developed at AT&T
Bell Labs in the 1960s through the 1980s.

https://www.youtube.com/watch?v=tc4ROCJYbm0

GNU/Linux, MacOSX, and Android are all based on ideas
and specifications created by UNIX.

https://en.wikipedia.org/wiki/File:Unix_history-simple.svg

---
# time-sharing

UNIX was originally built for large mainframe
computers that many people would use at the same
time.

---
# terminals and teleprinters

* teleprinters printed program output on paper
* terminals displayed output on a CRT monitor

Neither device had processing power of their own.

Connected to the mainframe over cables or by telephone.

---
# teletype legacy: standard input and output

Every program on a UNIX system can read input from
the standard input device (stdin) and write to
standard output (stdout).

By default, stdin comes from the keyboard and
stdout gets "printed" to the graphical display.

---
# organization

The UNIX operating system is a collection of
programs, each with a special role:

* kernel
* shell
* utilities

---
# kernel

mediate access between user programs and system resources

* CPU scheduling
* I/O to computer hardware
* memory

Programs request resources by making a syscall.

---
# shell

A shell is a computer program that can execute
other programs from a text-based interface.

In a text-based interface, you interact with a
program completely from the command-line with text
commands and text output.

Most modern shells are strongly influenced by the
first UNIX shells.

---
# shells through the ages

* thompson shell - Ken Thompson 1971
* pwb (mashey) shell - John Mashey 1975
* bourne shell - Stephen Bourne 1977
* c shell (csh) - Bill Joy 1978
* tcsh - Ken Greer and Mike Ellis 1983
* korn shell - David Korn 1983
* bourne again shell (bash) - Brian Fox 1987
* almquist shell (ash) - Kenneth Almquist 1989
* debian almquist shell (dash) - Herbert Xu 1997

incomplete list of popular or influential shells

---
# utilities

Any distribution of UNIX will come with dozens of
other programs that perform narrow single-purpose
tasks.

The available utilities on a given system vary
widely but some utilities are very common.

For example, there is a command to make new
directories and another to move files.

---
# why UNIX still matters

* portable to many kinds of hardware
* consistent conventions
* vast software ecosystem
* text!

---
# places you can find a unix command-line

* wifi routers
* dsl and cable modems
* raspberry pi, beaglebone, nvidia jetson
* android phones
* linux laptop or desktop
* Mac OSX computer
* web server

You can take your command-line skills with
you to all of these platforms and more!

---
# text interface

To remotely access a UNIX system, you can use the
same command-line tools and interface that you use
locally. You can remotely access devices without a
display.

Text is easy to read so you can poke around more
easily to figure out what's going on. Many aspects
of computer programming involve shuffling text
around. UNIX excels at these kinds of tasks.

---
# unix philosophy

The unix philosophy is a set of design principles for
how programs relate to each other.

* each program should do one thing well
* the output of a program can become the input of another

Unix Programming Environment 1984
Brian Kernighan and Rob Pike

---
# let's learn the command line!

bash is a popular shell for UNIX-like systems.

Open up a bash shell for the next sections to
follow along.

If you're not sure which shell you're in, type:

    echo $SHELL

If you're in bash, you sould see something like:

    /bin/bash

---
# list files

You can use the `ls` command to show all the files
in the current directory.

Type `ls` and you should see something like:

    ~ $ ls
    doc  media  notes.txt  projects

---
# arguments

By default, `ls` lists files from the current directory.

You can list files from another directory by
giving `ls` an argument. An argument is just
another piece of text after the `ls`.

---
For example, to list the files in `/` (the root)
we can do:

```
~ $ ls /
bin   etc         lib         media  proc  sbin     sys  var
boot  home        lib64       mnt    root  selinux  tmp  vmlinuz
dev   initrd.img  lost+found  opt    run   srv      usr
```

In this example, `ls` is the command and `/` is the argument.

Commands can have multiple arguments separated by
spaces or no arguments.

---
# print the current directory

To display the current directory, you can use the
`pwd` command:

    $ pwd
    /home/substack

pwd stands for print working directory.


---
# change directory

To change the current working directory, use the
`cd` command. The `cd` command takes a single
argument: the directory to move to.

After changing the current directory, list the
files again with `ls`.

---
```
~ $ ls
doc  media  notes.txt  projects
~ $ cd media
~/media $ ls
3d  audio  avatars  vector  warp
~/media $ cd warp
~/media/warp $ ls
mac.sh*                      mac_startup.mp3  mac_warped.mp3  watch.js
Mac Startup-i9qOJqNjalE.mp4  mac_startup.wav  mac_warp.mp3
```

---
# special directories

There are some special directories:

* `..` - the parent directory
* `.` - the current directory
* `~` - your home directory

To navigate back up to the parent directory, do
`cd ..`.

```
~/media/warp $ cd ..
~/media $ 
```

---
You can also list the parent directory without
changing the current directory by doing `ls ..`:

```
~/media $ ls ..
doc  notes.txt  media  projects
```

You can add paths after `..` too:

```
~/media $ ls ../projects/workshops
computers.markdown  unix.markdown
```

---
Or `ls .` is the same as `ls`:

```
~/media $ ls .
3d  audio  avatars  vector  warp
```

Jump back to your home directory at any time by
typing `cd` with no arguments.

---
# cat

cat was originally written to concatenate all the
files from its arguments:

    ~/doc $ cat beep.txt boop.txt
    BEEP
    BOOP

but it also a handy way to display single text
files on the command-line:

    ~/doc $ cat beep.txt
    BEEP

---
# cp

Copy a file to another directory or file name. You
can copy a single file to make a new duplicate
file:

    ~/doc $ ls
    a.txt

We can copy a.txt to b.txt:

    ~/doc $ cp a.txt b.txt


---
Now there are 2 identical files, `a.txt` and `b.txt`:

```
~/doc $ ls
a.txt  b.txt
```

---
# cp 

You can copy a file or a directory too. Here we'll
copy `a.txt` to the directory called `wow`:

    ~/doc $ mkdir wow
    ~/doc $ ls
    a.txt  b.txt  wow
    ~/doc $ cp a.txt wow

now `wow/` has an `a.txt` file in it:

    ~/doc $ ls wow
    a.txt

---
You can copy to a specific destination file:

```
~/doc $ cp a.txt wow/whatever.txt
~/doc $ ls wow
a.txt  whatever.txt
```

---
# cp (multiple files)

You can even copy multiple files at once to a new
place:

```
~/doc $ mkdir xyz
~/doc $ cp a.txt b.txt xyz/
~/doc $ ls xyz
a.txt  b.txt
```

The last argument is the destination file or
directory and the other arguments are the source
files.

---

# cp -r

If you have a directory full of files and
directories you want to copy to a new place, you
can use `cp -r` to recursively copy a directory
and all its subdirectories to a new location:

```
~/doc $ mkdir xyz/123
~/doc $ cp a.txt xyz/123/
~/doc $ cp -r xyz newxyz
~/doc $ ls newxyz/
123  a.txt  b.txt
~/doc $ ls newxyz/123
a.txt
```

---
Likewise, there is a `-R` for the `ls` command that recursively lists
subdirectories:

```
~/doc $ ls -R newxyz
newxyz:
123  a.txt  b.txt

newxyz/123:
a.txt
```

---
# mv

The `mv` command is used to rename and overwrite
files and directories.

To rename a file, set the first argument to the
original file name and the second argument to the
new file name or destination directory.

---
We can rename `a.txt` to be `pigeon.txt`:

```
~/doc $ mv a.txt pigeon.txt
~/doc $ ls
b.txt  newxyz  pigeon.txt  xyz
```

---
Or we can move a file to a new directory:

```
~/doc $ mv pigeon.txt xyz
~/doc $ ls xyz
123  a.txt  b.txt  pigeon.txt
```

---
We can rename directories just the same as files:

```
~/doc $ mv xyz woo
~/doc $ ls
b.txt  newxyz  woo
~/doc $ ls woo
123  a.txt  b.txt  pigeon.txt
```

---
# mkdir

To make a new directory, just execute the `mkdir`
command with a list of new directory names to make
as arguments:

    $ mkdir hooray

and now a new directory called `hooray` exists.

---
You can create multiple directories at once:

    $ mkdir one two

and now two new directories, `one` and `two`,
exist.

---
# mkdir -p

Suppose we want to make the following nested
directory structure:

    foo/
      bar/
        baz/
        qrs/

---
Instead of doing:

```
~ $ mkdir foo foo/bar foo/bar/baz foo/bar/qrs
```

We can just do:

```
~/doc $ mkdir -p foo/bar/baz foo/bar/qrs
```

and the necessary parent directories `foo/` and
`foo/bar/` will be created automatically.

---
# brace expansion

There is a handy syntax built into bash for
expanding patterns that would be repetitive to
type out by hand.

Instead of doing something like:

    ~/doc $ mkdir -p foo/bar/baz foo/bar/qrs

we can use a list of items between curly braces:

    ~/doc $ mkdir -p foo/bar/{baz,qrs}

which expands to the same command as before.

---
To prove this you can use `echo` to see what the
expansion is:

    ~ $ echo mkdir -p foo/bar/{baz,qrs}
    mkdir -p foo/bar/baz foo/bar/qrs

The items that a brace expansion generates are
separated by spaces as if you had typed out those
words by hand.

---
You can have as many items as you like in a list:

```
~ $ echo robot-{one,two,three,four}-x
robot-one-x robot-two-x robot-three-x robot-four-x
```

---
With brace expansions, you can have multiple expansions:

```
~/doc $ echo robot/{c3po,r2d2}/{sound.mp3,info.txt}
robot/c3po/sound.mp3 robot/c3po/info.txt robot/r2d2/sound.mp3 robot/r2d2/info.txt
```

You can even nest the expansions!

```
~/doc $ echo x-{wing,b{ee,oo}p}
x-wing x-beep x-boop
```

---
# brace expansion sequences

It can be tedious to type out numerical lists by hand.

Brace expansions can help with that:

```
~/doc $ echo wow{1..10}
wow1 wow2 wow3 wow4 wow5 wow6 wow7 wow8 wow9 wow10
```

and you can even specify an amount to skip:

```
~/doc $ echo img{0..100..10}
img0 img10 img20 img30 img40 img50 img60 img70 img80 img90 img100
```

---
# rm

To remove a file, just do:

    ~/doc $ rm b.txt

You can remove multiple files at once:

    ~/doc $ rm newxyz/a.txt newxyz/b.txt

and you can remove entire directories including subdirectories with:

    ~/doc $ rm -r newxyz

Be very careful with `-r`. You might accidentally
delete much more than you meant to delete!

---
# wc

The `wc` command computes the number of lines,
words, and bytes in a file:

    ~ $ wc notes.txt
     3  7 35 /home/substack/notes.txt

To see each field independently, you can use
different options: arguments that start with a `-`
or `--` followed by a letter or word.

---
To get just the word counts, we can use `-w`:

    ~ $ wc -w notes.txt
    7 notes.txt

---
To get just the number of lines in a file, use `-l`:

    ~ $ wc -l notes.txt
    3 notes.txt

---
To get just the number of bytes in a file, use `-c`:

    ~ $ wc -c notes.txt
    35 notes.txt

---
If you don't specify a file, `wc` will read from
stdin. Type Ctrl+D (^D) to end the input.

    ~ $ wc -l
    one
    two
    three
    four
    ^D
    4

---
# man

All of these command options are a lot to remember!

You can pull up documentation at any time in your
shell by typing `man foo` for any command `foo`.

For example to read up on all the options you can
give to the `wc` command, do:

    ~ $ man wc

The help page will open up in your `$PAGER`. Type
`q` to exit back to your shell.

---
# more on options

Options (also called flags or switches) are
special arguments that start with a `-` or `--`
followed by a letter or word.

---
Generally speaking, they are distinct from other
arguments in that their order usually doesn't
matter. For example:

    grep -i wow

is the same as

    grep wow -i

where `-i` just informs the `grep` command to
perform a case-insensitive search.

---
Sometimes options have a value that follows:

    head -n 1

means that `-n` has the value `1`.

Sometimes you can omit the space:

    head -n1

but each program individually decides how to
interpret its arguments.

---
# absolute and relative paths

Paths that start with `.` or `..` are relative paths.
Paths that start with `/` are absolute paths.

---
Relative paths are resolved according to the
current working directory:

```
~/doc $ cat ../media/warp/mac.sh
#!/bin/bash
youtube-dl 'https://www.youtube.com/watch?v=i9qOJqNjalE'
ffmpeg -i *.mp4 -vn mac_startup.wav
sox mac_startup.wav mac_warp.mp3 chorus 0.6 0.9 25 0.9 1 8 -s \
  echos 0.8 0.7 40 0.25 63 0.3 phaser 1 0.7 3 0.7 0.5 -t
  play mac_startup.wav
```

---
Absolute paths are the same no matter what the
current working directory is:

    ~/projects/workshops $ cat /etc/issue
    Debian GNU/Linux 7 \n \l

---
# echo

The echo command just prints text from its arguments:

    ~ $ echo wow cool
    wow cool

This is not very useful by itself, but becomes
useful when combined with redirects and pipes.

---
# write to a file

Using the `>` character, you can write the output
of a command to a file.

For example, to make a new file `greetings.txt`
with the contents "ahoy thar", we can do:

    ~ $ echo ahoy thar > greetings.txt

and to print the contents of greetings.txt, use `cat`:

    ~ $ cat greetings.txt
    ahoy thar

---
You can redirect the output of any program to a file:

    ~ $ ls / > list.txt

---
# append to a file

The `>` redirect operator will overwrite a file
with new contents if it already exists.

There is a `>>` operator that appends to the end
of a file if it already exists:

    ~ $ echo wow > cool.txt
    ~ $ ls >> cool.txt
    ~ $ cat cool.txt
    wow
    cool.txt
    doc
    media
    notes.txt
    projects

---
# read from a file

You can read a file into the stdin of a program
with `<`.

Remember that if `wc` doesn't get a file as an
argument, it will read from stdin. We can load a
file in to `wc` with `<` instead:

    ~ $ wc -c < notes.txt
    35

---
# pipes!

The last but most important kind of redirect is
the pipe operator `|`.

With `|` you can feed the output of one program to
the input of the next.

For example, the `ls -1` command will list files,
one per line, to stdout. The `wc -l` command,
meanwhile, will count the number of lines.

---
By piping these two programs together, we can
count the number of files and subdirectories in a
directory:

    ~ $ ls -1 | wc -l
    5

and indeed, there are five files and
subdirectories in this directory:

    ~ $ ls -1
    cool.txt
    doc
    media
    notes.txt
    projects

You can chain together commands with `|` as much
as you like.

---
Here's an example using two new commands `curl`
and `sed` that will fetch Moby Dick from Project
Gutenberg and count the number of occurences of
"whale", case-insensitive:

```
~ $ curl -s http://www.gutenberg.org/cache/epub/2701/pg2701.txt
| sed -r 's/\s+/\n/g' | grep -i whale | wc -l
1691
```

---
We can even save that number of a file. Just add
`> whale_count.txt` to the end of the pipeline:

```
~ $ curl -s http://www.gutenberg.org/cache/epub/2701/pg2701.txt |
sed -r 's/\s+/\n/g' | grep -i whale | wc -l > whalecount.txt
```

---
# pipeline breakdown: curl

Here's a breakdown of each part of the pipeline
and what it does:

```
curl -s http://www.gutenberg.org/cache/epub/2701/pg2701.txt
```

fetches Moby Dick from Project Gutenberg and
prints the results to stdout.

---
# pipeline breakdown: sed

    sed -r 's/\s+/\n/g'

converts all whitespace (tabs, spaces, newlines)
into newlines.

This means that each word gets its own line:

```
~ $ echo one two three beep boop | sed -r 's/\s+/\n/g'
one
two
three
beep
boop
```

---
# pipeline breakdown: grep

    grep -i whale

filters the output so that only lines that contain
the word "whale" will be shown. `-i` makes the
search case-insensitive.

---
For example if we have a file `tale.txt`:

    Wow
    such
    a
    whale.
    A
    whale
    of
    a
    WHALE!

---
then our grep command will show:

    ~ $ grep -i whale < tale.txt
    whale.
    whale
    WHALE!

---
# pipeline breakdown: wc -l

    wc -l

counts the number of lines from stdin and prints the result.

---
# head

The head command prints the first part of a file.

If a file isn't given, `head` reads from stdin.

Read the first 3 lines of a file with `head -n3`:

```
$ head -n3 mobydick.txt 
The Project Gutenberg EBook of Moby Dick; or The Whale, by Herman Melville

This eBook is for the use of anyone anywhere at no cost and with
```

---
Read the first 20 bytes of a file with `head -c20`:

```
~ $ head -c20 mobydick.txt 
The Project Guten
```

---

# tail

The tail command prints the last part of a file.

If a file isn't given, `tail` reads from stdin.

Read the last 4 lines of a file with `tail -n4`:

```
~ $ tail -n4 mobydick.txt 
This Web site includes information about Project Gutenberg-tm,
including how to make donations to the Project Gutenberg Literary
Archive Foundation, how to help produce our new eBooks, and how to
subscribe to our email newsletter to hear about new eBooks.
```

---
Read the last 9 bytes of a file with `tail -c9`:

```
~ $ tail -c9 mobydick.txt 
eBooks.
```

---
# cal

If you need a handy text calendar, just type `cal`:

```
~ $ cal
   December 2014      
Su Mo Tu We Th Fr Sa  
    1  2  3  4  5  6  
 7  8  9 10 11 12 13  
14 15 16 17 18 19 20  
21 22 23 24 25 26 27  
28 29 30 31           
```

---
You can show the current, previous, and next month:

```
~ $ cal -3
   November 2014         December 2014          January 2015      
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
                   1      1  2  3  4  5  6               1  2  3  
 2  3  4  5  6  7  8   7  8  9 10 11 12 13   4  5  6  7  8  9 10  
 9 10 11 12 13 14 15  14 15 16 17 18 19 20  11 12 13 14 15 16 17  
16 17 18 19 20 21 22  21 22 23 24 25 26 27  18 19 20 21 22 23 24  
23 24 25 26 27 28 29  28 29 30 31           25 26 27 28 29 30 31  
30                                                                
```

---
Or you can show a whole year:

```
~ $ cal 2015
                            2015
      January               February               March          
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
             1  2  3   1  2  3  4  5  6  7   1  2  3  4  5  6  7  
 4  5  6  7  8  9 10   8  9 10 11 12 13 14   8  9 10 11 12 13 14  
11 12 13 14 15 16 17  15 16 17 18 19 20 21  15 16 17 18 19 20 21  
18 19 20 21 22 23 24  22 23 24 25 26 27 28  22 23 24 25 26 27 28  
25 26 27 28 29 30 31                        29 30 31              
                                                                  

       April                  May                   June          
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
          1  2  3  4                  1  2      1  2  3  4  5  6  
 5  6  7  8  9 10 11   3  4  5  6  7  8  9   7  8  9 10 11 12 13  
12 13 14 15 16 17 18  10 11 12 13 14 15 16  14 15 16 17 18 19 20  
19 20 21 22 23 24 25  17 18 19 20 21 22 23  21 22 23 24 25 26 27  
26 27 28 29 30        24 25 26 27 28 29 30  28 29 30              
                      31                                          

        July                 August              September        
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
          1  2  3  4                     1         1  2  3  4  5  
 5  6  7  8  9 10 11   2  3  4  5  6  7  8   6  7  8  9 10 11 12  
12 13 14 15 16 17 18   9 10 11 12 13 14 15  13 14 15 16 17 18 19  
19 20 21 22 23 24 25  16 17 18 19 20 21 22  20 21 22 23 24 25 26  
26 27 28 29 30 31     23 24 25 26 27 28 29  27 28 29 30           
                      30 31                                       

      October               November              December        
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  
             1  2  3   1  2  3  4  5  6  7         1  2  3  4  5  
 4  5  6  7  8  9 10   8  9 10 11 12 13 14   6  7  8  9 10 11 12  
11 12 13 14 15 16 17  15 16 17 18 19 20 21  13 14 15 16 17 18 19  
18 19 20 21 22 23 24  22 23 24 25 26 27 28  20 21 22 23 24 25 26  
25 26 27 28 29 30 31  29 30                 27 28 29 30 31        
                                                                  
```

---
# date

To print the date, just do:

```
~ $ date
Sat Dec 27 20:43:13 PST 2014
```

---
You can format the date however you like:

```
~ $ date +'%Y-%m-%d %H:%M:%S'
2014-12-27 20:45:07
```

Check out the manual page (`man date`) for more info about what options are
available for date strings.

---
# fold

Sometimes it's handy to break long lines into
shorter lines.

---
We can use the fold command to break some text at
30 characters:

```
~ $ head -n250 mobydick.txt | tail -n3 | fold -w 30
can see a whale, for the first
 discoverer has a ducat for hi
s pains....
I was told of a whale taken ne
ar Shetland, that had above a 
barrel of
herrings in his belly.... One 
of our harpooneers told me tha
t he caught
```

---
or to break on spaces instead, use `-s`:

```
~ $ head -n250 mobydick.txt | tail -n3 | fold -sw 30
can see a whale, for the 
first discoverer has a ducat 
for his pains....
I was told of a whale taken 
near Shetland, that had above 
a barrel of
herrings in his belly.... One 
of our harpooneers told me 
that he caught
```

---
# curl

curl is a handy little tool for making HTTP
requests.

Here's a simple snippet to fetch my most recent
RSA public key from github, wrapping the output to
75 character lines:

---
```
~ $ curl -s https://github.com/substack.keys | tail -n1 | fold -w75
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAEAQC7wF3cwpH+NVG+qNz0PLjEg9IqaNyXeeITme9
fksfJx/rTyoFAWW+JrJVKLPNBCe63JYvp3pTvPqJRg/8hEb/+uFlIIzUNhHAUSaS1mmKgnTHbb+
1d8CkFAZiZnDhFOKRkEXh5R9F9htNQVIjyzD3XL/H69mb8YzICItq/9klVTZ66s1thp7r3V5+qE
hbLB4yH6stXyuj2SZiMS+CJeVBJ8Pf/CCUH66NK2o7l1zliJwme+UJry1RtxWQBfEChj9qe36B/
bR3HACtx6ANMdYJsOxZm0znUjn/XJ9jxy22nVJY5otwZNeIZSSyA1lZB2mZRzTTWzPPx62VWdgH
eQdOmnqBP0YWpxPBSMJwn4kFt6aGImrm7WTU5sHwqqxRgNvcrecxPWgbdLcV+x/OWF5bug3s096
AWcP4wQI101w7QtI3cc5+JKHSGssuY17jyyNaHttE7GafBu3pbK93YolgNAMyYUHVicgK+uY6o+
sH4gcRx+RyQ4OkO7Js49wJi0AXPGhp5QRmIFpua/vVzhMTwMhqW+6luWgfPeAVqn95erc49cY+W
2B83ZgaDVSuRfDafVCSjUl+oXG/1KxzP2F/ZhGmNGmBRnF5N4OLHW6/KtVgxCpf3+1bcgye+yiq
NQuM5/NNWZRw3NJhk0XEppd5Ai4JpvguDLhWZ19/+XEvFj9kwKRMRbxf1M7hWDutAE46sQc9x4M
135M/SyuHW9asHBDCJPgD3nBAjYpMV0fQxIbcNiYWF+JsH6NzhRpLnsTNUvsfUcC/FQqX3VD0Xu
IEoYmKwDesv6PU60pQNEi6p4u+PnFHS/vvRASYLo/4s+99GQDWxqzi0jjYVWheQW9RLnTU+ghud
A+xPp7CK/tH8/RAutDdk3k0HdsNTsjHFN/HvM23UIHOpuY07yohayQididHt023IAZdys6m2daQ
RUKXM8cfaFdQqoj/vaby7pxBPWzO6tuXy1tI6gQ+nolZaXQfXUBHF1uBXo1UQI0dp8J5tCppty6
NvXmvv90PBGVXOlplyhXB9q0JXBInidATeT8zlgM4Iq1X6ZVlXN2OIU5CiWVA1NYmf05709e6SK
P0kK2oh19gA+qg1oPOw0WTpZGKz/9NCCw2ywK2/yNJRWuIbSE4RAv6N8v7qtPObwAU5Lohj8oQV
yC/bbLF6VuVJo6V/nfvP+EJKtsXlBBPBzdsmV1hikkGLJx7Up1s7WTZCwSeSGFPXCe7RdElz2mQ
YB6dwEbhaGl48MhuiIeER7KZqzQFOu74G0u5tyyCUeEc90BkeUcf/EhrxfS8R9ZRJ9ce7IpYQ4+
9wTBKFzVc1HinCSUwJTu7m+UHLaaNbK+WCIF+2fFvM1IJmTh2pWSMb
```

---
# grep

You can search for patterns in files or from stdin
with the `grep` command.

The first argument is the pattern to search for as
a regular expression.

Regular expressions are a language for pattern
matching.

---
Here we can search for all lines matching
"whaling" or "fishing":

```
~ $ grep -iE '(whal|fish)ing' mobydick.txt | tail -n5
Equatorial fishing-ground, and in the deep darkness that goes before the
the whaling season? See, Flask, only see how pale he looks--pale in the
preliminary cruise, Ahab,--all other whaling waters swept--seemed to
fixed upon her broad beams, called shears, which, in some whaling-ships,
years of continual whaling! forty years of privation, and peril, and
```

Check out the other workshop about regular
expressions to learn more!

---
# backticks

Sometimes it's useful to include the output of a
program in the arguments list of another.

For example with the date command we can print the
current year:

```
date +%Y
```

---
and we can use this value in a message with echo:

```
~ $ echo Greetings from the year `date +%Y`.
Greetings from the year 2014.
```

---
# arithmetic

With `$((...))` expressions, you can do simple
arithmetic on the command line!

```
~ $ echo $((4*5+1))
21
```

I wouldn't go overboard with this feature, but
it's handy sometimes.

---

# environment variables

Environment variables are defined by the shell and
shell scripts.

To list the current environment variables, type
`export`:

---
```
~ $ export
declare -x DISPLAY=":0"
declare -x HOME="/home/substack"
declare -x HUSHLOGIN="FALSE"
declare -x LANG="en_US.UTF-8"
declare -x LD_LIBRARY_PATH="/home/substack/prefix/lib:/usr/local/lib:/usr/lib/x86_64-linux-gnu:/usr/lib:/lib64:/lib"
declare -x LIBGL_DRIVERS_PATH="/usr/lib/i386-linux-gnu/dri:/usr/lib/x86_64-linux-gnu/dri"
declare -x LOGNAME="substack"
declare -x MAIL="/var/mail/substack"
declare -x OLDPWD="/home/substack/projects/workshops"
declare -x PATH="/home/substack/prefix/bin:/usr/local/bin:/usr/bin:/bin:/sbin:/usr/sbin:/usr/local/games:/usr/games"
declare -x PREFIX="/home/substack/prefix"
declare -x PWD="/home/substack"
declare -x ROXTERM_ID="0x43962f0"
declare -x ROXTERM_NUM="15"
declare -x ROXTERM_PID="2521"
declare -x SHELL="/bin/bash"
declare -x SHLVL="3"
declare -x TERM="xterm"
declare -x USER="substack"
declare -x WINDOWID="8684328"
declare -x WINDOWPATH="7"
declare -x XAUTHORITY="/home/substack/.Xauthority"
```

---
You can use any environment variable by refering to its `$NAME`.

For example to print the value of `$HOME` do:

```
~ $ echo $HOME
/home/substack
```

---
You can use environment variables in any command:

```
~ $ ls /home/$USER
doc  media  notes.txt  projects
```

---
To define your own environment variable, just put
its name followed by an equal sign (with no
spaces) followed by its value:

```
~ $ ANIMAL=cats
~ $ echo $ANIMAL
cats
```

---
Environment variables are almost always
capitalized to distinguish them from variables in
shell scripts but lower-case variables work too.

---
# quotes

If you want to use characters like `<` or `>` in
the arguments to a program, you will need to use
quotes so that the shell doesn't try to interpret
them.

For example, to echo the string `<b>wow</b>` we
can use single quotes:

```
~ $ echo '<b>wow</b>'
<b>wow</b>
```

---
Double quotes are similar but environment variables and backticks will be
interpolated in-place (replaced with their value): 

```
~ $ echo "There's no place like $HOME."
There's no place like /home/substack.
~ $ echo "So long `date +%Y`..."
So long 2014...
~ $ echo "So long `date +%Y`... next stop $((`date +%Y`+1))"'!'
So long 2014... next stop 2015!
```

---
You will also need to use quotes if one of the
arguments you want to give has a whitespace
character in it, because whitespace is otherwise
used to split arguments.

---

# scripts

Whenever you find yourself typing the same
sequence of commands several times, consider
making a script!

Just put the commands you would normally type into
a file and add `#!/bin/bash` to the top of the
file:

``` sh
#!/bin/bash
mkdir wow
cd wow
echo "yay" > zing.txt
```

---
Now make your script file executable:

    ~ $ chmod +x yourscript.sh

And now you can do:

    ~ $ ./yourscript.sh

to run the commands from your file!

---
# script arguments

When you execute a script with arguments on the
command-line, special environment variables `$1`,
`$2`, `$3`... will be defined for each argument.

For example, if our script is:

``` sh
#!/bin/bash
echo first=$1
echo second=$2
```

---
Then we print out the first and second arguments:

```
~ $ ./yourscript.sh beep boop
first=beep
second=boop
```

---
There is a special variable `$*` that contains all
the arguments separated by spaces. For a script
of:

``` sh
#!/bin/bash
echo The arguments are: $*
```

---
And now we can get at all the arguments in one place:

```
~ $ ./args.sh cats dogs ducks lizards
The arguments are: cats dogs ducks lizards
```

---
# $PATH 

There is a special environment variable called `$PATH`:

```
~ $ echo $PATH
/usr/local/bin:/usr/bin:/bin:/sbin:/usr/sbin:/usr/local/games:/usr/games
```

This variable contains a list of places separated
by `:` that bash will look when you type a
command.

---
If you put an executable file in one of the
directories in your `$PATH`, you can make your own
commands without needing to specify a relative or
absolute path!

`/usr/local/bin` is the customary place to put
system-specific scripts that are not managed by
your system distribution. If you do:

```
~ $ sudo cp yourscript.sh /usr/local/bin
```

---
Then you'll be able to type `yourscript.sh` from
any directory on the command-line!

You can rename that command that you type by
renaming the file:

```
~ $ sudo mv /usr/local/bin/{yourscript.sh,whatever}
```

and now the command is called `whatever`.

---
# ~/.bashrc

There is a special bash script called `~/.bashrc`
that runs whenever you start bash. You can edit
this file to set up aliases, environment
variables, and run commands when you start a new
terminal session.

---
At the bottom of your `~/.bashrc` file, try adding
a command:

```
echo Greetings $USER. Nice to see you again.
```

Now open a new terminal and you should see a friendly new message!

---
# permissions

Each file on a UNIX system belongs to a user and a
group.

users are accounts on the system, like the one you
log in with. groups are collections of users.

---
To see what groups you belong to, just type
`groups`:

```
~ $ groups
substack cdrom floppy audio dip video plugdev
```

---
To inspect the permissions on a file, use `ls -l`:

```
~/doc $ ls -l b.txt
-rw-r--r-- 1 substack whatever 14 Dec 28 00:29 b.txt
```

---
Here we can see that the file `b.txt` is owned by
the user `substack` and the group `whatever`.
There's also this part on the left:

```
-rw-r--r--
```

This string describes the permissions of the file.

---
The first character is reserved for some fancy
uses, but after that there are 3 groups of 3
characters:

```
rwxrwxrwx
```

---
Each character describes a permission: (r)ead,
(w)rite, and e(x)ecute. A `-` in place of one of
those letters means the permission is not
available.

If the e(x)ecute bit is enabled on a file for a
user, it means the user can execute the file.

If the e(x)ecute bit is enabled on a directory for
a user, it means the user can list the files in
that directory.

---
* The first `rwx` says what the owner can do.
* The second `rwx` says what users in the group can do.
* The third `rwx` says what everyone else can do.

These three categories are called user (u),
group (g), and other (o).

---
# chmod

To change the permissions on a file, first figure
out which capabilities you want to grant or revoke
(rwx) from which categories of users (ugo).

---
To allow the owner of a file to execute a script you can do:

    ~ $ chmod u+x script.sh

which is the same as:

    ~ $ chmod +x script.sh

because the `u` is implied if not specified.

---
You can also revoke permissions with a `-`. To
make it so that other users can't write to a
file:

    ~ $ chmod o-w wow.txt

---
You can grant and revoke permissions at the same
time. Here we're adding read and execute
permissions to the user while simultaneously
revoking read and write from the group:

    ~ $ chmod u+rxg-rw status.sh

You can change the owner of a file with `chown`
and the group with `chgrp`.

---
# job control

Bash is built to handle multiple programs running
in parallel.

---
# time cat

Type `time cat` and then hit ctrl-c before one
second, as close as possible without going over:

    $ time cat
    ^C

    real    0m0.920s
    user    0m0.004s
    sys 0m0.000s

---
# ctrl-c

Terminate a process in the foreground.

---
# ctrl-z

Put a process in the background.

---
# fg JOB

Move a process from the background to the
foreground by its JOB.

    ~ $ cat
    ^Z
    [1]+  Stopped                 cat
    ~ $ echo wow
    wow
    ~ $ fg %1
    cat
    cool
    cool

---
# job syntax

When you background a process with ctrl-z, the
shell prints a message with `[N]`. `N` is the job
id. Use `%N` to refer to a particular job or:

* `%%` - the most recent job

---
# &

Another way to background a process is to use `&`:

    $ ~ node &
    [1] 29877

The job id of `node` is 1 and the process id is
29877. Job ids are local to a shell session, but
process ids are global across the entire system.

---
    ~ $ perl &
    [1] 29870
    ~ $ pgrep perl
    29870
    ~ $ kill %1
    [1]+  Terminated              perl

---
# pgrep

Search for a process by its name.

---
# kill ID

Kill a process by its process or job id.

---
# screen

You can use screen to run command-line programs and keep
them running, even when you go away.

---
# install screen

    $ sudo apt-get install screen

---
# create a new named screen

    $ screen -S website

---
# list screens

    $ screen -list

---
# connect to a screen

    $ screen -x website

---
# detach from a screen

From inside of a screen, press CTRL+A then `d`.

---
# create a new window inside screen

CTRL+A c

---
# go to the next window

CTRL+A n

---
# go to the previous window

CTRL+A p

---
# close a window

Just type `exit` to close a window.

---
# irc from the command-line

Install irssi:

    $ sudo apt-get install irssi

Then create a screen for irc:

    $ screen -S irc

---
Then in a screen, you can run `irssi` to use irc from the
command line.

* `/nick robowizard` - set your nickname on the server
* `/connect irc.freenode.net` - connect to irc.freenode.net
* `/join #cyberwizard` - join the channel called cyberwizard
* ESC+N or `/win N` - to jump to the window at number N

Once you're in a channel, type text like usual.
`CTRL+A d` to detach and `screen -x irc` to resume.

---
# run a web server

Make a web server.js:

``` js
var http = require('http');
var server = http.createServer(function (req, res) {
    res.end("YOU'RE A WIZARD.\n");
});
server.listen(8000);
```

now run your server with node from inside a screen:

```
$ node server.js
```

then detach the screen with CTRL+A d.


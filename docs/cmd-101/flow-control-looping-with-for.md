# Flow Control: Looping with `for`

A **for** loop is implemented with the `for` compound command.

## `for`: Traditional Shell Form

Syntax:

```bash
for VARIABLE [in WORDS]; do
  COMMANDS
done
```

- `VARIABLE`: The name of a variable that will increment during the execution of the loop.
- `WORDS`: An optional list of items that will be sequentially assigned to `VARIABLE`.
- `COMMANDS`: the commands that are to be executed on each iteration of the loop.

```bash
$ for i in 'A' 'B' 'C' 'D'; do echo "$i"; done
A
B
C
D
```

The really powerful feature of for is the number of interesting ways we can create the
list of words.

```bash
$ for i in {A..D}; do echo "$i"; done
A
B
C
D
```

```bash
$ for i in distros*.txt; do echo "$i"; done
distros-by-date.txt
distros-dates.txt
distros-key-names.txt
distros-key-vernums.txt
distros-names.txt
distros.txt
distros-vernums.txt
distros-versions.txt
```

Another common method of word production is command substitution.

```bash
#!/usr/bin/env bash

# longest-word: find longest string in a file

while [[ -n "$1"]]; do
  if [[ -r "$1" ]]; then
    max_word=
    max_len=0
    for i in $(strings "$1"); do
      len="$(echo -n "$i" | wc -c)"
      if (( len > max_len)); then
        max_len="$len"
        max_word="$i"
      fi
    done
    echo "$1: '$max_word' ($max_len characters)"
  fi
  shift
done
```

Note that we do not surround the command substitution `$(strings "$1")` with double quotes. This is because we actually want word splitting to occur to give us our list.

If the optional in `WORDS` portion of the for command is omitted, `for` defaults to processing the _positional parameters_.

```bash
#!/usr/bin/env bash

# longest-word2: find longest string in a file

for i; do
  if [[ -r "$i" ]]; then
    max_word=
    max_len=0
    for j in $(strings "$i"); do
      len="$(echo -n "$j" | wc -c)"
      if (( len > max_len)); then
        max_len="$len"
        max_word="$j"
      fi
    done
    echo "$i: '$max_word' ($max_len characters)"
  fi
done
```

## `for`: C Language Form

Syntax:

```bash
for (( EXPRESSION1; EXPRESSION2; EXPRESSION3 )); do
  COMMANDS
done
```

- `EXPRESSION1` is used to initialize conditions for the loop
- `EXPRESSION2` is used to determine when the loop is finished, and
- `EXPRESSION3` is carried out at the end of each iteration of the loop.

An example:

```bash
#!/usr/bin/env bash

# simple_counter: demo of C style for command

for (( i=0; i<5; i=i+1 )); do
  echo $i
done
```

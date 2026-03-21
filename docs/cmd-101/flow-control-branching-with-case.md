# Flow Control: Branching with `case`

## `case`

The multiple-choice compound command is called `case`. It has the following syntax:

```bash
case WORD in
  [PATTERN [| PATTERN] ...) COMMANDS ;;]...
esac
```

Use `case` to replace multiple `if` statements when you need to match a variable against several patterns.

```bash
#!/usr/bin/env bash

# case-menu: a menu driven system information program
clear
echo "
Please Select:
1. Display System Information
2. Display Disk Space
3. Display Home Space Utilization
4. Quit
"

read -r -p "Enter selection [0-3] > "

case "$REPLY" in
  0) echo "Program terminated."
     exit
     ;;
  1) echo "Hostname: $HOSTNAME"
     uptime
     ;;
  2) df -h
     ;;
  3) if (("$(id -u)" == 0)); then
       echo "Home Space Utilization (All Users)"
       du -sh /home/*
     else
       echo "Home Space Utilization ($USER)"
       du -sh "$HOME" 2>/dev/null
     fi
     ;;
  *) echo "Invalid entry" >&2
     exit 1
     ;;
esac
```

The `case` command looks at the value of `WORD`, and then attempts to match it against one of the specified patterns.
When a match is found, the commands associated with the specified pattern are executed.
After a match is found, no further matches are attempted.

### Patterns

The patterns used by case are the same as those used by pathname expansion. Patterns are terminated with a `)` character.

| Pattern       | Description                                                                                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a)`          | Matches if WORD equals "a"                                                                                                                                                                                                |
| `[[:alpha:]]` | Matches if WORD is a single alphabetic character                                                                                                                                                                          |
| `???)`        | Matches if WORD is exactly three characters long.                                                                                                                                                                         |
| `*.txt)`      | Matches if WORD ends with the characters ".txt".                                                                                                                                                                          |
| `*)`          | Matches any value of WORD. It is good practice to include this as the last pattern in a `case` command, to catch any values of WORD that did not match a previous pattern, that is, to catch any possible invalid values. |

An example:

```bash
#!/usr/bin/env bash

read -r -p "Enter word > "

case "$REPLY" in
  [[:alpha:]]) echo "is a single alphabetic character." ;;
  [ABC][0-9])  echo "is A, B, or C followed by a digit." ;;
  ???)         echo "is three characters long." ;;
  *.txt)       echo "is a word ending in '.txt'" ;;
  *)           echo "is something else." ;;
esac
```

It is also possible to combine multiple patterns using the vertical bar (`|`) character as a separator. This creates an “or” conditional pattern.

```bash
#!/usr/bin/env bash

# case-menu: a menu driven system information program
clear
echo "
Please Select:
A. Display System Information
B. Display Disk Space
C. Display Home Space Utilization
Q. Quit
"

read -r -p "Enter selection [A, B, C, Q] > "

case "$REPLY" in
  q|Q) echo "Program terminated."
       exit
       ;;
  a|A) echo "Hostname: $HOSTNAME"
       uptime
       ;;
  b|B) df -h
       ;;
  c|C) if (("$(id -u)" == 0)); then
         echo "Home Space Utilization (All Users)"
         du -sh /home/*
       else
         echo "Home Space Utilization ($USER)"
       du -sh "$HOME" 2>/dev/null
       fi
       ;;
  *)   echo "Invalid entry" >&2
       exit 1
       ;;
esac
```

### Performing Multiple Actions

Modern versions of `bash` add the `;;&` to allow `case` to match more than one test.

```bash
#!/usr/bin/env bash

read -r -n 1 -p "Type a character > "
echo
case "$REPLY" in
[[:upper:]]) echo "'$REPLY' is upper case." ;;&
[[:lower:]]) echo "'$REPLY' is lower case." ;;&
[[:alpha:]]) echo "'$REPLY' is alphabetic." ;;&
[[:digit:]]) echo "'$REPLY' is a digit." ;;&
[[:graph:]]) echo "'$REPLY' is a visible character." ;;&
[[:punct:]]) echo "'$REPLY' is a punctuation symbol." ;;&
[[:space:]]) echo "'$REPLY' is a whitespace character." ;;&
[[:xdigit:]]) echo "'$REPLY' is a hexadecimal digit." ;;&
esac
```

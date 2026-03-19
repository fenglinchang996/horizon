# Flow Control: Looping with while / until

We will look at a programming concept called looping, which can be used to make portions of programs repeat.

## Looping

### `while`

The syntax of the `while` command is as follows:

```bash
while COMMANDS; do COMMANDS; done
```

An example:

```bash
#!/usr/bin/env bash

# while-count: display a series of numbers

count=1

while [[ "$count" -le 5 ]]; do
  echo "$count"
  count=$((count + 1))
done
echo "Finished."
```

The `while` command evaluates the exit status of the `[[]]` compound command. As long as the `[[]]` command returns an exit status of zero, the commands within the loop are executed. At the end of each cycle, the `[[]]` command is repeated. When the `[[]]` command no longer returns an exit status of zero, the loop terminates.

### `break` and `continue`

`bash` provides two builtin commands that can be used to control program flow inside loops.

- `break`: The `break` command immediately terminates a loop, and program control resumes with the next statement following the loop.
- `continue`: The `continue` command skips the remaining commands in the current iteration of the loop and proceeds with the next iteration.

Rewrite the menu driven system information program:

```bash
#!/usr/bin/env bash

# while-menu2: a menu driven system information program

DELAY=3 # Number of seconds to display results

while true; do
  clear
  cat <<_EOF_
Please Select:

1. Display System Information
2. Display Disk Space
3. Display Home Space Utilization
0. Quit

_EOF_

  read -r -p "Enter selection [0-3] > "

  if [[ "$REPLY" =~ ^[0-3]$ ]]; then
    if [[ "$REPLY" == 1 ]]; then
      echo "Hostname: $HOSTNAME"
      sleep "$DELAY"
      uptime
      sleep "$DELAY"
      continue
    fi
    if [[ "$REPLY" == 2 ]]; then
      df -h
      sleep "$DELAY"
      continue
    fi
    if [[ "$REPLY" == 3 ]]; then
      if (("$(id -u)" == 0)); then
        echo "Home Space Utilization (All Users)"
        du -sh /home/*
      else
        echo "Home Space Utilization ($USER)"
        du -sh "$HOME" 2>/dev/null
      fi
      sleep "$DELAY"
      continue
    fi
    if [[ "$REPLY" == 0 ]]; then
      break
    fi
  else
    echo "Invalid entry." >&2
    exit 1
  fi
done
```

## `until`

The `until` command is similar to `while`, but it executes the commands as long as the condition is false. The syntax is:

```bash
until COMMANDS; do COMMANDS; done
```

An `until` loop continues until it receves a zero exit status.

An example:

```bash
#!/usr/bin/env bash

# until-count: display a series of numbers

count=1

until [[ "$count" -gt 5 ]]; do
  echo "$count"
  count=$((count + 1))
done
echo "Finished."
```

## Reading Files with Loops

`while` and `until` can process standard input. This allows files to be processed with `while` and `until` loops. To redirect a file to the loop, we place the redirection operator after the done statement.

An example to process a file:

```bash
#!/usr/bin/env bash
# while-read: read lines from a file

while read -r distro version release; do
  printf "Distro: %s Version: %s Released: %s\n" "$distro" "$version" "$release"
done < distros.txt
```

You can also pipe standard input into a loop:

```bash
#!/usr/bin/env bash

sort -k 1,1 -k 2n distros.txt | while read -r distro version release;
do
  printf "Distro: %s Version: %s Released: %s\n" "$distro" "$version" "$release"
done
```

It is important to remember that since a pipe will execute the command in a subshell (default behavior of bash, might be different in zsh), any variables created or assigned within the loop will be lost when the loop terminates.

# Flow Control: Branching with `if`

## `if`

```bash
if COMMANDS; then
  COMMANDS
[elif COMMANDS; then
  COMMANDS...]
[else
  COMMANDS]
fi
```

Where `COMMANDS` is a list of commands.

An example:

```bash
x=5

if [ "$x" -eq 5 ]; then
  echo "x equals 5."
else
  echo "x does not equal 5."
fi
```

## Exit Status

- Commands (including the scripts and shell functions we write) issue a value to the system when they terminate, called an **exit status**. This value, which is an integer in the range of 0 to 255, indicates the success or failure of the command’s execution. By convention, a value of zero (`0`) indicates success and any other value indicates failure.
- We can use `$?`, a **special variable** that shows the **exit status** of the **most recently executed command**.
- Some commands use different exit status values to provide diagnostics for errors, while many commands simply exit with a value of `1` when they fail. Man pages often include a section entitled “Exit Status,” describing what codes are used. However, **a zero (`0`) always indicates success**.
- The shell provides two extremely simple builtin commands that do nothing except terminate with either a 0 or 1 exit status. The `true` command always executes successfully and the `false` command always executes unsuccessfully.

```bash
$ true
$ echo $?
0
$ false
$ echo $?
1
```

If a list of commands follows `if`, the last command in the list is evaluated:

```bash
$ if false; true; then echo "It's true."; fi
"It's true."
$ if true; false; then echo "It's true."; fi
```

## Using `test`

The two forms of `test` command:

- `test EXPRESSION`
- `[ EXPRESSION ]`

It is interesting to note that both `test` and `[` are actually commands. In `bash` they are builtins, but they also exist as programs in `/usr/bin` for use with other shells. The expression is actually just its arguments with the `[` command requiring that the `]` character be provided as its final argument.

### File Expressions

`test` File Expressions

| Expression        | Is True if:                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `FILE1 -ef FILE2` | `FILE1` and `FILE2` have the same inode numbers (the two filenames refer to the same file by hard linking).                                      |
| `FILE1 -nt FILE2` | `FILE1` is newer than `FILE2`.                                                                                                                   |
| `FILE1 -ot FILE2` | `FILE1` is older than `FILE2`.                                                                                                                   |
| `-b FILE`         | `FILE` exists and is a block-special (device) file.                                                                                              |
| `-c FILE`         | `FILE` exists and is a character-special (device) file.                                                                                          |
| `-d FILE`         | `FILE` exists and is a directory.                                                                                                                |
| `-e FILE`         | `FILE` exists.                                                                                                                                   |
| `-f FILE`         | `FILE` exists and is a regular file.                                                                                                             |
| `-g FILE`         | `FILE` exists and is set-group-ID.                                                                                                               |
| `-G FILE`         | `FILE` exists and is owned by the effective group ID.                                                                                            |
| `-k FILE`         | `FILE` exists and has its “sticky bit” set.                                                                                                      |
| `-L FILE`         | `FILE` exists and is a symbolic link.                                                                                                            |
| `-O FILE`         | `FILE` exists and is owned by the effective user ID.                                                                                             |
| `-p FILE`         | `FILE` exists and is a named pipe.                                                                                                               |
| `-r FILE`         | `FILE` exists and is readable (has readable permission for the effective user).                                                                  |
| `-s FILE`         | `FILE` exists and has a length greater than zero.                                                                                                |
| `-S FILE`         | `FILE` exists and is a network socket.                                                                                                           |
| `-t FD`           | `FD` is a file descriptor directed to/from the terminal. This can be used to determine whether standard input/output/error is beding redirected. |
| `-u FILE`         | `FILE` exists and is setuid.                                                                                                                     |
| `-w FILE`         | `FILE` exists and is writable (has write permission for the effective user).                                                                     |
| `-x FILE`         | `FILE` exists and is executable (has execute/search permission for the effective user)                                                           |

An example:

```bash
#!/usr/bin/env bash

# test-file: Evaluate the status of a file

FILE=~/.bashrc

if [ -e "$FILE" ]; then
  if [ -f "$FILE" ]; then
    echo "$FILE is a regular file."
  fi
  if [ -d "$FILE" ]; then
    echo "$FILE is a directory."
  fi
  if [ -r "$FILE" ]; then
    echo "$FILE is readable."
  fi
  if [ -w "$FILE" ]; then
    echo "$FILE is writable."
  fi
  if [ -x "$FILE" ]; then
    echo "$FILE is executable/searchable."
  fi
else
  echo "$FILE does not exist."
  exit 1
fi
```

- Defensive Quoting of Parameters:
  - Variables like "$FILE" are wrapped in double quotes to prevent syntax errors if the parameter is empty or contains only whitespace.
  - Without quotes, an empty variable would leave the operator (e.g., -e) without an argument, causing the shell to misinterpret the expression.
- The `exit` Command and Status Codes:
  - The exit command terminates the script and can take an optional integer argument to serve as the exit status.
  - If no argument is provided, the script defaults to the exit status of the last command executed.
  - Providing a specific exit status (like exit 1) allows the script to signal a failure to the calling environment.
- Implicit Script Termination:
  - If a script reaches the end of the file without an explicit exit, it automatically terminates with the exit status of the final command.
- Functions and the return Command:
  - In shell functions, the return command is used instead of exit to pass a status back to the main program without killing the entire script.

### String Expressions

`test` String Expressions

| Expression           | Is True if                                                                                                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `STRING`             | `STRING` is not null.                                                                                                                                                                        |
| `-n STRING`          | The length of `STRING` is greater than zero.                                                                                                                                                 |
| `-z STRING`          | The length of `STRING` is zero.                                                                                                                                                              |
| `STRING1 = STRING2`  | `STRING1` and `STRING2` are equal. Single or double equal signs may be used. The use of double equal signs is supported by `bash` and is generally preferred, but it is not POSIX compliant. |
| `STRING1 == STRING2` | `STRING1` and `STRING2` are equal. Single or double equal signs may be used. The use of double equal signs is supported by `bash` and is generally preferred, but it is not POSIX compliant. |
| `STRING1 != STRING2` | `STRING1` and `STRING2` are not equal.                                                                                                                                                       |
| `STRING1 > STRING2`  | `STRING1` sort after `STRING2`.                                                                                                                                                              |
| `STRING1 < STRING2`  | `STRING1` sort before `STRING2`.                                                                                                                                                             |

> The `>` and `<` expression operators must be quoted (or escaped with a backslash) when used with test. If they are not, they will be interpreted by the shell as redirection operators, with potentially destructive results.

An Example:

```bash
#!/usr/bin/env bash
# test-string: evaluate the value of a string

ANSWER=maybe

if [ -z "$ANSWER" ]; then
  echo "There is no answer." >&2
  exit 1
fi
if [ "$ANSWER" == "yes" ]; then
  echo "The answer is YES."
elif [ "$ANSWER" == "no" ]; then
  echo "The answer is NO."
elif [ "$ANSWER" == "maybe" ]; then
  echo "The answer is MAYBE."
else
  echo "The answer is UNKNOWN."
fi
```

If the string is not empty, we evaluate the value of the string to see whether it is equal to either "yes", "no", or "maybe". We do this by using `elif`, which is short for "else if". By using `elif`, we are able to construct a more complex logical test.

### Integer Expressions

`test` Integer Expressions

| Expressions             | Is True if                                         |
| ----------------------- | -------------------------------------------------- |
| `INTEGER1 -eq INTEGER2` | `INTEGER1` is equal to `INTEGER2`.                 |
| `INTEGER1 -ne INTEGER2` | `INTEGER1` is not equal to `INTEGER2`.             |
| `INTEGER1 -le INTEGER2` | `INTEGER1` is less than or equal to `INTEGER2`.    |
| `INTEGER1 -lt INTEGER2` | `INTEGER1` is less than `INTEGER2`.                |
| `INTEGER1 -ge INTEGER2` | `INTEGER1` is greater than or equal to `INTEGER2`. |
| `INTEGER1 -gt INTEGER2` | `INTEGER1` is greater than `INTEGER2`.             |

An example:

```bash
#!/usr/bin/env bash

# test-integer: evaluate the value of an integer.

INT=-5

if [ -z "$INT" ]; then
  echo "INT is empty." >&2
  exit 1
fi
if [ "$INT" -eq 0 ]; then
  echo "INT is zero."
else
  if [ "$INT" -lt 0 ]; then
    echo "INT is negative."
  else
    echo "INT is positive."
  fi
  if [ $((INT % 2)) -eq 0 ]; then
    echo "INT is even."
  else
    echo "INT is odd."
  fi
fi
```

## A More Modern Version of `test`: `[[ ]]`

Modern versions of bash include a compound command that acts as an enhanced re-
placement for test. The syntax is:

```bash
[[ EXPRESSION ]]
```

The `[[ ]]` command is similar to `test` but adds an important new string expression.

```bash
STRING1 =~ REGEX
```

An example:

```bash
#!/usr/bin/env bash
# test-integer2: evaluate the value of an integer.

INT=-5

if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
  if [ "$INT" -eq 0 ]; then
    echo "INT is zero."
  else
    if [ "$INT" -lt 0 ]; then
      echo "INT is negative."
    else
      echo "INT is positive."
    fi
    if [ $((INT % 2)) -eq 0 ]; then
      echo "INT is even."
    else
      echo "INT is odd."
  fi
else
  echo "INT is not an integer." >&2
  exit 1
fi
```

Another added feature of `[[ ]]` is that the `==` operator supports pattern matching the
same way pathname expansion does.

```bash
#!/usr/bin/env bash

FILE=foo.bar

if [[ "$FILE" == foo.* ]]; then
  echo "$FILE matches pattern 'foo.*'"
fi
```

## `(( ))` - Designed for Integers

`bash` provides the `(( ))` compound conmmand, which is used to perform arithmetic truth tests. Using `(( ))`, we can simplfy the testing on integer operations:

```bash
#!/usr/bin/env bash

INT=-5

if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
  if (( INT == 0 )); then
    echo "INT is zero."
  else
    if (( INT < 0 )); then
      echo "INT is negative."
    else
      echo "INT is positive."
    fi
    if (( INT % 2 == 0 )); then
      echo "INT is even."
    else
      echo "INT is odd."
    fi
  fi
else
  echo "INT is not an integer" >&2
  exit 1
fi
```

Because the compound command (( )) is part of the shell syntax rather than an ordi-
nary command and it deals only with integers, it is able to recognize variables by name
and does not require expansion to be performed.

## Combining Expressions

Expressions are combined by using logical operators. There are 3 logical operations for `test` and `[[ ]]`: AND, OR, and NOT.
`test` and `[[ ]]` use different operators to represent these operations :

| Operation | `test` | `[[ ]]` and `(( ))` |
| --------- | ------ | ------------------- |
| AND       | `-a`   | `&&`                |
| OR        | `-o`   | `\|\|`              |
| NOT       | `!`    | `!`                 |

We will focus on `[[ ]]` and `(( ))` since they are more convenient and useful than `test`.

An example of an AND operation:

```bash
#!/usr/bin/env bash

# test-integer3: determine if an integer is within a
# specified range of values.

MIN_VAL=1
MAX_VAL=100
INT=50

if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
  if [[ "$INT" -ge "$MIN_VAL" && "$INT" -le "$MAX_VAL" ]]; then
    echo "$INT is within $MIN_VAL to $MAX_VAL."
  else
    echo "$INT is out of range."
  fi
else
  echo "INT is not an integer." >&2
  exit 1
fi
```

An example of an NOT operation:

```bash
#!/usr/bin/env bash

# test-integer4: determine if an integer is outside a
# specified range of values.

MIN_VAL=1
MAX_VAL=100
INT=50

if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
  if [[ ! ("$INT" -ge "$MIN_VAL" && "$INT" -le "$MAX_VAL") ]]; then
    echo "$INT is outside $MIN_VAL to $MAX_VAL."
  else
    echo "$INT is in range."
  fi
else
  echo "INT is not an integer." >&2
  exit 1
fi
```

## Control Operators: Another Way to Branch

`bash` provides two control operators that can perform branching: The `&&` (AND) and `||`
(OR) operators.

The syntax for `&&`:

```bash
COMMAND1 && COMMAND2
```

With the `&&` operator, `COMMAND1` is always executed and `COMMAND2` is executed if, and only if, `COMMAND1` is **successful**.

And the syntax for `||`:

```bash
COMMAND1 || COMMAND2
```

With the `||` operator, `COMMAND1` is always executed and `COMMAND2` is executed if, and only if, `COMMAND1` is **unsuccessful**.

Some examples:

```bash
$ mkdir temp && cd temp
```

```bash
$ [[ -d temp ]] || mkdir temp
```

A command can be a group command:

```bash
$ { true && echo "true"; } && { false || echo "false"; }
```

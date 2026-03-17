# Reading Keyboard Input

## `read` - Read Values from Standard Input

The `read` builtin command is used to read a single line of standard input. This command can be used to read keyboard input or, when redirection is employed, a line of data from a file.

```bash
read [-OPTIONS] [VARIABLE...]
```

Where `OPTIONS` is one or more of the availalbe options and `VARIABLE` is the name of one or more variables used to hold the input value.

Basically, read assigns fields from standard input to the specified variables.

```bash
#!/usr/bin/env bash

# read-integer: evaluate the value of an integer.

echo -n "Please enter an integer -> "
read int

if [[ "$int" =~ ^-?[0-9]+$ ]]; then
  if [ "$int" -eq 0 ]; then
    echo "$int is zero."
  else
    if [ "$int" -lt 0 ]; then
      echo "$int is negative."
    else
      echo "$int is positive."
    fi
    if [ $((int % 2)) -eq 0 ]; then
      echo "$int is even."
    else
      echo "$int is odd."
    fi
  fi
else
  echo "Input value is not an integer." >&2
  exit 1
fi
```

`read` can assign input to multiple variables, as shown in the following script:

```bash
#!/usr/bin/env bash

# read-multiple: read multiple values from keyboard

echo -n "Enter one or more values > "
read var1 var2 var3 var4 var5

echo "var1 = '$var1'"
echo "var2 = '$var2'"
echo "var3 = '$var3'"
echo "var4 = '$var4'"
echo "var5 = '$var5'"
```

If read receives fewer than the expected number, the extra variables are empty, while an excessive amount of input results in the final variable containing all of the extra input.

```bash
$ read-multiple
Enter one or more values > a
var1 = 'a'
var2 = ''
var3 = ''
var4 = ''
var5 = ''
$ read-multiple
Enter one or more values > a b c d e f g
var1 = 'a'
var2 = 'b'
var3 = 'c'
var4 = 'd'
var5 = 'e f g'
```

If no variables are listed after the read command, a shell variable, REPLY, will be assigned all the input.

```bash
#!/usr/bin/env bash

# read-single: read multiple values into default variable

echo -n "Enter one or more values > "
read

echo "REPLY = '$REPLY'"
```

### Options

### Table 28-1: read Options

| Option         | Description                                                                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-a ARRAY`     | Assign the input to `ARRAY`, starting with index zero.                                                                                                                                                           |
| `-d DELIMITER` | The first character in the string `DELIMITER` is used to indicate the end of input, rather than a newline character.                                                                                             |
| `-e`           | Use Readline to handle input. This permits input editing in the same manner as the command line.                                                                                                                 |
| `-i STRING`    | Use `STRING` as a default reply if the user simply presses ENTER. Requires the `-e` option.                                                                                                                      |
| `-n NUM`       | Read `NUM` characters of input, rather than an entire line.                                                                                                                                                      |
| `-p PROMPT`    | Display a prompt for input using the string `PROMPT`.                                                                                                                                                            |
| `-r`           | Raw mode. Do not interpret backslash characters as escapes. **Using this option is recommended for safety.** For example when inputting a DOS pathname, we want backslashes to be treated as literal characters. |
| `-s`           | Silent mode. Do not echo characters to the display as they are typed. This is useful when inputting passwords and other confidential information.                                                                |
| `-t SECONDS`   | Timeout. Terminate input after `SECONDS`. `read` returns a non-zero exit status if an input times out.                                                                                                           |
| `-u FD`        | Use input from file descriptor `FD`, rather than standard input.                                                                                                                                                 |

Some examples:

```bash
#!/usr/bin/env bash

# read-single: read multiple values into default variable

read -r -p "Enter one or more values > "

echo "REPLY = '$REPLY'"
```

```bash
#!/usr/bin/env bash

# read-secret: input a secret passphrase

if read -r -t 10 -s -p "Enter secret passphrase > " secret_pass; then
  echo -e "\nSecret passphrase = '$secret_pass'"
else
  echo -e "\nInput timed out" >&2
  exit 1
fi
```

```bash
#!/usr/bin/env bash


# read-default: supply a default value if user presses Enter key.

read -e -p "What is your user name? " -i $USER

echo "You answered: '$REPLY'"
```

### IFS

How the multiple words seperated in the shell is configured by a shell variable named `IFS` (for "Internal Field Separator").

The default value of `IFS` contains \*\*a space, a tab, and a newline character, each of which will separate items from one another.

We can adjust the value of `IFS` to control the separation of fields input to read. See the following example:

```bash
#!/usr/bin/env bash

# read-ifs: read fields from a file

FILE=/etc/passwd

read -r -p "Enter a username > " user_name

file_info="$(grep "^$user_name:" $FILE)"

if [ -n "$file_info" ]; then
  IFS=":" read -r user pw uid gid name home shell <<< "$file_info"
  echo "User = '$user'"
  echo "UID = '$uid'"
  echo "GID = '$gid'"
  echo "Full Name = '$name'"
  echo "Home Dir. = '$home'"
  echo "Shell = '$shell'"
else
  echo "No such user '$user_name'" >&2
  exit 1
fi
```

```bash
IFS=":" read -r user pw uid gid name home shell <<< "$file_info"
```

- The shell allows one or more variable assignments to take place immediately before a command. These assignments alter the environment for the command that follows. The effect of the assignment is temporary changing only the environment for the duration of the command. In the above example, the value of `IFS` is changed to `:`.
- The `<<<` operator indicates a _here_ string. A here string is like a here document, only shorter, consisting of a single string. In our example, the line of data from the `/etc/passwd` file is fed to the standard input of the read command.

Comparison of Bash Redirection Symbols

| Symbol    | Name                        | Right-side Argument            | Primary Use Case                                                    |
| :-------- | :-------------------------- | :----------------------------- | :------------------------------------------------------------------ |
| **`<`**   | **Standard Input Redirect** | **File Path**                  | Reading content from an existing physical file on disk.             |
| **`<<`**  | **Here Document**           | **Custom Label** (e.g., `EOF`) | Providing multi-line text blocks or templates within a script.      |
| **`<<<`** | **Here String**             | **String or Variable**         | Passing a single string or variable's content to a command's input. |

> You can't pipe `read`, i.e., you can not do this: `echo "foo" | read`.

## Menus

In menu-driven programs, the user is presented with a list of choices and is asked to choose one.

For example, we want this:

```plain
Please Select:

1. Display System Information
2. Display Disk Space
3. Display Home Space Utilization
0. Quit

Enter selection [0-3] >
```

```bash
#!/usr/bin/env bash

# read-menu: a menu driven system information program

clear
echo "
Please Select:

1. Display System Information
2. Display Disk Space
3. Display Home Space Utilization
0. Quit
"

read -r -p "Enter selection [0-3] > "

if [[ "$REPLY" =~ ^[0-3]$ ]]; then
  if [[ "$REPLY" == 0 ]]; then
    echo "Program terminated."
    exit
  fi
  if [[ "$REPLY" == 1 ]]; then
    echo "Hostname: $HOSTNAME"
    uptime
    exit
  fi
  if [[ "$REPLY" == 2 ]]; then
    df -h
    exit
  fi
  if [[ "$REPLY" == 3 ]]; then
    if (("$(id -u)" == 0)); then
      echo "Home Space Utilization (All Users)"
      du -sh /home/*
    else
      echo "Home Space Utilization ($USER)"
      du -sh "$HOME" 2>/dev/null
    fi
    exit
  fi
else
  echo "Invalid entry." >&2
  exit 1
fi
```

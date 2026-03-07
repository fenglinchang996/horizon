# Seeing the World as the Shell Sees It

- `echo`: display a line of text

## Expansion

With *expansion*, we enter something and it is expanded into something else before the shell acts upon it.

```bash
$ echo *
```

The shell expands the `*` into something else (in this instance, the names of the files in the current working directory) before the echo command is executed.

### [Pathname Expansion](https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html)

**[Pattern Matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html)**

The mechanism by which **wildcards work** is called pathname expansion.

- `echo D*`

- `echo *s`

- `echo [[:upper:]]*`

- `echo /usr/*/share`

> Pathname Expansion of Hidden Files: As we know, filenames that begin with a period character are hidden. Pathname expansion also respects this behavior. We could include hidden files in an expansion by starting the pattern with a leading period, like this:
>
> ```bash
> $ echo .*
> ```

### Tilde (\~) Expansion

Tilde expansion is a mechanism used in Unix-like operating systems to simplify referencing user home directories. It is particularly useful for navigating the filesystem efficiently. Here are some common uses of tilde expansion with explanations:

1. **`~`**: Represents the current user's home directory.

   - Example: If the current user is `user1`, `~` expands to `/home/user1`.

2. **`~username`**: Represents the specified user's home directory.

   - Example: `~john` expands to `/home/john`, assuming `john`'s home directory is located at `/home/john`.

3. **`~/path/to/directory`**: Refers to a subdirectory or file within the current user's home directory.

   - Example: `~/Documents` expands to `/home/user1/Documents`, assuming the current user is `user1`.

4. **`~+`**: Represents the current working directory.

   - Example: If the current working directory is `/var/www`, `~+` expands to `/var/www`.

5. **`~-`**: Represents the previous working directory.

   - Example: If your previous working directory was `/usr/local`, `~-` expands to `/usr/local`.

These expansions help users navigate the filesystem more conveniently, especially when working with scripts and command-line operations.

### Arithmetic Expansion

The shell allows arithmetic to be performed by expansion. This allows us to use the shell prompt as a calculator.

```bash
$((expression))
```

Some examples:

- `echo $(($((5**2)) * 3))` same as `echo $(((5**2) * 3))`

- `echo Five divided by two equals $((5/2))`

- `echo with $((5%2)) left over.`

### Brace Expansion

- Comman-separated expansion:

   ```bash
   {item1,item2,...,itemN} 
   ```

   Examples:

   ```bash
   $ echo Front-{A,B,C}-Back
   Front-A-Back Front-B-Back Front-C-Back
   ```

- Range expansion:

   ```bash
   {start...end}
   ```

   Examples:

   ```bash
   $ echo Number_{1..5}
   Number_1 Number_2 Number_3 Number_4 Number_5
   ```

   ```bash
   $ echo {01..15}
   01 02 03 04 05 06 07 08 09 10 11 12 13 14 15
   ```

   ```bash
   $ echo {Z..A}
   Z Y X W V U T S R Q P O N M L K J I H G F E D C B A
   ```

- Nested brace expansion:

   Examples:

   ```bash
   $ echo a{A{1,2},B{3,4}}b
   aA1b aA2b aB3b aB4b
   ```

### Parameter Expansion

- **(Shell) [Parameters](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameters.html)**: A *parameter* is an entity that stores values. It can be a name, a number, or one of the some [special characters](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html).

   - **Postitional Parameters**: To be discussed later.

   - **[Special Parameters](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html)**: To be discussed later.

   - **Variables**: A *variable* is a parameter denoted by a name.

      - **Local variables**: variables that local to a single shell by default. They are not inherited by child shells.

      - **[Environment](https://www.gnu.org/software/bash/manual/html_node/Environment.html) variables**: When a program is invoked it is given an array of strings called the *environment*. This is a list of name-value pairs, of the form `name=value`. On invocation, the shell scans its own environment and creates a parameter for each name found. These environment variables can influence the operation of software on the system, providing a mechanism for configuration and control. More details will be discussed later.

A parameter is set if it has been assigned a value. The null string is a valid value. A variable may be assigned to by a statement of the form:

```bash
name=VALUE
```

The `$` character introduces parameter expansion. The basic form of parameter expansion is:

```bash
${parameter}
```

The value of *parameter* is substituted. The braces are *optional* but required when *parameter* is a positional parameter with more than one digit, or when *parameter* is followed by a character that is not to be interpreted as part of its name.

Examples:

```bash
$ v=param
$ echo ${v}
```

```bash
$ v=param
$ echo $vTEST

$ echo ${v}TEST
paramTEST
```

```bash
$ v=param
$ echo ${v}{TEST,DATA}
paramTEST paramDATA
```

```bash
$ echo ${USER}
fenglin
```

### Command Substitution

Command substitution allows us to use the output of a command as an expansion.

Examples:

```bash
$ echo $(ls --no-symlinks)
Applications Desktop Documents dotfiles Downloads Library Movies Music OrbStack Pictures Public
```

```bash
$ echo python:$(which python)
python:/Users/fenglin/.pyenv/shims/python
```

With command substitution, the result of one command can be the other command’s argument(s)

```bash
$ ls -l $(which python)
.rwxr-xr-x 184 fenglin 26 Mar  2024 /Users/fenglin/.pyenv/shims/python
```

## Quoting

The shell provides a mechanism called *quoting* to selectively suppress unwanted expansions.

### Double quotes

- If we place text inside double quotes, all the special characters used by the shell lose their special meaning and are treated as ordinary characters. The exceptions are `$`, `\` (backslash), and `` ` `` (back-quote).

- This means that word-splitting, pathname expansion, tilde expansion, and brace expansion are suppressed, but *parameter expansion*, *arithmetic expansion*, and *command substitution* are still carried out.

- By default, word-splitting looks for the presence of **spaces**, **tabs**, and **newlines** (linefeed characters) and treats them as **delimiters** between words. This means unquoted spaces, tabs, and newlines are not considered to be part of the text. They serve only as **separators**.

Examples：

```bash
$ touch two words.txt
$ ls
two words.txt
$ touch "two words.txt"
$ ls
two 'two words.txt' words.txt
```

```bash
$ ls -l two words.txt
.rw-r--r--@ 0 fenglin  9 Feb 20:52 two
.rw-r--r--@ 0 fenglin  9 Feb 20:52 words.txt
$ ls -l "two words.txt"
.rw-r--r--@ 0 fenglin  9 Feb 20:53 'two words.txt'
```

```bash
$ echo ~
/Users/fenglin
$ echo "~"
~
$ echo A{1,2}B
A1B A2B
$ echo "A{1,2}B"
A{1,2}B`
```

```bash
$ ls
two "two words.txt" words.txt
$ echo $(ls)
two "two words.txt" words.txt
$ echo "$(ls)"
two
'two words.txt'
words.txt
```

```bash
$ cal
   February 2025
Su Mo Tu We Th Fr Sa
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28
$ echo $(cal)
February 2025 Su Mo Tu We Th Fr Sa 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28
$ echo "$(cal)"
   February 2025
Su Mo Tu We Th Fr Sa
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28
```

```bash
$ echo this is a     test
this is a test
$ echo "this is a     test"
this is a     test
```

```bash
$ echo "$USER has $((1+1+1)) files:\n$(ls)"
fenglin has 3 files:
two
'two words.txt'
words.txt
```

### Single quotes

If we need to **suppress all expansions**, we use single quotes.

```bash
$ echo text ~/Documents {a,b} $(echo foo) $((2+2)) $USER
text /home/me/ls-output.txt a b foo 4 fenglin
$ echo "text ~/Documents {a,b} $(echo foo) $((2+2)) $USER"
text ~/Documents {a,b} foo 4 fenglin
$ echo 'text ~/Documents {a,b} $(echo foo) $((2+2)) $USER'
text ~/Documents {a,b} $(echo foo) $((2+2)) $USER
```

### Escape character

In Bash, the backslash (\\) serves as the escape character, preserving the literal value of the character that follows it. This technique is commonly used to neutralize the special significance of characters such as `$`, `!`, `&`, and spaces.

`$ echo $USER` —> fenglin

`$ echo \$USER` —> $USER

```bash
$ touch $USER.txt
$ touch \$USER.txt
$ touch "$\USER.txt"
$ touch '$\USER.txt'
```

```bash
$ echo this is a T   E   S   T
this is a T E S T
$ echo "this is a T   E   S   T"
this is a T   E   S   T
$ echo this is a T \ \ E \ \ S \ \ T
this is a T   E   S   T
```

### Escape sequence

The backslash (\\) is also used as part of a notation to represent certain special characters called **control codes**.

Adding the `-e` option to `echo` with double quote will enable interpretation of escape sequences. Alternatively, you can place them inside `$' '`. In Zsh, the escape sequences are automatically interpretated.

**Common Escape Sequence**

| Escape Sequence | Meaning | 
|---|---|
| \\a | Bell (an alert that causes the computer to beep) | 
| \\b | Backspace | 
| \\n | Newline. On Unix-like systems, this produces a linefeed. | 
| \\r | Carriage return | 
| \\t | Tab | 
| \\uHHHH | the Unicode (ISO/IEC 10646) character whose value is the hexadecimal value *HHHH* (one to four hex digits) | 
| \\UHHHHHHHH | the Unicode (ISO/IEC 10646) character whose value is the hexadecimal value *HHHHHHHH* (one to eight hex digits) | 

```bash
# Bash
$ echo This is first line\nThis is second line
This is first linenThis is second line
$ echo -e "This is first line\nThis is second line"
This is first line
This is second line
$ echo -e 'This is first line\nThis is second line'
This is first line
This is second line
```

```bash
# Bash
$ echo "This is first line\nThis is second line"
This is first line\nThis is second line
$ echo "This is \$ 5.00"
This is $ 5.00
```

```bash
$ echo -e "\u2665"
♥
$ echo -e "\U1F970"
🥰
```

👉 Unicode Character Table: <https://symbl.cc/en/unicode-table/>
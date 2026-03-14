# Starting a Project

## Variables and Constants

How do we create a variable? —> We just use it. When the shell encounters a variable, it automatically creates it.

```bash
$ foo="foo.txt"
$ echo $foo # or echo ${foo}
```

Some rules about variable names:

1. Variable names may consist of alphanumeric characters (letters and numbers) and underscore(`_`) characters.
2. The first character of a variable name must be either a letter or an underscore.
3. Spaces and punctuation symbols are not allowed.

The shell makes no distinction between variables and constants; they are mostly for the programmer’s convenience. A common convention is to use uppercase letters to designate constants and lowercase letters for true variables.

### Assigning Values to Variables and Constants

```bash
$ VARIABLE=VALUE
```

Where `VARIABLE` is the name of the variable and `VALUE` is a string. Unlike some other programming languages, the shell does not care about the type of data assigned to a variable; it treats them all as *strings*. Note that in an assignment, there must be *no spaces between the variable name, the equal sign, and the value*.

```bash
$ a=z # Assign the string "z" to variable a.
$ b="a string" # Embedded spaces must be within quotes.
$ c="a string and $b" # Other expansions such as variables can be expanded into the assignment.
$ d="$(ls -l foo.txt)" # Results of a command.
$ e=$((5 * 7)) # Arithmetic expansion.
$ f="\t\ta string\n" # Escape sequences such as tabs and newlines.
```

Multiple variable assignments may be done on a single line.

```bash
$ a=5 b="a string"
```

During expansion, variable names may be surrounded by optional curly braces, `{}`. This is useful in cases where a variable name becomes ambiguous because of its surrounding context.

```bash
$ filename="myfile"
$ touch "$filename"
$ mv "$filename" "$filename1" # we will get error
$ mv "$filename" "${filename}1"
```

## Here Documents (Here Scripts)

A here document is an additional form of I/O redirection in which we embed a body of text into our script and feed it into the standard input of a command. They can be used with any command that accepts standard input (`cat`, `grep`, `sed`, `awk`, `mysql`, `ssh`, `ftp`, `bash`, etc.).

```bash
$ COMMAND << TOKEN
text
text
text
...
TOKEN
```

Where `COMMAND` is the name of command that accepts standard input and `TOKEN` is a string used to indicate the end of the embedded text.Note that the token must appear alone and that there must not be trailing spaces on the line.
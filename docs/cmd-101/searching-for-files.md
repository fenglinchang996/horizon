# Searching for Files

## `locate` - Find Files the Easy Way

The locate program performs a rapid _database_ search of pathnames, and then outputs every name that matches a given substring.

```bash
$ locate PATH_NAME
```

For example:

```bash
$ locate /bin/zip
```

To let `locate` handle the _wildcard_, use single quotes. This prevents the shell from expanding it before `locate` runs.

```bash
locate '*.txt'
```

> For Linux:
>
> The `locate` database is created by another program named `updatedb`. Usually, it is run periodically as a `cron` job, that is, a task performed at regular intervals by the cron daemon. Most systems equipped with locate run updatedb once a day.
>
> For Mac:
>
> The `locate` database is typically only regenerated once a week by the `/System/Library/LaunchDaemons/com.apple.locate.plist` job. The `locate` database is typically built by user “nobody” and the `locate.updatedb` utility skips directories which are not readable for user “nobody”, group “nobody”, or world. For example, if your `HOME` directory is not world-readable, none of your files are in the database.

## `find` - Find Files the Hard Way

While the `locate` program can find a file based solely on its name, the `find` program searches a given directory (and its subdirectories) for files based on a variety of attributes.

In its simplest use, find is given one or more names of _directories_ to search.

```bash
$ find DIR_NAME...
```

The power of find lies in its ability to locate files based on specific criteria using _options_, _tests_, and _actions_.

### Tests

#### `-type FILE_TYPE`

True if the file is of the specified type.

`find` **File Types**

| File Type | Description                   |
| --------- | ----------------------------- |
| `b`       | Block special device file     |
| `c`       | Character special device file |
| `d`       | Directory                     |
| `f`       | Regular file                  |
| `l`       | Symbolic link                 |

```bash
$ find . -type d | wc -l
```

#### `-name PATTERN`

True if the last component of the pathname being examined matches _wildcard_ PATTERN.

```bash
$ find . -name "*.txt" | wc -l
```

#### `-iname PATTERN`

Like the `-name` test but **case-insensitive**.

**`-regex PATTERN`**

True if the whole path of the file matches pattern using regular expression.

#### `-size [-+]N[SIZE_UNIT]`

True if the file’s size is larger/smaller particular size.

The leading plus/negative sign indicates that we are looking for files larger/smaller than the specified number.

`find` **Size Unit**s

| Szie Unit   | Description                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------- |
| `b` (linux) | (Rounded up in) 512-byte blocks. This is the default if no unit is specified (both Mac and Linux). |
| `c`         | Bytes.                                                                                             |
| `w` (linux) | 2-byte words.                                                                                      |
| `k`         | Kilobytes                                                                                          |
| `M`         | Megabytes                                                                                          |
| `G`         | Gigabytes                                                                                          |

```bash
$ find . -size +1M | wc -l
```

#### `perm [-+]MODE` (MacOS) or `perm [-/]MODE` (Linux)

Match files or directories that have permissions set to the specified `MODE`. `MODE` can be expressed by either octal or symbolic notation. For If the mode is octal, only bits 07777 of the file’s mode bits participate in the comparison. If the mode is preceded by a dash `-`, this primary evaluates to true if at least **all** of the bits in the mode are set in the file's mode bits. If the mode is preceded by a plus `+` (For Linux, by a slash `/`), this primary evaluates to true if **any** of the bits in the mode are set in the file's mode bits. Otherwise, this primary evaluates to true if the bits in the mode exactly match the file's mode bits.

```bash
$ find . -perm 644
```

Given a file `test` with permision `rw-r--r--`, which of the following output will display `test` ?

```bash
$ find . -perm 644
$ find . -perm 244
$ find . -perm +244
$ find . -perm -244
$ find . -perm +722
$ find . -perm -722
```

### Operators

`find` provides a way to combine tests using _logical operators_ to create more complex logical relationships.

`find` **Logical Operators**

| Operator | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-and`   | Match if the tests on both sides of the operator are true. This can be shortened to `-a`. Note that when no operator is present, `-and` is implied (between each of test and action) _by default_.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `-or`    | Match if a test on either side of the operator is true. This can be shortened to `-o`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `-not`   | Match if the test following the operator is false. This can be abbreviated with an exclamation point (`!`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `( )`    | Groups tests and operators together to form larger expressions. This is used to control the precedence of the logical evaluations. By default, `find` evaluates from left to right. It is often necessary to override the default evaluation order to obtain the desired result. Even if not needed, it is helpful sometimes to include the grouping characters to improve the readability of the command. Note that since the parentheses have special meaning to the shell, they must be quoted when using them on the command line to allow them to be passed as arguments to `find`. Usually the backslash character is used to escape them. |

Syntax:

```bash
$ find PATH_NAME EXPR1 -OPERATOR EXPR2
```

Examples:

```bash
$ find ~ \( -type f -not -perm 0600 \) -or \( -type d -not -perm 0700 \)
```

### Actions

`find` allows actions to be performed based on the search results.

#### Predefined Actions

| Action    | Description                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `-delete` | Delete the currently matching file.                                                                                           |
| `-ls`     | Perform the equivalent of `ls -dils` on the matching file. Output is sent to standard output.                                 |
| `-print`  | Output the full pathname of the matching file to standard output. This is the default action if no other action is specified. |
| `-quit`   | Quit once a match has been made.                                                                                              |

Remember, there is, by default, an implied `-and` relationship between each test and action. Since the logical relationship between the tests and actions determines which of them are performed, we can see that the order of the tests and actions is important.

What the output difference between these two commands:

```bash
$ find . -print -type f
$ find . -type f -print
```

#### User-Defined Actions

`-exec COMMAND '{}' ';'`

Here `COMMAND` is the name of a command, `{}` is a symbolic representation of the current pathname, and the semicolon is a required delimiter indicating the end of the command.

```bash
$ find . -type f -exec ls -l '{}' ';'
```

It’s also possible to execute a user-defined action interactively. By using the `-ok` action in place of `-exec`, the user is prompted before execution of each specified command.

```bash
$ find . -type f -ok ls -l '{}' ';'
```

By changing the trailing semicolon character to a plus sign (`+`), we activate the ability of find to combine the results of the search into an argument list for a single execution of the desired command.

```bash
$ find . -type f -ok ls -l '{}' +
```

### Options

The options are used to control the scope of a `find` search.

`find` **Options**

| Option   | Description                                                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-depth` | directories are visited in post-order and all entries in a directory will be acted on before the directory itself. By default, find visits directories in pre-order |

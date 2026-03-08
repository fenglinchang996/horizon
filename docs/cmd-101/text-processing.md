# Text Processing

## Revisiting Some Old Friends

### `cat`

- Quickly creating or editing files directly from the command line (press `Ctrl + D` to signal the end of input):

  ```bash
  $ cat > foo.txt
  ```

- Display non-printing characters in the text
  - `-A` for Unix
  - `-v` or `-e` for MacOS
- `-n`: Number the output lines, starting at 1.
- `-s`: Squeeze multiple adjacent empty lines, causing the output to be single spaced.

### `sort`

The `sort` utility sorts text and binary files by lines.

- Sort the text form standard input:

  ```bash
  $ sort > foo.txt
  c
  b
  a
  $ cat foo.txt
  a
  b
  c
  ```

`sort` **Options**

Option

Long Option

Description

`-b`

`--ignore-leading-blanks`

By default, sorting is performed on the entire line, starting with the first character in the line. This option causes sort to ignore leading spaces in lines and calculates sorting based on the first non-whitespace character on the line.

`-f`

`--ignore-case`

Make sorting case-insensitive.

`-n`

`--numeric-sort`

Perform sorting based on the numeric evaluation of a string. Using this option allows sorting to be performed on numeric values rather than alphabetic values.

`-r`

`--reverse`

Sort in reverse order. Results are in descending rather than ascending order.

`-k FILED1[, FIELD2]`

`--key=FIELD1[,FIELD2]`

Sort based on a key field located from `FIELD1` to `FIELD2` rather than the entire line. **If `FIELD2` is missing, the end of the key defaults to the end of the line.**

The whitespace characters (spaces and tabs) are used as delimiters between fields and the delimiters are included in the field when sorting is performed.

The `-k` option may be specified multiple times, in which case subsequent keys are compared when earlier keys compare equal. The arguments `FIELD1` and `FIELD2` can be followed by one or more of the modifiers `b`, `d`, `f`, `i`, `n`, `g`, `M` and `r`, which correspond to the options in the table.

A `FIELD` position specified by `m.n` is interpreted as the `nth` character from the beginning of the `mth` field. A missing `.n` in `FIELD` means `.1`, indicating the first character of the `mth` field. if the `-b` option is in effect, `n` is counted from the first non-blank character in the `mth` field; `m.1b` refers to the first non-blank character in the `mth` field. `1.n` refers to the `nth` character from the beginning of the line; if `n` is greater than the length of the line, the field is taken to be empty.

`-m` (Linux)

`--merge`

Treat each argument as the name of a presorted file. Merge multiple files into a single sorted result without performing any additional sorting.

`-o FILE`

`--output=FILE`

Send sorted output to file rather than standard output.

`-t CHAR`

`--field-separator=CHAR`

Define the field-separator character. The initial `CHAR` is not considered to be part of a field when determining key offsets. By default fields are separated by a sequence of _spaces_ or _tabs_, and consecutive blank spaces do not delimit an empty field, however, the initial blank space is considered part of a field when determining key offsets.

`-h`

`--human-numeric-sort`

Sort by numerical value, but take into account the SI suffix, if present.

`-s`

Stable sort. This option maintains the original record order of records that have an equal key.

Some examples:

```bash
$ du -sk /usr/share/* | head
$ du -sk /usr/share/* | sort -nr | head
```

```bash
$ ls -lB /usr/bin | head # -B options for exa to display file size in byte
$ ls -lB /usr/bin | sort -nrk 2 | head
```

```shell
# distros.txt
SUSE 10.2 12/07/2006
Fedora 10 11/25/2008
SUSE 11.0 06/19/2008
Ubuntu 8.04 04/24/2008
Fedora 8 11/08/2007
SUSE 10.3 10/04/2007
Ubuntu 6.10 10/26/2006
Fedora 7 05/31/2007
Ubuntu 7.10 10/18/2007
Ubuntu 7.04 04/19/2007
SUSE 10.1 05/11/2006
Fedora 6 10/24/2006
Fedora 9 05/13/2008
Ubuntu 6.06 06/01/2006
Ubuntu 8.10 10/30/2008
Fedora 5 03/20/2006
$ sort distros.txt
$ sort -s --key=1 distros.txt
$ sort -s --key=1,1 distros.txt
$ sort --key=1 distros.txt
$ sort --key=1,1 distros.txt
$ sort -s --key=1,1 --key=2n distros.txt
$ sort -k 3.7nbr -k 3.1nbr -k 3.4nbr distros.txt
```

```bash
$ head /etc/passwd
$ sort -t ':' -k 7 /etc/passwd | head
```

### `uniq`

When given a **sorted** file (or standard input), `uniq` removes any duplicate lines and sends the results to output. `uniq` _only_ removes duplicate lines that are adjacent to each other.

`uniq` **Options**

| Option | Long Option      | Description                                                                                                                                                                                |
| ------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-c`   | `--count`        | Output a list of duplicate lines preceded by the number of times the line occurs.                                                                                                          |
| `-d`   | `--repeated`     | Output only repeated lines, rather than unique lines.                                                                                                                                      |
| `-f N` | `—skip-fields=N` | Ignore `N` leading fields in each line. Fields are separated by **whitespace** as they are in sort; however, unlike `sort`, `uniq` has no option for setting an alternate field separator. |
| `i`    | `--ignore-case`  | Ignore case during the line comparisons.                                                                                                                                                   |
| `s N`  | `--skip-chars=N` | Skip (ignore) the leading `N` characters of each line.                                                                                                                                     |
| `u`    | `--unique`       | Output only unique lines. Lines with duplicates are ignored.                                                                                                                               |

## Slicing and Dicing

### `cut`

The `cut` program is used to extract a section of text from a line and output the extracted section to standard output. It can accept multiple file arguments or input from standard input.

`cut` **Options**

| Option     | Long Option            | Description                                                                                                                                                |
| ---------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-c list`  | `--characters=list`    | Extract the portion of the line defined by `LIST`. The list may consist of one or more comma-separated numerical ranges, such as: `1,2`, `1-3`, `1,2,4-6`. |
| `-f LIST`  | `--fields=LIST`        | Extract one or more fields from the line as defined by `LIST`. The list may contain one or more fields or field ranges separated by commas.                |
| `-d DELIM` | `--delimeter=DELIM`    | When `-f` is specified, use `DELIM` as the field delimiting character. By default, fields must be separated by a single tab character.                     |
|            | `--complement` (Linux) | Extract the entire line of text, except for those portions specified by `-c` and/or `-f`.                                                                  |

The way cut extracts text is rather inflexible. `cut` is best used to extract text from files that are produced by other programs, rather than text directly typed by humans.

Since the `distros.txt` file uses tabs rather than spaces (meaning it’s tab-delimited), we can use the `-f` option to extract a field.

```bash
$ cut -f 3 distros.txt
```

How character extraction works:

```bash
$ cut -f 3 distros.txt | cut -c 7-10
```

When working with fields, it is possible to specify a different field delimiter rather than the tab character.

### `paste`

The `paste` command adds one or more columns of text to a file. It does this by reading multiple files and combining the fields found in each file into a single stream on standard output.

```bash
$ paste FILE...
```

| Option    | Long Option | Description                                                                                                                                                                                                                    |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-d LIST` |             | Use one or more of the provided characters to replace the newline characters instead of _the default tab_. The characters in `LIST` are used circularly, i.e., when list is exhausted the first character from list is reused. |

### `join`

The `join` program _joins_ data from multiple files based on _a shared key field_. The files must be sorted on the key field for join to work properly.

```bash
$ join FILE1 FILE2
```

The _shared key field_ or _join field_ is the field in each file by which the files are compared. The first field in each line is used by default. There is one line in the output for each pair of lines in `FILE1` and `FILE2` which have identical join fields. The default field separators are **tab** and **space** characters. In this case, multiple tabs and spaces count as a single field separator, and leading tabs and spaces are ignored. The default output field separator is a single space character.

## Comparing Text

### `comm`

The comm program compares two text files and displays the lines that are unique to each one and the lines they have in common.

```bash
# file1.txt
a
b
c
d
# file2.txt
b
c
d
e
```

```bash
$ comm file1.txt file2.txt
```

`comm` produces three columns of output. The first column contains lines unique to the first file argument, the second column contains the lines unique to the second file argument, and the third column contains the lines shared by both files. `comm` supports options in the form `-N`, where `N` is either `1`, `2`, or `3`. When used, these options specify which columns to suppress.

```bash
$ comm -12 file1.txt file2.txt
```

### `diff`

`diff` is used to detect the differences between files, just like the `comm` program. However, `diff` is a much more complex tool, supporting many output formats and the ability to process large collections of text files at once.

`diff` output format:

- **Default format**: each group of changes is preceded by a change command in the form of range operation range to describe the positions and types of changes required to convert the first file to the second file.

  `diff` **Change Commands**

  | Change  | Description                                                                                                     |
  | ------- | --------------------------------------------------------------------------------------------------------------- |
  | `r1ar2` | Append the lines at the position `r2` in the second file to the position `r1` in the first file.                |
  | `r1cr2` | Change (replace) the lines at position `r1` with the lines at the position `r2` in the second file.             |
  | `r1dr2` | Delete the lines in the first file at position `r1`, which would have appeared at range `r2` in the second file |

  ```bash
  $ diff file1.txt file2.txt
  1d0
  < a
  4a4
  > e
  ```

- **Context format**: use `-c` option to display result as context format

  The output begins with the names of the two files and their timestamps. The first file is marked with asterisks and the second file is marked with dashes. Throughout the remainder of the listing, these markers will signify their respective files. Next, we see groups of changes, including the default number of surrounding context lines.

  `diff` **Context Format Change Indicators**

  | Indicator | Meaning                                                                                                             |
  | --------- | ------------------------------------------------------------------------------------------------------------------- |
  | blank     | A line shown for context. It does not indicate a difference between the two files.                                  |
  | \-        | A line deleted. This line will appear in the first file but not in the second file.                                 |
  | \+        | A line added. This line will appear in the second file but not in the first file.                                   |
  | !         | A line changed. The two versions of the line will be displayed, each in its respective section of the change group. |

  ```bash
  $ diff -c file1.txt file2.txt
  *** file1.txt2008-12-23 06:40:13.000000000 -0500
  --- file2.txt2008-12-23 06:40:34.000000000 -0500
  ***************
  *** 1,4 ****
  - a
  b
  c
  d
  --- 1,4 ----
  b
  c
  d
  + e
  ```

- **Unified format**: this format is similar to the context format but is more concise. It is specified with the `-u` option. The most notable difference between the context and unified formats is the elimination of the duplicated lines of context, making the results of the unified format shorter than those of the context format.

  `diff` **Unified Format Change Indicators**

  | Indicator | Meaning                                    |
  | --------- | ------------------------------------------ |
  | blank     | This line is shared by both files.         |
  | \-        | This line was removed from the first file. |
  | \+        | This line was added to the first file.     |

  ```bash
  $ diff -u file1.txt file2.txt
  --- file1.txt2008-12-23 06:40:13.000000000 -0500
  +++ file2.txt2008-12-23 06:40:34.000000000 -0500
  @@ -1,4 +1,4 @@
  -a
  b
  c
  d
  +e
  ```

### `patch`

The patch program is used to apply changes to text files. It **accepts output from** `diff` and is generally used to convert older version files into newer versions.

```bash
$ patch < DIFF_FILE
```

## Editing on the Fly

### `tr`

The tr program is used to transliterate characters. We can think of this as a sort of _character-based search-and-replace operation_. Transliteration is the process of changing characters from one alphabet to another. `tr` operates on standard input, and outputs its results on standard output. `tr` accepts two arguments: **a set of characters to convert from (**`STRING1`**)** and **a corresponding set of characters to convert to (**`STRING2`**)**.

```bash
$ tr STRING1 STRING2
```

Character sets may be expressed in one of three ways:

1. An enumerated list. For example, `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
2. A character range. For example, `A-Z`. Note that this method is sometimes subject to the same issues as other commands, because of the locale collation order, and thus should be used with caution.
3. 3\. POSIX character classes. For example, `[:upper:]`.

In most cases, both character sets should be of equal length; however, it is possible for the first set to be larger than the second, particularly if we want to convert multiple characters to a single character.

**Options**

`-d`

```bash
$ tr -d STRING
```

Delete characters in STRING from the input.

```bash
$ echo 'abc\n' | tr -d '\n'
abc
```

`-s`

```bash
$ tr -s STRING
```

Squeeze (delete) repeated instances of a character. Note that the repeating characters must be adjoining. If they are not, the squeezing will have no effect.

```bash
$ echo "aaabbbccc" | tr -s ab
abccc
```

### `sed`

Short for _stream editor_. In general, the way `sed` works is that it is given either _a single editing command_ (on the command line) or the name of _a script_ file containing multiple commands, and it then performs these commands upon each line in the stream of text.

```bash
$ sed COMMAND FILE...
```

`COMMAND` = `ADDRESS` + `EDITING COMMAND`

An Example:

```bash
$ echo "front" | sed 's/front/back/'
```

In the example, the substitution command is represented by the letter `s` and is followed by the search-and-replace strings, separated by the slash character as a delimiter. The choice of the delimiter character is arbitrary. By convention, the slash character (`/`) is often used, but `sed` will **accept any character that immediately follows the command as the delimiter**.

Most commands in `sed` may be preceded by an address, which specifies which line(s) of the input stream will be edited. If the address is omitted, then the editing command is carried out on every line in the input stream. The simplest form of address is a line number.

```bash
$ echo "front" | sed '1s/front/back/'
back
```

```bash
$ echo "front" | sed '2s/front/back/'
front
```

`sed` **Address Notation**

| Address       | Description                                                                                                                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `N`           | A line number where `N` is a positive integer.                                                                                                                                                                                                                                              |
| `$`           | The last line.                                                                                                                                                                                                                                                                              |
| `/REGEXP/`    | Lines matching a POSIX basic regular expression. Note that the regular expression is delimited by slash characters (`/`). Optionally, the regular expression may be delimited by an alternate character, by specifying the expression with `\cregexpc`, where c is the alternate character. |
| `ADDR1,ADDR2` | A range of lines from `ADDR1` to `ADDR2`, inclusive. Addresses may be any of the single address forms listed earlier.                                                                                                                                                                       |
| `FIRST~SETP`  | Match the line represented by the number `FIRST`, then each subsequent line at `STEP` intervals. For example `1~2` refers to each odd numbered line, and `5~5` refers to the fifth line and every fifth line thereafter.                                                                    |
| `ADDR1,+N`    | Match `ADDR1` and the following `N` lines.                                                                                                                                                                                                                                                  |
| `ADDR!`       | Match all lines except `ADDR`, which may be any of the forms listed earlier.                                                                                                                                                                                                                |

```bash
$ sed -n '1,5p' distros.txt
```

In this example, we print a range of lines, starting with line 1 and continuing to line 5. To do this, we use the `p` command, which simply causes a matched line to be printed. For this to be effective, however, we must include the option `-n` (the “no auto-print” option) to cause `sed` not to print every line by default (In other words, the default behavior of `sed` is to process each line and automatically print it).

```bash
$ sed -n '/SUSE/p' distros.txt
```

```bash
$ sed -n '/SUSE/!p' distros.txt
```

`sed` **Basic Editing Commands**

| Command                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `=`                     | Output the current line number.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `a`                     | Append text after the current line.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `d`                     | Delete the current line.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `i`                     | Insert text in front of the current line.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `p`                     | Print the current line. By default, `sed` prints every line and only edits lines that match a specified address within the file. The default behavior can be overridden by specifying the `-n` option.                                                                                                                                                                                                                                               |
| `q`                     | Exit `sed` without processing any more lines. If the `-n` option is not specified, output the current line.                                                                                                                                                                                                                                                                                                                                          |
| `Q`                     | Exit `sed` without processing any more lines.                                                                                                                                                                                                                                                                                                                                                                                                        |
| `s/REGEXP/REPLACEMENT/` | Substitute the contents of `REPLACEMENT` wherever `REGEXP` is found. `REPLACEMENT` may include the special character `&`, which is equivalent to the text matched by `REGEXP`. In addition, `REPLACEMENT` may include the sequences `\1` through `\9`, which are the contents of the corresponding subexpressions in `REGEXP`. After the trailing slash following replacement, an optional flag may be specified to modify the s command’s behavior. |
| `y/SET1/SET2`           | Perform transliteration by converting characters from `SET1` to the corresponding characters in `SET2`. Note that unlike `tr`, `sed` requires that both sets be of the same length.                                                                                                                                                                                                                                                                  |

`s/REGEXP/REPLACEMENT/[FLAG]`

**Back Reference**: if the sequence `\N` appears in `REPLACEMENT` where `N` is a number from `1` to `9`, the sequence will refer to the corresponding _subexpression_ in the preceding regular expression. To create the subexpressions, we simply enclose them in parentheses.

```bash
$ sed -E 's/([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/\3-\1-\2/' distros.txt
```

About `[FLAG]`: The most important of these is the `g` flag, which instructs sed to apply the search-and-replace globally to a line, not just to the first instance, which is the default.

```bash
$ echo "aaabbbccc" | sed 's/b/B/'
aaaBbbccc
$ echo "aaabbbccc" | sed 's/b/B/g'
aaaBBBccc
```

Note that It is also possible to construct more complex commands in a script file using the `-f` option.

```bash
# distros.sed

1 i\
\
Linux Distributions Report\

s/\([0-9]\{2\}\)\/\([0-9]\{2\}\)\/\([0-9]\{4\}\)$/\3-\1-\2/
y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/
```

```bash
$ sed -f distros.sed distros.txt
```

### `awk`

### `aspell`


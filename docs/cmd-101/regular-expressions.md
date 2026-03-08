# Regular Expressions

Regular expressions are symbolic notations used to identify patterns in text.

## `grep`

- The name "grep" is actually derived from the phrase "global regular expression print".
- `grep` searches text files for the occurrence text matching a specified regular expression and outputs any line containing a match to standard output.

```bash
$ grep [OPTIONS] REGREX [FILE...]
```

`grep` **Options**

| Option | Long Option             | Description                                                                                                                                    |
| ------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `-i`   | `--ignore-case`         | Ignore case. Do not distinguish between uppercase and lowercase characters.                                                                    |
| `-v`   | `--invert-match`        | Invert match. Normally, `grep` prints lines that contain a match. This option causes `grep` to print every line that does not contain a match. |
| `-c`   | `--count`               | Print the number of matches (or non-matches if the `-v` option is also specified) instead of the lines themselves.                             |
| `-l`   | `--files-with-matches`  | Print the name of each file that contains a match instead of the lines themselves.                                                             |
| `-L`   | `--files-without-match` | Like the `-l` option, but print only the names of files that do not contain matches.                                                           |
| `-n`   | `--line-number`         | Prefix each matching line with the number of the line within the file.                                                                         |
| `-h`   | `--no-filename`         | For multi-file searches, suppress the output of filenames.                                                                                     |

## Metacharacters and Literals

Metacharacters are used to specify more complex matches. Regular expression metacharacters consist of the following:

`^`, `$`, `.`, `[`, `]`, `{`, `}`, `-`, `?`, `*`, `+`, `(`, `)`, `|`, `\`

> Many of the regular expression metacharacters are also characters that have meaning to the shell when expansion is performed. When we pass regular expressions containing metacharacters on the command line, it is vital that they be enclosed in quotes to prevent the shell from attempting to expand them.

[https://youtu.be/izOdJH4fsUs](https://youtu.be/izOdJH4fsUs)

## The Any Character (`.`)

## Anchors (`^`, `$`)

## Bracket Expressions (`[]`) and Character Classes

### Negation (`^` in bract expressions)

### Character Ranges (`-`)

### POSIX Character Classes

## POSIX BRE and ERE

**BRE**: **Basic Regular Expressions**

**ERE**: **Extended Regular Expressions**

## Alternation (`|`)

## Quantifiers

### `?` - Match an Element Zero or One Time

### `*` - Match an Element Zero or More Times

### `+` - Match an Element One or More Times

### `{}` - Match an Element a Specific Number of Times


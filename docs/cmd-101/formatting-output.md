# Formatting Output

## Simple Formatting Tools

### `nl`: Number Lines

It numbers lines. In its simplest use, it resembles `cat -n`.

```bash
$ nl distros.txt
```

`nl` can accept either multiple files as command line arguments or standard input. If `nl` is given multiple files, it treats them as a single stream of text. `nl` supports a concept called *logical pages* when numbering. This allows `nl` to reset (start over) the numerical sequence when numbering. A logical page is further broken down into a header, body, and footer. Within each of these sections, line numbering may be reset and/or be assigned a different style. Sections in the text stream are indicated by the presence of some rather odd-looking markup added to the text:

`nl` **Markup**

| Markup   | Meaning                      |
| -------- | ---------------------------- |
| `\:\:\:` | Start of logical page header |
| `\:\:`   | Start of logical page body   |
| `\:`     | Start of logical page footer |

Each of the markup elements listed in the above table must appear alone on its own line. After processing a markup element, `nl` deletes it from the text stream.

**Common** `nl` **Options**

Option

Meaning

`-b STYLE`

Set body numbering to `STYLE`, where style is one of the following:

`a` = Number all lines

`t` = Number only non-blank lines. This is the default.

`n` = None

`pREGEXP` = Number only lines matching basic regular expression `REGEXP`

`-f STYLE`

Set footer numbering to `STYLE`. The default is `n` (none).

`-h STYLE`

Set header numbering to `STYLE`. The default is `n` (none).

`-i NUMBER`

Set page numbering increment to `NUMBER`. The default is one.

`-n FORMAT`

Set numbering format to `FORMAT`, where `FORMAT` is one of the following:

`ln` = Left justified, without leading zeros.

`rn` = Right justified, without leading zeros. This is the default.

`rz` = Right justified, with leading zeros.

`-p`

Do not reset page numbering at the beginning of each logical page.

`-s STRING`

Add `STRING` to the end of each line number to create a separator. The default is a *single tab character*.

`-v NUMBER`

Set first line number of each logical page to `NUMBER`. The default is one.

`-w WIDTH`

Set width of the line number field to `WIDTH`. The default is 6.

```bash
# distros-nl.sel
#sed script to produce Linux distributions report

1 i\
\\:\\:\\:\
\
Linux Distributions Report\
\
Name    Ver.    Released\
----    ----    --------\
\\:\\:
s/\([0-9]\{2\}\)\/\([0-9]\{2\}\)\/\([0-9]\{4\}\)$/\3-\1-\2/
$ a\
\\:\
\
End Of Report
```

### `fold`: Wrap Each Line to a Sepcified Length

Folding is the process of breaking lines of text at a specified width.

| Option     | Meaning                                                                                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-s`       | Fold line after the last blank character within the first WIDTH column positions (or bytes). This will cause `fold` to break the line at the last available space before the line width is reached. |
| `-w WIDTH` | Specify a line width to use instead of the default 80 columns.                                                                                                                                      |

### `fmt`: A Simple Text Formatter

It accepts either files or standard input and performs paragraph formatting on the text stream. Basically, it fills and joins lines in text while preserving blank lines and indentation.

`fmt` **Options**

| Option      | Meaning                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-c`        | Operate in **crown margin** mode. This preserves the indentation of the first two lines of a paragraph. Subsequent lines are aligned with the indentation of the second line.                                                                                                                                                                                                                                   |
| `-p STRING` | Format only those lines beginning with the prefix `STRING`. After formatting, the contents of string are prefixed to each reformatted line. This option can be used to format text in source code comments. For example, any programming language or configuration file that uses a `#` character to delineate a comment could be formatted by specifying `-p '#'` so that only the comments will be formatted. |
| `-s`        | Split-only mode. In this mode, lines will only be split to fit the specified column width. Short lines will not be joined to fill lines. This mode is useful when formatting text such as code where joining is not desired.                                                                                                                                                                                    |
| `-u`        | Perform uniform spacing. This will apply traditional “typewriter-style” formatting to the text. This means a single space between words and two spaces between sentences. This mode is useful for removing “justification,” that is, text that has been padded with spaces to force alignment on both the left and right margins.                                                                               |
| `-w WIDTH`  | Format text to fit within a column `WIDTH` characters wide. The default is 75 characters. Note: `fmt` actually formats lines slightly shorter than the specified width to allow for line balancing.                                                                                                                                                                                                             |

### `pr`: Format Text for Printing

The `pr` program is used to *paginate* text. We have `-l` option for page length and the `-w` option for page width.

```bash
$ pr -l 15 -w 65 distros.txt
```

This define a *page* that is `65` columns wide and `15` lines long.

### `printf`: Format and Print Data

`printf` (from the phrase "print formated") works like this:

```bash
$ printf "FORMAT" ARGUMENTS
```

The `FORMAT` string may contain literal text (like “I formatted the string:”), escape sequences (such as `\n`, a newline character), and sequences beginning with the `%` character, which are called **conversion specifications**.

Some examples:

```bash
$ printf "I formatted the string: %s\n" foo
I formatted the string: foo
```

```bash
$ printf "I formatted '%s' as a string.\n" foo
I formatted 'foo' as a string.
```

As we can see, the `%s` conversion specification is replaced by the string `foo` in the command’s output.

**Common** `printf` **Data Type Specifiers**

| Specifier | Description                                                                       |
| --------- | --------------------------------------------------------------------------------- |
| `d`       | Format a number as a signed decimal integer.                                      |
| `f`       | Format and output a floating-point number.                                        |
| `o`       | Format an integer as an octal number.                                             |
| `s`       | Format a string.                                                                  |
| `x`       | Format an integer as a hexadecimal number using lowercase `a` to `f` when needed. |
| `X`       | Same as `x` but use uppercase letters.                                            |
| `%`       | Print a literal `%` symbol (i.e., specify `%%`)                                   |

```bash
$ printf "%d, %f, %o, %s, %x, %x, %X" 380 380 380 380 380 380
380, 380.000000, 574, 380, 17c, 17C
```

Several optional components may be added to the conversion specifier to adjust its output. A complete conversion specification may consist of the following:

`%[FLAGS][WIDTH][.PRECISION]CONVERSION_SPECIFICATION`

`printf` **Conversion Specification Components**

Component

Description

`FLAGS`

There are 5 different flags:

- `#`: Use the “alternate format” for output. This varies by data type. For `o` (octal number) conversion, the output is prefixed with `0`. For `x` and `X` (hexadecimal number) conversions, the output is prefixed with `0x` or `0X` respectively.
- `0`: Pad the output with zeros. This means that the field will be filled with leading zeros, as in `000380`.
- `-`: Left-align the output. By default, printf right-aligns output.
- ` `: Produce a leading space for positive numbers.
- `+`: Sign positive numbers. By default, `printf` only signs negative numbers.

`WIDTH`

A number specifying the minimum field width.

`.PRECISION`

For floating-point numbers, specify the number of digits of precision to be output after the decimal point. For string conversion, `PRECISION` specifies the number of characters to output.

`printf` **Conversion Specification Examples**

| Argument      | Format     | Result        | Notes                                                                                                                                                                                                                        |
| ------------- | ---------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `380`         | `"%d"`     | `380`         | Simple formatting of an integer.                                                                                                                                                                                             |
| `380`         | `"%#x"`    | `0x17c`       | Integer formatted as a hexadecimal number using the “alternate format” flag.                                                                                                                                                 |
| `380`         | `"%05d"`   | `00380`       | Integer formatted with leading zeros (padding) and a minimum field width of five characters.                                                                                                                                 |
| `380`         | `"%05.5f"` | `380.00000`   | Number formatted as a floating-point number with padding and five decimal places of precision. Since the specified minimum field width (5) is less than the actual width of the formatted number, the padding has no effect. |
| `380`         | `"010.5f"` | `0380.00000`  | By increasing the minimum field width to 10, the padding is now visible.                                                                                                                                                     |
| `380`         | `"%+d"`    | `+380`        | The `+` flag signs a positive number.                                                                                                                                                                                        |
| `380`         | `"%-d"`    | `380`         | The `-` flag left-aligns the formatting.                                                                                                                                                                                     |
| `abcdefghijk` | `"%5s"`    | `abcdefghijk` | A string formatted with a minimum field width.                                                                                                                                                                               |
| `abcdefghijk` | `"%.5s"`   | `abcde`       | By applying precision to a string, it is truncated.                                                                                                                                                                          |

Some examples:

```bash
$ printf "%s\t%s\t%s\n" str1 str2 str3
```

```bash
$ printf "Line: %05d %15.3f Result: %+15d\n" 1071 3.14156295 32589
```

## Document Formatting Systems

### `groff`
# Strings and Numbers

## Parameter Expansion

> It's always good practice to enclose parameter expansion in double quotes to prevent unwanted word splitting, unless there is a specific reason not to.

### Basic Parameters

```bash
$a
```

Simple parameters may also be surrounded by braces.

```bash
${a}
```

This has no effect on the expansion, but is required if the variable is adjacent to other text, which may confuse the shell.

```bash
$ a="foo"
$ echo "$a_file"
$ echo "${a}_file"
```

### Expansions to Manage Empty Variables

Display a default value for an unset or empty parameter:

```bash
${PARAMETER:-WORD}
```

If parameter is unset (i.e., does not exist) or is empty, this expansion results in the value of `WORD`. If parameter is not empty, the expansion results in the value of `PARAMETER`.

```bash
$ foo=
$ echo ${foo:-"substiture value if unset"}
substiture value if unset
$ echo $foo

$ foo=bar
$ echo ${foo:-"substitute value if unset"}
bar
$ echo $foo
bar
```

Supply a default value if a parameter is either unset or empty:

```bash
${PARAMETER:=WORD}
```

If parameter is unset or empty, this expansion results in the value of word. **In addition, the value of `WORD` is assigned to `PARAMETER`**.

```bash
$ foo=
$ echo ${foo:="default value if unset"}
default value if unset
$ echo $foo
default value if unset
$ foo=bar
$ echo ${foo:="default value if unset"}
bar
$ echo $foo
bar
```

The following expansion causes a script to terminate if a required parameter is either unset or empty.

```bash
${PARAMETER:?WORD}
```

If `PARAMETER` is unset or empty, this expansion causes the script to exit with an error, and the contents of `WORD` are sent to standard error.

```bash
$ foo=
$ echo ${foo:?"parameter is empty"}
bash: foo: parameter is empty
$ echo $?
1
$ foo=bar
$ echo ${foo:?"parameter is empty"}
bar
$ echo $?
0
```

The following expansion substitutes a value for a non-empty parameter.

```bash
${PARAMETER:+WORD}
```

- If `PARAMETER` is unset or empty, the expansion results in nothing.
- If `PARAMETER` is not empty, the value of `WORD` is substituted for `PARAMETER`; however, the value of `PARAMETER` is not changed.

```bash
$ foo=bar
$ echo ${foo:+substitute value if not empty}
substitute value if not empty
$ foo=
$ echo ${foo:+substitute value if not empty}
```

### Expansions That Return Variable Names

The shell has the ability to return the names of variables. This is used in some rather exotic situations.

```bash
${!PREFIX*}
${!PREFIX@}
```

This expansion returns the names of existing variables with names beginning with `PREFIX`.

```bash
echo ${!BASH*}
```

### String Operations

The following expansion expands into the length of the string contained by `PARAMETER`:

```bash
${#PARAMETER}
```

Normally, `PARAMETER` is a string; however, if `PARAMETER` is either `@` or `*`, then the expansion results in the number of positional parameters.

```bash
$ foo="This string is long."
$ echo "'$foo' is ${#foo} characters long."
'This string is long.' is 20 characters long.
```

```bash
${PARAMETER:OFFSET}
${PARAMETER:OFFSET:LENGTH}
```

These expansions are used to extract a portion of the string contained in `PARAMETER`. The extraction begins at `OFFSET` characters from the beginning of the string and continues until the end of the string, unless `LENGTH` is specified.

```bash
$ foo="This string is long."
$ echo ${foo:5}
string is long.
$ echo ${foo:5:6}
string
```

If the value of `OFFSET` is negative, it is taken to mean it starts from the end of the string rather than the beginning.
Note that negative values must be preceded by a space to prevent confusion with the `${PARAMETER:-WORD}` expansion.

```bash
$ foo="This string is long."
$ echo ${foo: -5}
long.
$ echo ${foo: -5:2}
lo
```

```bash
${PARAMETER#PATTERN}
${PARAMETER##PATTERN}
```

These expansions remove a leading portion of the string contained in `PARAMETER` that matches `PATTERN`. `PATTERN` is a wildcard pattern like those used in pathname expansion.
The difference in the two forms is that the `#` form removes the shortest match, while the `##` form removes the longest match.

```bash
$ foo=file.txt.zip
$ echo ${foo#*.}
txt.zip
$ echo ${foo##*.}
zip
```

```bash
${PARAMETER%PATTERN}
${PARAMETER%%PATTERN}
```

These expansions are the same as the previous `#` and `##` expansions, except they remove a trailing portion of the string contained in `PARAMETER` that matches `PATTERN`. The `%` form removes the shortest match, while the `%%` form removes the longest match.

```bash
$ foo=file.txt.zip
$ echo ${foo%.*}
file.txt
$ echo ${foo%%.*}
file
```

```bash
${PARAMETER/PATTERN/STRING}
${PARAMETER//PATTERN/STRING}
${PARAMETER/#PATTERN/STRING}
${PARAMETER/%PATTERN/STRING}
```

These expansions perform a search-and-replace operation on the contents of `PARAMETER`. If text is found matching wildcard `PATTERN`, it is replaced with the contents of `STRING`.

- In the `//` form, all occurrences are replaced.
- The `/#` form requires that the match occur at the beginning of the string.
- The `/%` form requires the match to occur at the end of the string.
- In every form, `/STRING` may be omitted, causing the text matched by pattern to be deleted.

```bash
$ foo=JPG.JPG
$ echo ${foo/JPG/jpg}
jpg.JPG
$ echo ${foo//JPG/jpg}
jpg.jpg
$ echo ${foo/#JPG/jpg}
jpg.JPG
$ echo ${foo/%JPG/jpg}
JPG.jpg
```

### Case Conversion

The `declare` command can be used to normalize strings to either uppercase or lowercase.

```bash
#!/usr/bin/env bash

# ul-declare: demonstrate case conversion via declare

declare -u upper
declare -l lower

if [[ $1 ]]; then
  upper="$1"
  lower="$1"
  echo "$upper"
  echo "$lower"
fi
```

Parameter expansions that perform upper/lower-case conversion.

| Format            | Description                                           | Example (var=`"hello WORLD"`)      |
| ----------------- | ----------------------------------------------------- | ---------------------------------- |
| `${var^^}`        | Convert all characters to uppercase                   | `HELLO WORLD`                      |
| `${var^}`         | Convert only the first character to uppercase         | `Hello WORLD`                      |
| `${var,,}`        | Convert all characters to lowercase                   | `hello world`                      |
| `${var,}`         | Convert only the first character to lowercase         | `hello WORLD`                      |
| `${var^^pattern}` | Convert to uppercase only if characters match pattern | `${var^^[aeiou]}` -> `hEllO WORLD` |
| `${var,,pattern}` | Convert to lowercase only if characters match pattern | `${var,,[W-Z]}` -> `hello world`   |

## Arithmetic Evaluation and Expansion

Basic form:

```bash
$((expression))
```

In arithmetic expressions, the shell supports integer constants in any base.

| Notation      | Description                                                                       |
| ------------- | --------------------------------------------------------------------------------- |
| `NUMBER`      | By default, numbers without any notation are treated as decimal(base 10) integer. |
| `0NUMBER`     | In arithmetic expressions, numbers with a leading 0 are considered octal.         |
| `0xNUMBER`    | Hexadecimal notation.                                                             |
| `BASE#NUMBER` | `NUMBER` is in `BASE`                                                             |

### Unary Operators

`+` and `-`.

### Simple Arithmetic

`+`: Addition
`-`: Substraction
`*`: Multiplication
`/`: Integer division
`**`: Exponentiation
`%`: Modulo (remainder)

Since the shell’s arithmetic operates only on integers, the results of division are always whole numbers.

```bash
$ echo $(( 5 / 2  ))
2
```

### Assignment

We can do assignment within arithmetic expressions.

```bash
$ foo=
$ echo $foo

$ if (( foo = 5 )); then echo "It is true"; fi
It is true.
$ echo $foo
5
```

Assignment Operators

| Notation             | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| `PARAMETER = VALUE`  | Simple assignment. Assigns `VALUE` to `PARAMETER`.                   |
| `PARAMETER += VALUE` | Addition. Equivalent to `PARAMETER` = `PARAMETER` + `VALUE`          |
| `PARAMETER -= VALUE` | Substraction. Equivalent to `PARAMETER` = `PARAMETER` - `VALUE`      |
| `PARAMETER *= VALUE` | Multiplication. Equivalent to `PARAMETER` = `PARAMETER` \* `VALUE`   |
| `PARAMETER /= VALUE` | Division. Equivalent to `PARAMETER` = `PARAMETER` / `VALUE`          |
| `PARAMETER %= VALUE` | Modulo. Equivalent to `PARAMETER` = `PARAMETER` % `VALUE`            |
| `PARAMETER++`        | Variable post-increment. Equivalent to `PARAMETER` = `PARAMETER` + 1 |
| `PARAMETER--`        | Variable post-decrement. Equivalent to `PARAMETER` = `PARAMETER` - 1 |
| `++PARAMETER`        | Variable pre-increment. Equivalent to `PARAMETER` = `PARAMETER` + 1  |
| `--PARAMETER`        | Variable pre-decrement. Equivalent to `PARAMETER` = `PARAMETER` - 1  |

```bash
$ foo=1
$ echo $((foo++)
1
$ echo $foo
2
```

```bash
$ foo=1
$ echo $((++foo)
2
$ echo $foo
2
```

### Bit Operations

Bit Operators

| Operator | Description                                                                        |
| :------- | :--------------------------------------------------------------------------------- |
| `~`      | **Bitwise negation.** Negate all the bits in a number.                             |
| `<<`     | **Left bitwise shift.** Shift all the bits in a number to the left.                |
| `>>`     | **Right bitwise shift.** Shift all the bits in a number to the right.              |
| `&`      | **Bitwise AND.** Perform an AND operation on all the bits in two numbers.          |
| `\|`     | **Bitwise OR.** Perform an OR operation on all the bits in two numbers.            |
| `^`      | **Bitwise XOR.** Perform an exclusive OR operation on all the bits in two numbers. |

### Logic

The `(( ))` compound command supports a variety of comparison operators.

Comparison Operators

| Operator            | Description                                                                                                                  |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `<=`                | Less than or equal to.                                                                                                       |
| `>=`                | Greater than or equal to.                                                                                                    |
| `<`                 | Less than.                                                                                                                   |
| `>`                 | Greater than.                                                                                                                |
| `==`                | Equal to.                                                                                                                    |
| `!=`                | Not equal to.                                                                                                                |
| `&&`                | Logical AND.                                                                                                                 |
| `\|\|`              | Logical OR.                                                                                                                  |
| `EXPR1?EXPR2:EXPR3` | Comparison (ternary) operator. If expression `EXPR1` evaluates to be non-zero (arithmetic true), then `EXPR2`; else `EXPR3`. |

- When used for logical operations, expressions follow the rules of arithmetic logic; that is, expressions that evaluate as zero are considered false, while non-zero expressions are considered true.
- The `(( ))` compound command maps the results into the shell’s normal exit codes.

For `EXPR1?EXPR2:EXPR3`, Note that performing assignment within the expression is not straightforward. Add parentheses around the assignment expression to fix the error.

```bash
$ a=0
$ ((a<1?(a+=1):(a-=1)))
```

### The Comma Operator

The primary role of the comma(`,`) operator is to link multiple expressions together into a single statement, evaluating them from left to right and returning only the value of the last expression.

```bash
#!/usr/bin/env bash

# Using $(( )) for arithmetic

result=$(( x=5, y=10, x + y ))

echo "x: $x"           # 5
echo "y: $y"           # 10
echo "result: $result" # 15
```

# Positional Parameters

## Accessing the Command Line

The shell provides a set of variables called positional parameters that contain the individual words on the command line. The variables are named `0` through `9`.

```bash
#!/usr/bin/env bash

# posit-param: script to view command line parameters

echo "
\$0 = $0
\$1 = $1
\$2 = $2
\$3 = $3
\$4 = $4
\$5 = $5
\$6 = $6
\$7 = $7
\$8 = $8
\$9 = $9
"
```

Even when no arguments are provided, `$0` will always contain the first item appearing on the command line, which is the pathname of the program being executed.

```bash
$ posit-param a b c d
$0 = /home/me/bin/posit-param
$1 = a
$2 = b
$3 = c
$4 = d
$5 =
$6 =
$7 =
$8 =
$9 =
```

> You can actually access more than 9 parameters using parameter expansion.
> To specify a number greater than nine, surround the number in braces as in `${10}`, `${55}`, `${211}`, and so on.

### Determining the Number of Arguments

`$#`: The number of arguments on the command line (Not including the command itself).

```bash
#!/usr/bin/env bash

# posit-param: script to view command line parameters

echo "
Number of arguments: $#
\$0 = $0
\$1 = $1
\$2 = $2
\$3 = $3
\$4 = $4
\$5 = $5
\$6 = $6
\$7 = $7
\$8 = $8
\$9 = $9
"
```

### Getting Access to Many Arguments

The `shift` command causes all the parameters to “move down one” each time it is executed. In fact, by using `shift`, it is possible to get by with only one parameter (in addition to `$0`, which never changes).

```bash
#!/usr/bin/env bash

# post-param2: script to display all arguments

count=1

while [[ $# -gt 0 ]]; do
  echo "Arguments $count = $1"
  count=$((count + 1))
  shift
done
```

### Using Positional Parameters with Shell Functions

Just as positional parameters are used to pass arguments to shell scripts, they can also be used to pass arguments to shell functions.
It means we do not need to define named parameter in parentheses.

```bash
# Definition
greet_user() {
    echo "Hello, $1! You are looking $2 today."
}

# Execution
greet_user "Alice" "wonderful"
```

When you are inside a function, the script's original arguments are inaccessible via `$1`, `$2`, etc. The function's own arguments take over the stage.

```bash
#!/usr/bin/env bash

show_difference() {
    echo "Inside the function, \$1 is: $1" # This refers to the function's argument
}

echo "At the script level, \$1 is: $1" # This refers to the script's argument
show_difference "Function-Arg"
echo "Back at the script level, \$1 is still: $1"
```

## Handling Positional Parameters en Masse

Special Parameters

| Parameter | Description                                                                                                                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$*`      | Expands into the list of positional parameters, starting with 1. When surrounded by double quotes, it expands into a double- quoted string containing all of the positional parameters, each separated by the first character of the IFS shell variable |
| `$@`      | Expands into the list of positional parameters, starting with 1. When surrounded by double quotes, it expands each positional parameter into a separate word as if it was surrounded by double quotes.                                                  |

```bash
#!/usr/bin/env bash

# posit-params3: script to demonstrate $* and $@

print_params () {
  echo "\$1 = $1"
  echo "\$2 = $2"
  echo "\$3 = $3"
  echo "\$4 = $4"
}

pass_params () {
  echo -e "\n" '$* :'; print_params $*
  echo -e "\n" '"$*" :'; print_params "$*"
  echo -e "\n" '$@ :'; print_params $@
  echo -e "\n" '"$@" :'; print_params "$@"
}

pass_params "word" "words with spaces"

```

Even though the shell provides four different ways of getting the list of positional parameters, `"$@"` is by far the most useful for most situations because it preserves the integrity of each positional parameter.

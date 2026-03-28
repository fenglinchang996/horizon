# Arrays

## Creating an Array

Array variables are named just like other bash variables and are created automatically when they are accessed.

```bash
$ a[1]=foo
$ echo ${a[1]}
foo
```

When accessing array value, the use of braces in parameter expansion is required to prevent the shell from attempting pathname expansion on the name of the array element.

An array can also be created with the declare command.

```bash
$ declare -a a
```

Using the `-a` option, this example of `declare` creates the array `a`.

## Assigning Values to an Array

- Single values may be assigned using the following syntax:

  ```bash
  NAME[SUBSCRIPT]=VALUE
  ```

  Where `NAME` is the name of the array and `SUBSCRIPT` is an integer (or arithmetic expression) greater than or equal to zero.
  Note that the first element of an array is subscript zero, not one. `VALUE` is a string or integer assigned to the array element.

  > Note that in Zsh, `SUBSCRIPT` is start from 1 by default.

- Multiple values may be assigned using the following syntax:

  ```bash
  NAME=(VALUE1 VALUE2 ...)
  ```

  Where `NAME` is the name of the array and `VALUE` placeholders are values assigned sequentially to elements of the array, starting with element zero.

  For example:

  ```bash
  $ days=(Sun Mon Tue Wed Thu Fri Sat)
  ```

  You can also possible to assign values to a specific element by specifying a subscript for each value.

  ```bash
  $ days=([0]=Sun [1]=Mon [2]=Tue [3]=Wed [4]=Thu [5]=Fri [6]=Sat)
  ```

## Array Operations

### Outputting the Entire Contents of an Array

The subscripts `*` and `@` can be used to access every element in an array. As with positional parameter, the `@` notation is the more useful of the two.

```bash
$ animals=("a dog" "a cat" "a fish")
$ for i in ${animals[*]}; do echo $i; done
a
dog
a
cat
a
fish
$ for i in ${animals[@]}; do echo $i; done
a
dog
a
cat
a
fish
$ for i in "${animals[*]}"; do echo $i; done
a dog a cat a fish
$ for i in "${animals[@]}"; do echo $i; done
a dog
a cat
a fish
```

### Determining the Number of Array Elements

```bash
$ a[100]=foo
$ echo ${#a[@]}
1
$ echo ${#a[100]}
3
```

### Finding the Subscripts Used by an Array

The following syntax can be used to get subscripts of an array:

```bash
${!ARRAY[*]}
${!ARRAY[@]}
```

```bash
$ foo=([2]=a [4]=b [6]=c)
$ for i in "${foo[@]}"; do echo $i; done
a
b
c
$ for i in "${!foo[@]}"; do echo $i; done
2
4
6
```

### Assigning Array Elements with `read -a`

The `read` command can be used to read a line of input into an array. The `-a` option allows you to specify the name of the array to store the input.

```bash
$ declare -a foo
$ read -a foo <<< "0th 1st 2nd 3rd 4th"
$ for i in "${foo[@]}"; do echo "$i"; done
0th
1st
2nd
3rd
4th
```

This command reads a line of input and splits it into words, storing each word in an element of `my_array`.

### Adding Elements to the End of an Array

By using the `+=` assignment operator, we can automatically append values to the end of an array.

```bash
$ foo=(a b c)
$ echo ${foo[@]}
a b c
$ foo+=(d e f)
$ echo ${foo[@]}
a b c d e f
```

### Slicing an Array

We can slice array by this way:

```bash
$ arr=(0th 1st 2nd 3rd 4th)
$ echo "${arr[@]:2:3}"
2nd 3rd 4th
$ echo "${arr[@]: -2:2}"
3rd 4th
```

### Deleting an Array

To delete an array, use the `unset` command.

```bash
$ foo=(a b c d e f)
$ echo ${foo[@]}
a b c d e f
$ unset foo
$ echo ${foo[@]}

```

`unset` may also be used to delete single array elements.

```bash
$ foo=(a b c d e f)
$ echo ${foo[@]}
a b c d e f
$ unset foo[2]
$ echo ${foo[@]}
a b d e f
```

## Associative Arrays

Associative arrays use strings rather than integers as array indexes, thus creating key-value pairs much like a dictionary or hash table.

```bash
declare -A colors
colors["red"]="#ff0000"
colors["green"]="#00ff00"
colors["blue"]="#0000ff"
```

Associative arrays must be explicitly created with the `declare` command using the `-A` option.

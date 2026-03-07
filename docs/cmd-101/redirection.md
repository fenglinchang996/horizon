# Redirection

## I/O Redirection

- I: Input

- O: Output

With I/O redirection, we can redirect the input and output of commands to and from files, as well as connect multiple commands together into powerful command *pipelines*.

## Standard Input, Output, and Error

### Output

- The program’s results

- Status and error messages

 "Everything is a file" in Linux, those outputs are sent to the file called ***standard output*** (***stdout***) and ***standard error*** (***stderr***)

### Input

- Input from the facility (keyboard by default) —> these input are called ***standard input*** (***stdin***)

## Redirecting Standard Output (`>`, `>>`)

To redirect standard output to another file instead of the screen, we use the `>` redirection operator followed by the name of the file.

For example:

```bash
$ touch ls-output.txt
$ ls -l /usr/bin > ls-output.txt
```

When we redirect output with the `>` redirection operator, the destination file is always rewritten from the beginning. Note that if the file already exists, it will be overwritten with the new content by default, without any warning.

We can append redirected output to a file instead of overwriting the file from the

beginning with `>>` redirection operator, like so:

```bash
$ ls -l /usr/bin >> ls-output.txt
```

If the file does not already exist, it is created just as though the > operator had been used.

> If you set *noclobber* (i.e., `$ setopt noclobber` ) option, the shell will not allow I/O redirection to destroy an existing file, meaning that it prevent the `>` redirection operator from overwriting existing files. Additionally, it stops the `>>` operator from automatically creating a file when attempting to append data to a non-existent file.

> You can still use `>|` operator to forcefully overwrite a file, even if the `noclobber` option is set in the shell

## Redirecting Standard Error (`2>`)

A program can produce output on any of serveral numbered file streams. While we have referred to the first 3 of these file streams as standard input, output and error, the shell references them internally as file descriptors 0, 1 and 2, respectively. The shell provides a notation for redirecting files using the file descriptor number. Since standard error is the same as file descriptor number 2, we can redirect standard error with `2>` notation:

```bash
$ ls -l /bin/usr 2> ls-error.txt
```

### Redirecting standard output and standard error to one file

```bash
$ ls -l /bin/usr > ls-output.txt 2>&1
```

or

```bash
$ ls -l /bin/usr &> ls-output.txt
```

We can also append the standard output and standard error streams to a single file like so:

```bash
$ ls -l /bin/usr &>> ls-output.txt
```

```bash
$ ls -l /bin/usr >> ls-output.txt 2>&1
```

### Disposing of unwanted output

Sometimes we don’t want output from a command, we just want to throw it away. We can redirect output to a special file called `/dev/null`. The file is a system device often referred to as a bit bucket, which accepts input and does nothing with it.

```bash
$ ls -l /bin/usr 2> /dev/null
```

## Redirecting Standard Input (`<`)

Try this:

```bash
$ cat > lazy_dog.txt
```

If `cat` is not given any arguments, it reads from standard input and since standard input is, by default, attached to the keyboard, it's waiting for us to type something.

Type some content and rember to type `Ctrl-D` at the end to tell `cat` that it has reached end of file (EOF) on standard input.

Let’s try redirecting standard input via the `<` redirection operator:

```bash
$ cat < lazy_dog.txt
```

This shows that using a file as a source of standard input.

## Pipelines

Using the pipe operator `|` (vertical bar), the standard output of one command can be piped into the standard input of another.

```bash
command1｜command2
```

> The difference between `>` and `|`:
>
> Simply put, the **redirection** operator *connects a command with a file*, while the **pipeline** operator *connects the output of one command with the input of a second command*.

### Filters

Pipelines are often used to perform complex operations on data. It is possible to put several commands together into a pipeline. Frequently, the commands used this way are referred to as filters.

#### `sort`

```bash
$ ls /bin /usr/bin | sort | less
```

#### `uniq`: report or omit repeated lines

```bash
$ ls /bin /usr/bin | sort | uniq | less
```

```bash
$ ls /bin /usr/bin | sort | uniq -d | less
```

#### `wc`: print line, word, and byte counts

```bash
$ ls /bin /usr/bin | sort | uniq | wc -l
```

```bash
$ ls /bin /usr/bin | sort | uniq | wc -w
```

#### `grep`: print lines matching a pattern

```bash
$ ls /bin /usr/bin | sort | uniq | grep zip
```

#### `head` / `tail`: print first/last part of files

```bash
$ ls /usr/bin | head -n 5
```

```bash
$ ls /usr/bin | tail -n 5
```

#### `tee`: read from `stdin` and output to `stdout` and files

The `tee` program reads standard input and copies it to both standard output (allowing the data to continue down the pipeline) and to one or more files. This is useful for capturing a pipeline's contents at an intermediate stage of processing.

```bash
$ ls /usr/bin | tee ls.txt | grep zip
```
# Writing the First Script

## Script File Format

The Example：

```bash
#!/bin/bash

# This is our first script.

echo 'Hello World!'
```

The `#!` character sequence is, in fact, a special construct called a **shebang**. The shebang is used to tell the kernel the name of the interpreter that should be used to execute the script that follows. Every shell script should include this as its first line.

The second line is a comment. Everything from the # symbol onward on the line is ignored. One thing about comments in shell scripts is that they may also appear at the ends of lines, provided they are preceded with at least one whitespace character.

## Executable Permissions

To make our scripts executable, we have to change the permission of our script files.

```bash
$ chmod 755 SCRIPT_FILE
```

There are 2 common permission settings for scripts:

- `755`: for scripts that everyone can execute
- `700`: for scripts that only the owner can execute

Note that scripts must be readable(`r`) to be executed(`x`).

## Script File Location

For the script to run, we must precede the script name with an explicit path.

For example：

```bash
$ ./SCRIPT_FILE
```

What happened if we do this?

```bash
$ SCRIPT_FILE
```

The system searches a list of directories each time it needs to find an executable program, if no explicit path is specified. This is how the system knows to execute `/bin/ls` when we type ls at the command line. The `/bin` directory is one of the directories that the system automatically searches. The list of directories is held within an environment variable named `PATH`. The `PATH` variable contains a colon-separated list of directories to be searched. We can view the contents of `PATH`. If our script were located in any of the directories in the list, our problem would be solved.

Most Linux distributions configure the PATH variable to contain a bin directory in the user’s home directory to allow users to execute their own programs. If the PATH variable does not contain the directory, we can easily add it by including this line in our `.bashrc` or `.zshrc` file:

```bash
export PATH=~/bin:"$PATH"
```

After this change is made, it will take effect in each new terminal session. To apply the change to the current terminal session, we must have the shell re-read the `.bashrc` or `zshrc` file. This can be done by “sourcing“ it.

```bash
$ . .bashrc # bash
$ . .zshrc  # zsh
```

The dot (`.`) command is a synonym for the source command, a shell builtin that reads a specified file of shell commands and treats it like input from the keyboard.

> The `~/bin` directory is a good place to put scripts intended for personal use. If we write a script that everyone on a system is allowed to use, the traditional location is `/usr/local/bin`. Scripts intended for use by the system administrator are often located in `/usr/local/sbin`.

## More Formatting Tricks

- Long Option Names
- Indentation and Line-Continuation

# Exotica

## Group Commands and Subshells

bash allows commands to be grouped together using either a group command or a subshell.

- Group command syntax: `{ command1; command2; [command3; ...] }`. (Note: braces must be separated from commands by a space, and the last command must end with a semicolon or a newline.)
- Subshell syntax: `(command1; command2; [command3;...])`.

Main Usage and Differences: Both can be used to manage redirection and combine the results of several commands into a single stream for pipelines. The important difference is that a group command executes in the current shell, whereas a subshell executes in a child copy of the current shell. Therefore, a subshell cannot alter the parent shell's environment (e.g., variables or directories). In general, group commands are preferred unless a subshell is strictly required, because they are faster and use less memory.

For example:

```bash
ls -l > output.txt
echo "Listing of foo.txt" >> output.txt
cat foo.txt >> output.txt
```

We can use a group command for the above script:

```bash
{ ls -l; echo "Listing of foo.txt"; cat foo.txt; } > output.txt
```

or using a subshell

```bash
(ls -l; echo "Listing of foo.txt"; cat foo.txt) > output.txt
```

The most useful case for group commands or subshells is to combine the results of several commands into a single stream in a pipeline of commands.

```bash
{ ls -l; echo "Listing of foo.txt"; cat foo.txt; } | lpr
```

## Process Substitution

In shell scripting, pipelines (`A | B`) connect commands directly as streams, while many Unix tools are designed around file arguments. Process substitution is a shell expansion that bridges these two models by exposing command I/O through a file-like path (often under `/dev/fd/*` or via a FIFO).

- To produce standard output: `<(LIST)`.
- To intake standard input: `>(LIST)`.

Where `LIST` is a list of commands.

Process substitution is most useful when you need a command to behave like a file endpoint:

- `<(LIST)`: treat a command's output as an input file.
- `>(LIST)`: treat a command as an output file target.

When to use it:

- Best fit: a tool expects filenames, but your data is produced dynamically by commands.
- Best fit: you want side processing (for example with `tee`) without changing the main output flow.
- Also useful: avoid pipeline variable-scope surprises such as `echo foo | read x`.
- Usually unnecessary: plain linear transformations are clearer with regular pipes/redirection.

Example 1 (required to preserve variable):

```bash

# Without process substitution (x is often empty)
echo "foo" | read x
echo "$x"

# With process substitution (x is preserved)
read x < <(echo "foo")
echo "$x"
```

Example 2 (not required, but convenient):

```bash

# Without process substitution
ls dirA > /tmp/a.txt
ls dirB > /tmp/b.txt
diff /tmp/a.txt /tmp/b.txt

# With process substitution (no temp files)
diff <(ls dirA) <(ls dirB)
```

Example 3 (`>(...)` for side processing):

```bash
echo "log message" | tee >(wc -c)
```

This prints `log message` as normal, and in parallel sends the same bytes to `wc -c` for counting.

Example 4 (not needed here):

```bash

# Process substitution version
sort < <(printf "c\nb\na\n") | head -n 1

# Simpler and preferred
printf "c\nb\na\n" | sort | head -n 1
```

Rule of thumb:

- Prefer `|` for straightforward command-to-command flow.
- Use `<(...)` or `>(...)` when you need a file-shaped interface.
- Use `< <(...)` when reading into shell variables and you need those variables to remain in the current shell.

## Traps

When we design a large, complicated script, it is important to consider what happens if the user logs off or shuts down the computer while the script is running.
When such an event occurs, a signal will be sent to all affected processes.

Scripts can be designed to respond to signals (like user logoff or system shutdown) using a mechanism known as a trap to ensure orderly termination and clean up temporary files.

Syntax: `trap ARGUMENT SIGNAL [SIGNAL...]`.

- Where `ARGUMENT` is a string that will be read and treated as a command and
- `SIGNAL` is the specification of a signal that will trigger the execution of the interpreted command

Script Example 1 (trap-demo):

```bash

# !/bin/bash

# trap-demo: simple signal handling demo

trap "echo 'I am ignoring you.'" SIGINT SIGTERM

for i in {1..5}; do
  echo "Iteration $i of 5"
  sleep 5
done
```

(Description: If the user attempts to interrupt the script by pressing `Ctrl-c` (SIGINT) or sends a SIGTERM, it prints a message instead of stopping.)

Script Example 2 (trap-demo2):

```bash
# !/bin/bash

# trap-demo2: simple signal handling demo

exit_on_signal_SIGINT () {
  echo "Script interrupted." 2>&1
  exit 0
}

exit_on_signal_SIGTERM () {
  echo "Script terminated." 2>&1
  exit 0
}

trap exit_on_signal_SIGINT SIGINT
trap exit_on_signal_SIGTERM SIGTERM

for i in {1..5}; do
  echo "Iteration $i of 5"
  sleep 5
done

```

(Description: It specifies a shell function as the command to execute when specific signals are received, terminating the script cleanly.)

Besides the signals that are available to all programs, the `trap` builtin also supports several internal and bash-specific ones (Fake Signal). Of particular interest are `EXIT` and `ERR`.

- The `EXIT` trap is activated when a script terminates.
- The `ERR` trap activates Whenever a command (with certain exceptions) exits with a non-zero exit status.

Script Example 3 (trap-demo3):

```bash
# !/bin/bash

# trap-demo3 - demonstrate ERR and EXIT signal handling

trap "echo \"There is an error.\"" ERR
trap "echo \"The program has ended.\"" EXIT

echox "Running..."
read -r -p "Say something... " something
echo "$something"

```

(Description: Demonstrates the EXIT trap, which activates when a script terminates, and the ERR trap, which activates whenever a command exits with a non-zero status (like the intentionally misspelled echox command here).)

> Temporary Files:
>
> When scripts create temporary files, typically in the shared `/tmp` directory, it is critical to use nonpredictable filenames to avoid temp race attacks. Recommended approach: Use the `mktemp` program to safely name and create temporary files (e.g., `tempfile=$(mktemp /tmp/foobar.$$.XXXXXXXXXX)`). For scripts executed by regular users, creating a tmp directory within the user's home directory (`[[-d $HOME/tmp]] || mkdir $HOME/tmp`) is also a safe alternative.

## Asynchronous Execution

Scripts can behave in a multitasking fashion by launching child scripts in the background while the parent script continues to run.

The `wait` builtin command causes a parent script to pause until a specified child process finishes.

Parent Script (async-parent):

```bash

# !/bin/bash

# async-parent: Asynchronous execution demo (parent)

echo "Parent: starting..."
echo "Parent: launching child script..."
async-child &
pid=$!
echo "Parent: child (PID= $pid) launched."

echo "Parent: continuing..."
sleep 2

echo "Parent: pausing to wait for child to finish..."
wait "$pid"

echo "Parent: child is finished. Continuing..."
echo "Parent: parent is done. Exiting."
```

Child Script (async-child):

```bash
# !/bin/bash

# async-child: Asynchronous execution demo (child)

echo "Child: child is running..."
sleep 5
echo "Child: child is done. Exiting."
```

(Description: The parent script places the child script into the background using &, retrieves its PID using the $! parameter, and then pauses using wait "$pid" until the child process completes its execution.)

## Named Pipes

Named pipes create a connection between two processes forming a **first-in first-out (FIFO) buffer**, commonly used in client-server architectures.

- Creation: Use the `mkfifo NAMED_PIPE` command.
- Behavior: Process 1 inputs data (`PROCESS1 > NAMED_PIPE`), and the pipe remains blocked (hung) until Process 2 reads from it (`PROCESS2 < NAMED_PIPE`).

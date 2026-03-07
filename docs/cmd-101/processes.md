# Processes

## How a Process Works

When a system starts up, the kernel initiates a few of its own activities as processes and launches a program called **`init`**. `init`, in turn, runs a series of shell scripts (located in `/etc`) called _init scripts_, which start all the system services. Many of these services are implemented as **daemon programs**, program that just sit in the background and do their thing without having any user interface.

## Viewing Processes

### `ps`: Report a snapshot of current processes (process status)

```bash
$ ps
```

By default, `ps` just shows the processes associated with the current terminal session.

Adding `x` to show all of our processes regardless of what terminal (if any) they are controlled.

```bash
$ ps x
```

For listing more information, use `aux` option:

```bash
$ps aux
```

#### Fields

- PID: Process ID
- TTY: Short for _teletype_, referring to the _controlling terminal_ for the process
- TIME: The amount of CPU time consumed by the process
- STAT: Short for _state_, revealing the current status of the process:

  | **State** | **Meaning**                                                                                                                                                                                                                                                                                             |
  | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | R         | Running. This means the process is running or ready to run.                                                                                                                                                                                                                                             |
  | S         | Sleeping. The process is not running; rather, it is waiting for an event, such as a keystroke or network packet.                                                                                                                                                                                        |
  | D         | Uninterruptible sleep. The process is waiting for I/O such as a disk drive. （FLC: The similar state is represented as "U" on macOS.)                                                                                                                                                                   |
  | T         | Stopped. The process has been instructed to stop.                                                                                                                                                                                                                                                       |
  | Z         | A defunct or "zombie" process. This is a child process that has terminated but has not been cleaned up by its parent.                                                                                                                                                                                   |
  | <         | A high-priority process. It's possible to grant more importance to a process, giving it more time on the CPU. This property of a process is called _niceness_. A process with high priority is said to be less _nice_ because it's taking more of the CPU's time, which leaves less for everybody else. |
  | N         | A low-priority process. A process with low priority (a “nice” process) will get processor time only after other processes with higher priority have been serviced.                                                                                                                                      |

- USER: User ID. This is the owner of the process.
- %CPU: CPU usage in percent.
- %MEM: Memory usage in percent.
- VSZ: Virtual memory size
- RSS: Resident set size. This is the amount of physical memory (RAM) the process is using in kB.
- START: Time when the process started. For values over 24 hours, a date is used.

### `top`: Display process dynamically

`top` displays a continuously updating display of the system processes listed in order of process activity. There are 2 parts of the `top` display:

- A system summary
  - **load average**: This refers to the number of processes that are waiting to run, that is, the number of processes that are in a runnable state and are sharing the CPU. 3 values are shown , each for a different period of time: 60s, 5min, 15min
  - **CPU usage**:
    - XX%us
    - XX%sy
    - XX%id
  - **Mem**
  - **VM / Swap**
- A table of processes sorted by CPU activity

## Controlling Processes

### Interrupting a process

Press `CTRL-C` to interrupt a program.

### Putting a process in the background

To launch a program so that it is immediately placed in the background, we follow the command with an `&` character.

Use `jobs` command to list the jobs that have been launched from our terminal.

```bash
$ jobs
[1] Running    some-program &
```

The results show that we have one job, numbered 1; that it is running; and that the command was `some-program &`.

### Returning a process to the foreground

Use `fg` command to return a process to the foreground:

```bash
$ fg %1
```

The `fg` command followed by a `$` and the job number (called a _jobspec_) does the trick.

### Stopping (Pausing) a process

To stop a foreground process and place it in the background, press `CTRL-Z`.

We can also resume the program’s execution in the background with the `bg` command.

```bash
$ bg %1
```

## Signals

### Sending signals to processes with `kill`

```bash
$ kill -signal PID...
```

If no signal is specified on the command line, then the `TERM` signal is sent by default.

Common signals

| Number | Name    | Meaning                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1`    | `HUP`   | **Hangup**. This is a vestige of the good old days when terminals were attached to remote computers with phone lines and modems. The signal is used to indicate to programs that the controlling terminal has "hung up." The effect of this signal can be demonstrated by closing a terminal session. The foreground program running on the terminal will be sent the signal and will terminate.<br><br>This signal is also used by many daemon programs to cause a reinitialization. This means that when a daemon is sent this signal, it will restart and reread its configuration file. The Apache web server is an example of a daemon that uses the `HUP` signal in this way. |
| `2`    | `INT`   | **Interrupt**. This performs the same function as a `CTRL-C` sent from the terminal. It will usually terminate a program.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `9`    | `KILL`  | **Kill**. This signal is special. Whereas programs may choose to handle signals sent to them in different ways, including ignoring them altogether, the `kill` signal is never actually sent to the target program. Rather, the kernel immediately terminates the process. When a process is terminated in this manner, it is given no opportunity to "clean up" after itself or save its work. For this reason, the `KILL` signal should be used only as a last resort when other termination signals fail.                                                                                                                                                                        |
| `15`   | `TERM`  | **Terminate**. This is the default signal sent by the kill command. If a program is still "alive" enough to receive signals, it will terminate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `18`   | `CONT`  | **Continue**. This will restore a process after a `STOP` or `TSTP` signal. This signal is sent by the `bg` and `fg` commands.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `19`   | `STOP`  | **Stop**. This signal causes a process to pause without terminating. Like the `KILL` signal, it is not sent to the target process, and thus it cannot be ignored.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `20`   | `TSTP`  | **Terminal stop**. This is the signal sent by the terminal when `CTRL-Z` is pressed. Unlike the `STOP` signal, the `TSTP` signal is received by the program, but the program may choose to ignore it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `3`    | `QUIT`  | Quit.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `11`   | `SEGV`  | **Segmentation violation**. This signal is sent if a program makes illegal use of memory, that is, if it tried to write somewhere it was not allowed to write.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `28`   | `WINCH` | **Window change**. This is the signal sent by the system when a window changes size. Some programs, such as `top` and `less` will respond to this signal by redrawing themselves to fit the new window dimensions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

Processes, like files, have owners, and you must be the owner of a process (or the superuser) to send it signals with `kill`.

### Sending signals to multiple processes with `kill`

```bash
$ killall [ -u user ] [ -signal ] name...
```

## Shutting Down The System

4 commands to shutting down the system:

- `halt`
- `poweroff` (there is no such command on macOS, use `shutdown` instead)
- `reboot`
- `shutdown`:

  ```bash
  $ shutdown [ -h | -p | -r ] time
  ```

  `time` can be the word `now` (indicating an immediate shutdown) or a future time in one of 2 formats: `number` or `yymmddhhmm`.

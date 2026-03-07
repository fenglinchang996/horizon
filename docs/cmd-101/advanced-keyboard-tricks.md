# Advanced Keyboard Tricks

## Command Line Editing

Cursor movement commands

| **Key**  | **Action**                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------------- |
| `CTRL-A` | Move cursor to the beginning of the line.                                                             |
| `CTRL-E` | Move cursor to the end of the line.                                                                   |
| `CTRL-F` | Move cursor forward one character; Same as →.                                                         |
| `CTRL-B` | Move cursor backward one character; Same as ←.                                                        |
| `ALT-F`  | Move cursor forward one word.                                                                         |
| `ALT-B`  | Move cursor backward one word.                                                                        |
| `CTRL-L` | Clear the screen and move the cursor to the top-left corner. The `clear` command does the same thing. |

Text editing commands

| **Key**  | **Action**                                                                           |
| -------- | ------------------------------------------------------------------------------------ |
| `CTRL-D` | Delete the character at the cursor location.                                         |
| `ALT-L`  | Convert the characters from the cursor location to the end of the word to lowercase. |
| `ALT-U`  | Convert the characters from the cursor location to the end of the word to uppercase. |

Cut-and-paste commands

| **Key**         | **Action**                                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `CTRL-K`        | Kill text from the cursor location to the end of line.                                                                                        |
| `CTRL-U`        | Kill text from the cursor location to the beginning of the line.                                                                              |
| `ALT-D`         | Kill text from the cursor location to the end of the current word.                                                                            |
| `ALT-BACKSPACE` | Kill text from the cursor location to the beginning of the current word. If the cursor is at the beginning of a word, kill the previous word. |
| `CTRL-Y`        | Yank text from the kill-ring and insert it at the cursor location.                                                                            |

## Completion

Try pressing `TAB` after typing a command.

## Using History

### Command `history`

Try:

```bash
$ history | grep ls | less
```

History commands

| **Key**  | **Action**                                                                                                 |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| `CTRL-R` | Reverse incremental search. This searches incrementally from the current command line up the history list. |
| `CTRL-P` | Move to the previous history entry. This is the same action as the ↑.                                      |
| `CTRL-N` | Move to the next history entry. This is the same action as the ↓.                                          |

History expansion commands

| **Key** | **Action**                                                     |
| ------- | -------------------------------------------------------------- |
| !!      | Repeat the last command. It is probably easier to press the ↑. |

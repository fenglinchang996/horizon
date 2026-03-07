# Navigation

The fundamental commands required for moving within the Linux file system: `pwd`, `cd`, and `ls`.

## **File System Tree**

- **Hierarchical Directory Structure:** The Linux file system uses a hierarchical (tree-like) structure.
- **Root Directory (`/`):** The first directory in the file system.
- **Current Working Directory (CWD):** The directory where we are currently located.
- **Parent Directory:** The directory immediately above the current working directory.

When we first log in to our system (or start a terminal emulator session) our current working directory is set to our home directory. Each user account is given its own home directory and it is the only place a regular user is allowed to write files.

To display the current working directory, we use the `pwd` (print working directory) command.

```bash
$ pwd
/home/me
```

`PWD` vs. `CWD`

| Name    | Full Name                 | Level        | Meaning                                                                     | Example / Notes                                    |
| ------- | ------------------------- | ------------ | --------------------------------------------------------------------------- | -------------------------------------------------- |
| `pwd`   | Print Working Directory   | Command      | Prints the current working directory                                        | `pwd` → `/home/user/project`                       |
| **PWD** | Print Working Directory   | Shell Env    | The shell's current working directory (logical path, may preserve symlinks) | `$PWD` → `/link/project` if you `cd` via a symlink |
| **CWD** | Current Working Directory | OS / Process | The actual working directory used by the process (physical path)            | `os.getcwd()` → `/real/project`, resolves symlinks |

Changing the Current Working Directory

We can type command `cd` followed by the _pathname_ of the desired working directory.

## **Pathnames**

A pathname is the route taken along the file system branches to reach a target directory.

### **Absolute Pathnames**

- Absolute pathnames **always start from the root directory** (`/`) and follow the structure down to the desired directory or file.
- Example: `/usr/bin`.

### **Relative Pathnames**

- Relative pathnames **start from the current working directory**.
- They use special notations to represent relative positions in the file system tree:
  - `.` **(dot):** Refers to the **current working directory**.
  - `..` **(dot dot):** Refers to the working directory's **parent directory**.
- In almost all cases, we can omit the `./`. It is implied.

**Useful Shortcuts and Tilde Expansion**

| Shortcut                 | Result                                                                  |
| ------------------------ | ----------------------------------------------------------------------- |
| `cd` (without arguments) | Changes the working directory to the **current user's home directory**. |
| `cd -`                   | Changes the working directory to the **previous working directory**.    |
| `~`                      | Represents the **current user's home directory**.                       |
| `~username`              | Represents the **specified user's home directory**.                     |

**Important Facts About Filenames**

- **Case Sensitive:** Filenames and commands in Linux are **case sensitive**; thus, "File1" and "file1" refer to different files.
- **Hidden Files:** Files starting with a **period** (`.`) are considered hidden. The `ls` command does not list them by default.
- **File Extensions:** Linux has no inherent concept of a "file extension" like some other operating systems, though many applications programs do use them.
- **Punctuation and Spaces:** It is highly recommended to **not embed spaces in filenames**. If spaces are required between words, use the underscore (`_`) character instead. Generally, limit punctuation characters in filenames to period (`.`), dash (`-`), and underscore (`_`).

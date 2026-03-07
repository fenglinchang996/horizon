# Permissions

Linux is a **multiuser system**. This means that more than one person can be using the computer at the same time.

## Users, Groups and Others

### Use `id` Display user identity

```bash
$ id
```

### Information files of user accounts and groups

`/etc/passwd` : User accounts’ info

`/etc/group` : Groups’ info

Note:

- All Linux files belong to an owner and a group.
- While many Unix-like systems assign regular users to a common group such as _users_, modern Linux practice is to create a unique, single-member group with the same name as the user. This makes certain types of permission assignment easier.

## Reading, Writing and Executing

### File attributes

```bash
$ ls -l file.txt
-rw-rw-r-- 1 me me 0 2024-11-11 11:11 file.txt
```

File types: The first character of a file attributes

| **Attribute** | **File type**   |
| ------------- | --------------- |
| \-            | A regular file. |
| d             | A directory.    |
| l             | A symbolic link |

### Permission attributes

| Owner | Group | World |
| ----- | ----- | ----- |
| rwx   | rwx   | rwx   |

Permission attributes

| **Attribute** | **Files**                                                                                                                                                                                        | **Directories**                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| r             | Allows a file to be opened and read.                                                                                                                                                             | Allows a directory’s contents to be listed if the execute attribute is also set.                          |
| w             | Allows a file to be written to or truncated; however, this attribute does not allow files to be renamed or deleted. The ability to delete or rename files is determined by directory attributes. | Allows files within a directory to be created, deleted, and renamed if the execute attribute is also set. |
| x             | Allows a file to be treated as a program and executed. Program files written in scripting languages must also be set as readable to be executed.                                                 | Allows a directory to be entered.                                                                         |

![Permission attributes](https://assets.digitalocean.com/articles/linux_basics/mode.png)

source: [An Introduction to Linux Permissions](https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-permissions)

Some examples:

- `-rwx----—-`
- `drwxrwx—-—`
- `-------rwx`

### `chmod` : Change file mode

- Only the file’s owner or the superuser can change the mode of a file or directory.
- Two distinct ways of specifying mode changes:
  - Octal number representation

    | Octal | Binary  | File Mode |
    | ----- | ------- | --------- |
    | **0** | **000** | **`---`** |
    | 1     | 001     | `--x`     |
    | 2     | 010     | `-w-`     |
    | 3     | 011     | `-wx`     |
    | **4** | **100** | **`r--`** |
    | **5** | **101** | **`r-x`** |
    | **6** | **110** | **`rw-`** |
    | **7** | **111** | **`rwx`** |

    ![Permissions](https://www.yuval.guide/linux/permissions.jpg)

    source: [File Permissions](https://www.yuval.guide/linux/files/permissions/)

    Command: **`chmod MODE FILE`**

    ```bash
    $ touch foo.txt
    $ ls -l foo.txt
    -rw-rw-r-- 1 me me 0 2016-03-06 14:52 foo.txt
    $ chmod 600 foo.txt
    $ ls -l foo.txt
    -rw------- 1 me me 0 2016-03-06 14:52 foo.txt
    ```

  - Symbolic representation

    It is divided into 3 parts:
    - Who the change will affect
    - Which operation will be performed
    - What permission will be set

    Who - symbolic notation

    | **Symbol** | **Meaning**                                                   |
    | ---------- | ------------------------------------------------------------- |
    | u          | Short for “user” but means the file owner or directory owner. |
    | g          | Group owner.                                                  |
    | o          | Short for “others” but means world.                           |
    | a          | Short for “all”. This is a combination of u, g, and o.        |

    Which operation:
    - `+` : A permission is to be added
    - `-` : A permission is to be taken away
    - `=` : Only the specified permissions are to be applied and that all others are to be removed

    What permission: `r` , `w` , `x`

    Some examples:
    - `chmod u+x foo.txt`
    - `chmod +x foo.txt`
    - `chmod o-rw foo.txt`
    - `chmod go=rw foo.txt`
    - `chmod u+x, go=rx foo.txt`

## Changing Identities

### `su`: Run a shell with substitute user and group ids

```bash
$ su [-[l]] [user]
```

If the `-l` option is included, the resulting shell session is a login shell for the specified user. If the user is not specified, the superuser is assumed.

### `sudo`: Execute a command as another user

```bash
$ sudo [-u user] command
```

- The administrator can configure `sudo` to allow an ordinary user to execute commands as a different user (usually superuser) in a controlled way.
- Authenticating using `sudo` requires the user’s own password

To see what privileges are granted by `sudo` for the invoking user, use the `-l` option to list them.

```bash
$ sudo -l
```

### `chown`: Change File Owner and Group

```bash
$ chown [owner][:[group]] file...
```

`chown` argument examples

| **Argument** | **Results**                                                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| bob          | Changes the ownership of the file from its current owner to user `bob`.                                                                   |
| bob:users    | Changes the ownership of the file from its current owner to user `bob` and changes the file group owner to group `users`.                 |
| :admins      | Changes the group owner to the group `admins`. The file owner is unchanged.                                                               |
| bob:         | Changes the ownership of the file from its current owner to user `bob` and changes the file group owner to the login group of user `bob`. |

> **Login group**
>
> In Linux and other Unix-like operating systems, a "login group" refers to a group that is automatically created when a user account is created, typically using the same name as the user. This approach is commonly part of the "User Private Groups" (UPG) strategy, which modern Linux distributions often employ to simplify and enhance file permission management.

## Changing Your Password

```bash
$ passwd [user]
```

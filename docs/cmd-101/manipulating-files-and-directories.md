# Manipulating Files and Directories

- `cp`: Copy files and directories
- `mv`: Move/rename files and directories
- `mkdir`: Create directories
- `rm`: Remove files and directories

## Wildcards (glob)

**Wildcards**: Special characters that help us rapidly specify groups of filenames.

| **Wildcard**    | **Meaning**                                                          |
| --------------- | -------------------------------------------------------------------- |
| `*`             | Matches any characters                                               |
| `?`             | Matches any single characters                                        |
| `[characters]`  | Matches any character that is a member of the set *characters*       |
| `[!characters]` | Matches any characters that is not a member  of the set `characters` |
| `[[:class:]]`   | Matches any characters that is a member of the specified class       |

| **Character Class** | **Meaning**                        |
| ------------------- | ---------------------------------- |
| `[:alnum:]`         | Matches any alphanumeric character |
| `[:alpha:]`         | Matches any alphabetic character   |
| `[:digit:]`         | Matches any numeral                |
| `[:lower:]`         | Matches any lowercase letter       |
| `[:upper:]`         | Matches any uppercase letter       |

Some examples:

- `*`
- `g*`
- `b*.txt`
- `Data???`
- `[abc]*`
- `BACKUP.[0-9][0-9][0-9]` (same as `BACKUP.[[:digit:]][[:digit:]][[:digit:]]`)
- `[[:upper:]]*`
- `[![:digit:]]*`
- `*[[:lower:]123]`

## `mkdir` - Create Directories

```bash
$ mkdir [OPTION] DIRECTORY...
```

## `cp` - Copy Files and Directories

```bash
$ cp item1 item2
```

or

```bash
$ cp item... directory
```

### `cp` options

| Option | Long Option             | Meaning                                                                                |
| ------ | ----------------------- | -------------------------------------------------------------------------------------- |
| `-a`   | `--archive`             | Copy files and directories with their attributes, including ownership and permissions. |
| `-i`   | `--interactive`         | Prompt before overwriting an existing file.                                            |
| `-r`   | `--recursive`           | Recursively copy directories and their contents.                                       |
| `-u`   | `--update` (Linux only) | Copy only files that are missing in destination or newer than destination files.       |
| `-v`   | `--verbose`             | Display informative messages during copy.                                              |

### `cp` examples

- `cp file1 file2` —> If `file2` exists, it is overwritten with the contents of `file1`. If `file2` does not exist, it is created.
- `cp -i file1 file2` —> if `file2` exists, the user is prompted before it is overwritten.
- `cp file1 dir2` —> If directory `dir2` does not exist, `file1` will be copied as a new file named `dir2`. If directory `dir2` does exist, then `file1` will be copied into `dir2`.
- `cp file1 file2 dir1` or `cp file1 file2 dir1/` —> The `dir1` must already exist
- `cp dir1/* dir2` —> The `dir2` must already exist
- `cp dir1 dir2` —> Does not work without `-r`.
- `cp -r dir1 dir2`: If directory `dir2` does not exist, it is created and, after the copy, will contain the same contents as directory `dir1`. If directory `dir2` does exist, then directory `dir1` (and its contents) will be copied into `dir2`.

## `mv` - Move or Rename Files and Directories

```bash
$ mv ITEM_1 ITEM_2
```

or

```bash
$ mv ITEM... DIRECTORY
```

### `mv` options

| Option | Long Option             | Meaning                                                                          |
| ------ | ----------------------- | -------------------------------------------------------------------------------- |
| `-i`   | `--interactive`         | Prompt before overwriting an existing file.                                      |
| `-u`   | `--update` (Linux only) | Move only files that are missing in destination or newer than destination files. |
| `-v`   | `--verbose`             | Display informative messages during move.                                        |

### `mv` examples

- `mv file1 file2` —> if `file2` exists, it is overwritten with the contents of `file1`. If `file2` does not exist, it is created. In either case, `file1` ceases to exist.
- `mv -i file1 file2` —> if `file2` exists, the user is prompted before it is overwritten.
- `mv file1 dir2` —> If directory `dir2` does not exist, `file1` will be moved and renamed as a new file `dir2`. If directory `dir2` does exist, then `file1` will be moved into `dir2`.
- `mv file1 file2 dir1` or `mv file1 file2 dir1/` —> The `dir1` must already exist
- `mv dir1/* dir2` —> The `dir2` must already exist
- `mv dir1 dir2` —> If directory `dir2` does not exist, create directory `dir2` and move the contents of directory `dir1` into `dir2` and delete directory `dir1`. If directory `dir2` does exist, move directory `dir1` (and its contents) into directory dir2.

## `rm` - Remove Files and Directories

```bash
$ rm ITEM...
```

### `rm` options

| Option | Long Option     | Meaning                                                                                                                                                                 |
| ------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-i`   | `--interactive` | Before deleting an existing file, prompt the user for confirmation. If this option is not specified, `rm` will silently delete files.                                   |
| `-r`   | `--recursive`   | Recursively delete directories. This means that if a directory being deleted has subdirectories, delete them too. To delete a directory, this option must be specified. |
| `-f`   | `--force`       | Ignore nonexistent files and do not prompt. This overrides the `--interactive` option.                                                                                  |
| `-v`   | `--verbose`     | Display informative messages as the deletion is performed.                                                                                                              |

### `rm` examples

- `rm file1`
- `rm -i file1`
- `rm -r dir1`
- `rm -rf file1 dir1`: if either file1 or dir1 do not exist, `rm` will continue silently.

> Unix-like operating systems such as Linux do not have an undelete command. Once you delete something with `rm`, it's gone. Linux assumes you're smart and you know what you're doing.

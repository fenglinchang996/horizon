# Package Management

Package management is a method of installing and maintaining software on the system.

❓ Why we need package management? 👉 The software always changing.

In the early days, when one had to download and compile source code to install software. Package managers are designed to eliminate the need for manual installs and updates. It automates _dependency handling_, ensures _version consistency_, simplifies _installation_ and _updates_, enhances _security_, and supports _reproducibility_ in a constantly evolving software environment.

The most important determinant of linux distribution quality is the packaging system and the vitality of the distribution's support community.

> **[Linux Distributions](https://en.wikipedia.org/wiki/Linux_distribution)**
>
> A **Linux distribution** (often abbreviated as **distro**) is an operating system that includes the Linux kernel for its kernel functionality. A Linux distro typically bundles not just the kernel but also essential tools like package managers, init systems, GNU utilities, network and getty programs, and often desktop and multimedia components such as display and sound servers to offer a complete operating system experience.

## Packaging Systems

### Linux

- Debian style (**.deb**): Debian, Ubuntu, Linux Mint, Raspbian
- Red Hat style (**.rpm**): Fedora, CentOS, Red Hat Enterprise Linux, OpenSUSE

### Mac

- [Homebrew](https://app.heptabase.com/c39b5154-df65-4bb5-812c-2ac6860bfda2/card/3918e956-4364-4f2a-af3d-b91fee693c7f#ab2c5ba3-2349-4aac-b266-61a561bbb43f)
- MacPorts

## How a Package System Works (Linux)

### Package Files

A package file is a compressed collection of files that comprise the software package.

It might contains:

- Numerous program
- Data files that support the programs
- Metadata about the package (such as a text description of the package and its contents)
- Pre- and post-installation scripts that perform configuration tasks before and after the package installation.

The package maintainer gets the software in source code form from the upstream provider (the author of the program), compiles it, and creates the package metadata and any necessary installation scripts. Often, the package maintainer will apply modifications to the original source code to improve the program's integration with the other parts of the Linux distribution.

### Repositories

Most packages today are created by the distribution vendors and interested third parties. Packages are made available to the users of a distribution in central repositories that may contain many thousands of packages, each specially built and maintained for the distribution. Some distributions may also have independent third-party repositories to provide legally restricted software, and users must manually configure these repositories.

### Dependencies

Programs are seldom “standalone”; rather they rely on the presence of other software components to get their work done. Modern package management systems all provide some method of **dependency resolution** to ensure that when a package is installed, all of its dependencies are installed, too.

### High and Low-level package tools

- Low level tools: handle tasks such as installing and removing package files
- High level tools: perform metadata searching and dependency resolution

| Distributions | Low-Level Tools | High-Level Tools             |
| ------------- | --------------- | ---------------------------- |
| Debian style  | `dpkg`          | `apt`, `apt-get`, `aptitude` |
| Red Hat style | `rpm`           | `yum`, `dnf`                 |

> APT: **A**dvance **P**ackage **T**ool

## Common Package Management Tasks

### Finding a package in a repository

| Package Tool | Commands                    |
| ------------ | --------------------------- |
| Homebrew     | `brew search SEARCH_STRING` |
| APT          | `apt search SEARCH_STRING`  |

### Installing a package from a repository

| Package Tool | Commands                    |
| ------------ | --------------------------- |
| Homebrew     | `brew install PACKAGE_NAME` |
| APT          | `apt install PACKAGE_NAME`  |

> - To run the command, root permission (`sudo`) might required.
> - Running `apt update` (refreshes the local package index) before other commands ensures that you have the most accurate and up-to-date information about available packages, which helps in smooth and secure package installation or upgrade.

### Installing a package from a package file

| Package Tool | Commands               |
| ------------ | ---------------------- |
| dpkg         | `dpkg -i PACKAGE_FILE` |

### Removing a package

| Package Tool | Commands                         |
| ------------ | -------------------------------- |
| Homebrew     | `brew uninstall PACKAGE_NAME...` |
| APT          | `apt remove PACKAGE_NAME...`     |

### Updating packages from a repository

| Package Tool | Commands                         |
| ------------ | -------------------------------- |
| Homebrew     | `brew upgrade [PACKAGE_NAME...]` |
| APT          | `apt upgrade [PACKAGE_NAME...]`  |

### Updating packages from a package file

| Package Tool | Commands               |
| ------------ | ---------------------- |
| dpkg         | `dpkg -i PACKAGE_FILE` |

### Listing installed packages

| Package Tool | Commands    |
| ------------ | ----------- |
| Homebrew     | `brew list` |
| APT          | `apt list`  |

### Determining whether a package is installed

| Package Tool | Commands                           |
| ------------ | ---------------------------------- |
| Homebrew     | `brew list PACKAGE_NAME`           |
| APT          | `apt list —installed PACKAGE_NAME` |

### Displaying information about a package

| Package Tool | Commands                 |
| ------------ | ------------------------ |
| Homebrew     | `brew info PACKAGE_NAME` |
| APT          | `apt show PACKAGE_NAME`  |

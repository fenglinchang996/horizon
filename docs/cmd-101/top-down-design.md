# Top-Down Design

## Shell Functions

Two syntactic forms:

- Formal form:

   ```bash
   function name {
     commands
     return
   }
   ```

- Simpler form:

   ```bash
   name () {
     commands
     return
   }
   ```

Where `name` is the name of the function and `commands` is a series of commands contained within the function. Both forms are equivalent and may be used interchangeably. Note that for function calls to be recognized as shell functions and not interpreted as the names of external programs, shell function definitions must appear in the script *before* they are called.

## Local Variables

Inside shell functions, it is often disirable to have *local variables*. Local variables are only accessible within the shell function in which they are defined and cease to exist once the shell function terminates.

```bash
#!/bin/bash

# local-vars: script to demonstrate local variables

foo=0 # global variable foo

funct_1 () {
  local foo # variable foo local to funct_1

  foo=1
  echo "funct_1: foo = $foo"
}

funct_2 () {
  local foo # variable foo local to funct_2

  foo=2
  echo "funct_2: foo = $foo"
}

echo "global: foo = $foo"
funct_1
echo "global: foo = $foo"
funct_2
echo "global: foo = $foo"
```

Local variables are defined by preceding the variable name with the word `local`.
# Logic and Algorithms

## Core Concepts

1. What is recursion?

   ::: details Show answer

   Recursion is a technique where a function calls itself to solve a problem by reducing it into smaller subproblems until it reaches a base case.

   :::

## Randomization and Number Sequences

1. Implement a function that returns 6 unique random numbers from `1` to `num`.

   ```js
   function random6(num) {
     // Implement here
   }

   console.log(random6(56)); // Example: [2, 32, 1, 42, 56, 8]
   ```

   ::: details Show answer

   Method 1: Rejection sampling.

   ```js
   function random6(num) {
     if (num < 6) throw new Error('num must be >= 6');

     const arr = [];
     while (arr.length < 6) {
       const value = Math.floor(Math.random() * num) + 1;
       if (!arr.includes(value)) {
         arr.push(value);
       }
     }
     return arr;
   }
   ```

   Method 2: Partial Fisher-Yates shuffle.

   ```js
   function random6(num) {
     if (num < 6) throw new Error('num must be >= 6');

     const arr = Array(num);
     for (let i = 0; i < num; i++) {
       arr[i] = i + 1;
     }

     for (let i = 0; i < 6; i++) {
       const pickIndex = num - 1 - i;
       const randomIndex = Math.floor(Math.random() * (pickIndex + 1));
       [arr[randomIndex], arr[pickIndex]] = [arr[pickIndex], arr[randomIndex]];
     }

     return arr.slice(num - 6);
   }
   ```

   :::

2. Implement a function that returns the Fibonacci number at index `i`.

   Hint: Fibonacci sequence starts as `0, 1, 1, 2, 3, 5, 8...`

   ```js
   function getFibonacciNum(i) {
     // Implement here
   }

   console.log(getFibonacciNum(0)); // 0
   console.log(getFibonacciNum(1)); // 1
   console.log(getFibonacciNum(2)); // 1
   console.log(getFibonacciNum(5)); // 5
   console.log(getFibonacciNum(16)); // 987
   ```

   ::: details Show answer

   Method 1: Recursive.

   ```js
   function getFibonacciNum(i) {
     if (i === 0) return 0;
     if (i === 1) return 1;
     return getFibonacciNum(i - 1) + getFibonacciNum(i - 2);
   }
   ```

   Method 2: Iterative (recommended for performance).

   ```js
   function getFibonacciNum(i) {
     if (i === 0) return 0;
     if (i === 1) return 1;

     let a = 0;
     let b = 1;

     for (let step = 2; step <= i; step++) {
       const next = a + b;
       a = b;
       b = next;
     }

     return b;
   }
   ```

   :::

## Tree and Data Transformation

1. Given a tree structure, flatten it into a list.

   ```js
   const departmentTree = [
     {
       id: 1,
       name: 'Dept 1',
       pid: null,
       children: [
         {
           id: 2,
           name: 'Dept 2',
           pid: 1,
           children: [],
         },
         {
           id: 3,
           name: 'Dept 3',
           pid: 1,
           children: [
             {
               id: 4,
               name: 'Dept 4',
               pid: 3,
               children: [
                 {
                   id: 5,
                   name: 'Dept 5',
                   pid: 4,
                   children: [],
                 },
               ],
             },
           ],
         },
       ],
     },
     {
       id: 6,
       name: 'Dept 6',
       pid: null,
       children: [],
     },
   ];

   function flatDepartmentTree(tree) {
     // Implement here
   }

   console.log(flatDepartmentTree(departmentTree).sort((a, b) => a.id - b.id));
   // [
   //   { id: 1, name: 'Dept 1', pid: null },
   //   { id: 2, name: 'Dept 2', pid: 1 },
   //   { id: 3, name: 'Dept 3', pid: 1 },
   //   { id: 4, name: 'Dept 4', pid: 3 },
   //   { id: 5, name: 'Dept 5', pid: 4 },
   //   { id: 6, name: 'Dept 6', pid: null },
   // ]
   ```

   ::: details Show answer

   Method 1: DFS with mutable result list.

   ```js
   function flatDepartmentTree(tree) {
     const departmentList = [];

     function walk(departments) {
       for (const { id, name, pid, children } of departments) {
         departmentList.push({ id, name, pid });
         walk(children);
       }
     }

     walk(tree);
     return departmentList;
   }
   ```

   Method 2: Recursive `reduce`.

   ```js
   function flatDepartmentTree(tree) {
     function walk(departments) {
       return departments.reduce((list, { id, name, pid, children }) => {
         return [...list, { id, name, pid }, ...walk(children)];
       }, []);
     }

     return walk(tree);
   }
   ```

   :::

# JavaScript Arrays

## Array Operations

1. Complete the following tasks.

   ```js
   const numbers = [22, 0, 5, 4, 13, 29, 1, 3];

   // Filter out values larger than 5
   // result: filteredNumbers = [0, 5, 4, 1, 3]

   // Double each value
   // result: doubleNumbers = [44, 0, 10, 8, 26, 58, 2, 6]

   // Complete these two tasks with array "reduce" method
   const reduceFilteredNumbers = [];
   const reduceDoubleNumbers = [];
   ```

   ::: details Show answer

   ```js
   const numbers = [22, 0, 5, 4, 13, 29, 1, 3];

   // Filter out values larger than 5
   const filteredNumbers = numbers.filter((n) => n <= 5);

   // Double each value
   const doubleNumbers = numbers.map((n) => n * 2);

   // Complete the same tasks with reduce
   const reduceFilteredNumbers = numbers.reduce((arr, n) => (n <= 5 ? [...arr, n] : arr), []);

   const reduceDoubleNumbers = numbers.reduce((arr, n) => [...arr, n * 2], []);
   ```

   :::

2. Implement an array flattening function.

   ```js
   const uglyArrangedNumbers = [1, [3, 4, 9], [[37, 9, [3, 10, 13]], 17, 2]];

   function flat(array, depth) {
     // Implement here
   }

   console.log(flat(uglyArrangedNumbers, 2));
   // Output: [1, 3, 4, 9, 37, 9, [3, 10, 13], 17, 2]

   console.log(flat(uglyArrangedNumbers, Infinity));
   // Output: [1, 3, 4, 9, 37, 9, 3, 10, 13, 17, 2]

   console.log(flat(uglyArrangedNumbers));
   // Output: [1, 3, 4, 9, [37, 9, [3, 10, 13]], 17, 2]
   ```

   ::: details Show answer

   ```js
   function flat(array, depth = 1, currentDepth = 0) {
     if (currentDepth < depth) {
       return array.reduce(
         (flattenArray, item) =>
           Array.isArray(item)
             ? [...flattenArray, ...flat(item, depth, currentDepth + 1)]
             : [...flattenArray, item],
         []
       );
     }

     return array;
   }
   ```

   :::

3. Try implementing array deduplication.

   ```js
   const originalArr = [9, 1, 5, 5, 3, 4, 2, 4, 8, 1, 9];

   function deDuplicate(array) {
     // Implement here
   }

   const resultArray = deDuplicate(originalArr);
   console.log(resultArray); // [9, 1, 5, 3, 4, 2, 8]
   ```

   ::: details Show answer

   ```js
   function deDuplicate(array) {
     return [...new Set(array)];
   }
   ```

   ```js
   function deDuplicate(array) {
     const deDuplicateMap = new Map();

     array.forEach((item) => {
       deDuplicateMap.set(item, true);
     });

     return [...deDuplicateMap.keys()];
   }
   ```

   :::

## Iteration Patterns

1. What is the difference between `Array.prototype.forEach` and a regular `for` loop?

   ::: details Show answer
   - `forEach` does not support `break` or `continue`.
   - `for` gives fine-grained control over index and loop termination conditions.
   - `forEach` cannot be used directly on array-like objects without conversion or method borrowing.
   - A common `async/await` pitfall: `await` inside a `forEach` callback does not make the whole loop run sequentially.
   - `forEach` always returns `undefined`; if you need a transformed array, use `map` (or use `for` to push manually).
   - `forEach` is usually cleaner for simple side effects; `for` is usually better when you need early exit, retries, or complex flow control.
   - For sparse arrays, `forEach` skips empty slots, while `for` can still iterate by index and handle holes explicitly.
   - `forEach` supports a `thisArg` as its second parameter; `for` does not have this pattern.
   - In performance-critical hot loops, `for` may be faster, but readability and correctness should come first.

   :::

## Common Pitfalls

1. What issue can this code cause?

   ```js
   const arr = [1, 2, 3, 4, 5];

   for (const i of arr) {
     console.log(i);
     arr.push(i);
   }
   ```

   ::: details Show answer

   It causes an infinite loop because the loop keeps pushing new elements while iterating, so the array length keeps increasing.

   :::

2. What issue can this code cause?

   ```js
   const arr = [1, 7, 4, 6, 28, 39, 22, 11, 17, 10, 24];

   for (let i = 0; i < arr.length; i++) {
     console.log(arr[i]);
     if (arr[i] % 2 === 0) arr.splice(i, 1);
   }

   console.log(arr);
   ```

   ::: details Show answer

   Some even numbers will not be removed. After `splice(i, 1)`, later elements shift left, but `i` still increments, which skips elements.

   :::

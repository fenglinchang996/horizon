# JavaScript Grammar

## Expressions and Operators

1. What is the difference between a statement and an expression? Give examples.

   ::: details Show answer

   ```js
   // Statement
   let x = 10;

   // Expression
   2 + 3;
   ```

   - A **statement** performs an action and does not have to produce a usable value.
   - An **expression** evaluates to a value, so it can be assigned, passed as an argument, or used in another expression.

   :::

2. What are an operator and operands? In `2 + 1`, which is which?

   ::: details Show answer
   - Operator: `+`
   - Operands: `2` and `1`

   :::

3. What is the output of the following code?

   ```js
   let a = 10;
   console.log(a++);
   console.log(++a);
   ```

   ::: details Show answer

   ```text
   10
   12
   ```

   `a++` returns the current value first, then increments. `++a` increments first, then returns the new value.

   :::

4. What is the output?

   ```js
   let a = 9;
   console.log(++a * a++);
   ```

   ::: details Show answer

   `100`

   :::

5. What is the output?

   ```js
   console.log((a = 'test'));
   ```

   ::: details Show answer

   `test`

   Because assignment itself is an expression and returns the assigned value.

   :::

6. What is printed by this code?

   ```js
   console.log('hello' || 'world');
   console.log('foo' && 'bar');

   function myfunc() {
     console.log('myfunc run');
   }

   function doSomething() {
     console.log('doSomething run');
   }

   const a = true;
   if (a && myfunc()) {
     doSomething();
   }
   ```

   ::: details Show answer

   ```text
   hello
   bar
   myfunc run
   ```

   `doSomething run` is not printed because `myfunc()` returns `undefined` (falsy), so the `if` block does not execute.

   :::

7. What is the difference between `==` and `===`?

   ::: details Show answer
   - `==` compares values after type coercion.
   - `===` compares both type and value without type coercion.

   :::

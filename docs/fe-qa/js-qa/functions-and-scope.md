# JavaScript Functions and Scope

## Functions and Callbacks

1. What is a callback function?

   ::: details Show answer

   A callback function is a function passed as an argument to another function, then invoked later (synchronously or asynchronously).

   :::

2. What is a function expression? Give an example.

   ```js
   const add = function (a, b) {
     return a + b;
   };
   ```

   ::: details Show answer

   A function expression is a function used as a value, usually assigned to a variable.

   :::

3. What is a higher-order function?

   ::: details Show answer

   A higher-order function is a function that either:
   - takes one or more functions as arguments, or
   - returns a function.

   :::

4. What does this code print?

   ```js
   let text = 'hey!';

   console.log(1);

   function useless(ninjaCallback) {
     console.log(2);
     return ninjaCallback();
   }

   function getText() {
     console.log(3);
     return text;
   }

   console.log(4);

   if (useless(getText) === text) {
     console.log(5 + text);
   }

   console.log(6);
   ```

   ::: details Show answer

   ```text
   1
   4
   2
   3
   5hey!
   6
   ```

   :::

5. What does this code print?

   ```js
   const a = (param) => param();
   const b = (param) => param;
   const c = () => 'foo';

   console.log(a(c));
   console.log(b(c));
   ```

   ::: details Show answer

   ```text
   foo
   () => 'foo'
   ```

   :::

## Scope and Hoisting

1. What is scope?

   ::: details Show answer

   Scope is the region where variables/functions are accessible.
   - Global scope: available everywhere.
   - Function scope: created by functions (`var` is function-scoped).
   - Block scope: created by `{}` blocks (`let`/`const` are block-scoped).

   :::

2. What is the result of this code, and why?

   ```js
   function func() {
     const foo = (bar = 123);
     console.log('foo inside func:', foo);
     console.log('bar inside func:', bar);
   }

   func();

   console.log('bar outside func:', bar);
   console.log('foo outside func:', foo);
   ```

   ::: details Show answer
   - Inside `func`, both `foo` and `bar` are accessible.
   - Outside `func`, `bar` is accessible, but `foo` throws `ReferenceError`.
   - In non-strict mode, `bar = 123` can create an implicit global variable.
   - `foo` is block-scoped (`const`) inside `func` only.

   :::

3. What is the scope chain?

   ::: details Show answer

   When resolving a variable, JavaScript starts from the current scope and walks outward to parent scopes until it finds the variable or reaches global scope.

   :::

4. What does this closure example print?

   ```js
   function outer() {
     let a = 0;

     function inner() {
       a += 1;
       console.log(a);
     }

     return inner;
   }

   const inner = outer();
   inner();
   inner();
   inner();
   ```

   ::: details Show answer

   ```text
   1
   2
   3
   ```

   :::

5. Can this code run normally?

   ```js
   if (function fn() {}) {
     console.log('It works!');
   }
   ```

   ::: details Show answer

   Yes. A function expression is a truthy value, so it logs:

   ```text
   It works!
   ```

   :::

6. What happens after running this code?

   ```js
   function fnA() {
     a = 'test';
   }
   fnA();
   console.log(a);

   function fnB() {
     var b = 'test';
   }
   fnB();
   console.log(b);

   function fnC() {
     let c = 'test';
   }
   fnC();
   console.log(c);
   ```

   ::: details Show answer
   - `console.log(a)` prints `test` in non-strict mode (implicit global).
   - `console.log(b)` throws `ReferenceError`.
   - `console.log(c)` also throws `ReferenceError`.

   Note: once `ReferenceError` is thrown, later lines stop unless handled.

   :::

7. What does this code print?

   ```js
   let a, b;
   (() => {
     let b;
     a = b = 3;
   })();

   console.log(a);
   console.log(b);
   ```

   ::: details Show answer

   ```text
   3
   undefined
   ```

   :::

8. What does this code print?

   ```js
   let name = 'Paul';

   function fn1() {
     console.log(name);
   }

   function fn2() {
     let name = 'Andy';
     fn1();
   }

   fn2();
   ```

   ::: details Show answer

   ```text
   Paul
   ```

   Because lexical scope is based on where `fn1` is defined, not where it is called.

   :::

9. Compare these two snippets.

   Case 1:

   ```js
   var printFunction = function () {
     console.log('function expression');
   };

   function printFunction() {
     console.log('function declaration');
   }

   printFunction();
   ```

   Case 2:

   ```js
   printFunction();

   var printFunction = function () {
     console.log('function expression');
   };

   function printFunction() {
     console.log('function declaration');
   }
   ```

   ::: details Show answer
   - Case 1 prints `function expression`.
   - Case 2 prints `function declaration`.

   :::

## `this` Binding

1. What is `this` in JavaScript?

   ::: details Show answer

   `this` is determined by how a function is called (except arrow functions, which capture lexical `this`).

   :::

2. What does this code print?

   ```js
   var arr = [1, 2, 3];
   var num = 4;

   var obj = {
     fn: function () {
       arr.forEach((num) => {
         console.log(this.num);
       });
     },
     num: 5,
   };

   obj.fn();
   ```

   ::: details Show answer

   ```text
   5
   5
   5
   ```

   Arrow callback captures `this` from `obj.fn()`.

   :::

3. What are the results of these snippets?

   ```js
   var num = 1;
   const obj = {
     num: 2,
     fn: () => console.log(this.num),
   };
   obj.fn();
   ```

   ```js
   const num = 1;
   const obj = {
     num: 2,
     fn: () => console.log(this.num),
   };
   obj.fn();
   ```

   ```js
   var num = 1;
   const obj = {
     num: 2,
     fn: function () {
       console.log(this.num);
     },
   };
   obj.fn();
   ```

   ::: details Show answer
   - First snippet: usually `1` in browser script context.
   - Second snippet: usually `undefined`.
   - Third snippet: `2`.

   :::

4. What problem does this class code have, and how can you fix it?

   ```js
   class Person {
     name;

     constructor(name) {
       this.name = name;
     }

     logName() {
       console.log(this.name);
     }
   }

   const person = new Person('David');
   const logName = person.logName;
   logName();
   ```

   ::: details Show answer

   Problem: method extraction loses the original `this` binding.

   Fix 1: bind explicitly.

   ```js
   const logName = person.logName.bind(person);
   logName();
   ```

   Fix 2: use class field arrow function.

   ```js
   class Person {
     constructor(name) {
       this.name = name;
     }

     logName = () => {
       console.log(this.name);
     };
   }
   ```

   :::

5. In browser non-strict mode, what does this print?

   ```js
   function whatsMyContext() {
     return this;
   }

   console.log(whatsMyContext());

   const getMyThis = whatsMyContext;
   console.log(getMyThis());

   const ninja1 = { getMyThis: whatsMyContext };
   console.log(ninja1.getMyThis());

   const ninja2 = { getMyThis: whatsMyContext };
   console.log(ninja2.getMyThis());
   ```

   ::: details Show answer
   - `whatsMyContext()` -> `window`
   - `getMyThis()` -> `window`
   - `ninja1.getMyThis()` -> `ninja1`
   - `ninja2.getMyThis()` -> `ninja2`

   In strict mode, unbound calls return `undefined` instead of `window`.

   :::

## Closure

1. What is a closure?

   ::: details Show answer

   A closure is a function plus the lexical environment where it was created. It can access outer variables even after the outer function has returned.

   :::

2. What does this code print?

   ```js
   function test() {
     const text = 'closure';
     return function () {
       return text;
     };
   }

   const testFunctionReturn = test();
   console.log(testFunctionReturn);
   console.log(testFunctionReturn());
   ```

   ::: details Show answer
   - First log: a function reference.
   - Second log: `closure`.

   :::

3. What does this code print?

   ```js
   function getAdd() {
     let foo = 0;
     return function () {
       foo = foo + 1;
       return foo;
     };
   }

   const add = getAdd();

   console.log(add());
   console.log(add());
   console.log(add());
   console.log(add());
   ```

   ::: details Show answer

   ```text
   1
   2
   3
   4
   ```

   :::

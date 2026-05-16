# JavaScript Types and Objects

## Value Types

1. Describe the difference between primitive data types and object data types in JavaScript.

   ::: details Show answer
   - **Primitive values** are immutable and assigned/copied by value.
   - **Objects** are mutable and assigned/copied by reference.
   - Updating a primitive creates a new value; updating an object can affect all references to that object.

   :::

2. What are the seven primitive types in JavaScript?

   ::: details Show answer

   `null`, `undefined`, `boolean`, `number`, `string`, `bigint`, `symbol`

   :::

3. How do you check the type of a value?

   ::: details Show answer

   Use `typeof` for most quick checks.

   | Expression            | Result        |
   | --------------------- | ------------- |
   | `typeof undefined`    | `"undefined"` |
   | `typeof null`         | `"object"`    |
   | `typeof true`         | `"boolean"`   |
   | `typeof 123`          | `"number"`    |
   | `typeof NaN`          | `"number"`    |
   | `typeof "test"`       | `"string"`    |
   | `typeof {}`           | `"object"`    |
   | `typeof []`           | `"object"`    |
   | `typeof function(){}` | `"function"`  |

   `typeof null === "object"` is a historical JavaScript bug; `null` is still a primitive.

   :::

4. Which syntax/operators can be used for type checking? How do you reliably check if a value is an array?

   ::: details Show answer
   - `typeof` is useful for primitive/general checks, but `typeof []` is `"object"`.
   - `instanceof Array` works in many cases, but can fail across realms (for example, iframes).
   - `Object.prototype.toString.call(value)` gives detailed built-in type tags.
   - `Array.isArray(value)` is the recommended and most reliable way to check arrays.

   ```js
   console.log(typeof []); // "object"
   console.log([] instanceof Array); // true
   console.log(Object.prototype.toString.call([])); // "[object Array]"
   console.log(Array.isArray([])); // true
   ```

   Extra note:
   - `forEach` cannot be used directly on array-like objects unless you convert/borrow first.

   ```js
   const arrayLike = { 0: 'a', 1: 'b', length: 2 };

   Array.prototype.forEach.call(arrayLike, (item) => {
     console.log(item);
   });

   // or
   Array.from(arrayLike).forEach((item) => {
     console.log(item);
   });
   ```

   :::

5. What is the difference between `Object.is` and `===`?

   ::: details Show answer

   They behave the same in most cases, except:
   - `NaN === NaN` is `false`, but `Object.is(NaN, NaN)` is `true`.
   - `+0 === -0` is `true`, but `Object.is(+0, -0)` is `false`.

   :::

6. Explain what `NaN` means and its key characteristics.

   ::: details Show answer
   - `NaN` means "Not-a-Number" and represents an invalid numeric result.
   - Common sources:
     - `0 / 0`
     - `Infinity / Infinity`
     - `Number("hello")`
     - `parseInt("hello", 10)`
   - `NaN` is the only JavaScript value that is not equal to itself (`NaN !== NaN`).
   - Prefer `Number.isNaN(value)` to test for `NaN`.

   ```js
   console.log(Number.isNaN(NaN)); // true
   console.log(Number.isNaN(0 / 0)); // true
   console.log(Number.isNaN('hello')); // false

   console.log(isNaN('hello')); // true (because of coercion)
   ```

   :::

## Type Conversion

1. What is the output of the following code?

   ```js
   const a = '12';
   const b = '12 dollars';

   console.log(+a);
   console.log(typeof +a);
   console.log(-b);
   console.log(typeof -b);
   ```

   ::: details Show answer

   ```text
   12
   number
   NaN
   number
   ```

   :::

2. Fill in the conversion results for primitive values.

   ::: details Show answer

   | `x`          | `''`       | `'string'`       | `'0'`       | `'1'`       | `0`         | `1`         | `NaN`         | `true`         | `false`         | `undefined`   | `null`      |
   | ------------ | ---------- | ---------------- | ----------- | ----------- | ----------- | ----------- | ------------- | -------------- | --------------- | ------------- | ----------- |
   | `Number(x)`  | `0`        | `NaN`            | `0`         | `1`         | `0`         | `1`         | `NaN`         | `1`            | `0`             | `NaN`         | `0`         |
   | `Boolean(x)` | `false`    | `true`           | `true`      | `true`      | `false`     | `true`      | `false`       | `true`         | `false`         | `false`       | `false`     |
   | `String(x)`  | `''`       | `'string'`       | `'0'`       | `'1'`       | `'0'`       | `'1'`       | `'NaN'`       | `'true'`       | `'false'`       | `'undefined'` | `'null'`    |
   | `Symbol(x)`  | `Symbol()` | `Symbol(string)` | `Symbol(0)` | `Symbol(1)` | `Symbol(0)` | `Symbol(1)` | `Symbol(NaN)` | `Symbol(true)` | `Symbol(false)` | `Symbol()`    | `TypeError` |
   | `BigInt(x)`  | `0n`       | `SyntaxError`    | `0n`        | `1n`        | `0n`        | `1n`        | `RangeError`  | `1n`           | `0n`            | `TypeError`   | `TypeError` |

   :::

3. Fill in the conversion results for object values.

   ::: details Show answer

   | `y`          | `{}`                | `[]`        | `[1]`       | `[1, 2]`      | `['test', 'string']` | `() => {}`    |
   | ------------ | ------------------- | ----------- | ----------- | ------------- | -------------------- | ------------- |
   | `Number(y)`  | `NaN`               | `0`         | `1`         | `NaN`         | `NaN`                | `NaN`         |
   | `Boolean(y)` | `true`              | `true`      | `true`      | `true`        | `true`               | `true`        |
   | `String(y)`  | `'[object Object]'` | `''`        | `'1'`       | `'1,2'`       | `'test,string'`      | `'() => {}'`  |
   | `Symbol(y)`  | `TypeError`         | `TypeError` | `TypeError` | `TypeError`   | `TypeError`          | `TypeError`   |
   | `BigInt(y)`  | `SyntaxError`       | `0n`        | `1n`        | `SyntaxError` | `SyntaxError`        | `SyntaxError` |

   :::

## Copy and References

1. What does spread syntax do, and what is the output of this code?

   ```js
   const react = {
     definition: 'JavaScript library',
     createdBy: 'Facebook',
     syntax: 'JSX',
   };

   const vue = {
     definition: 'JavaScript library',
     createdBy: 'Evan You',
     syntax: 'Template-based',
   };

   const frameworks = [react, vue];

   console.log({ ...react, createdBy: 'Jordan Walke' });
   console.log([...frameworks, vue]);
   ```

   ::: details Show answer
   - Spread creates a **shallow copy**.
   - For objects, later keys override earlier ones.
   - For arrays, elements are copied by reference for objects.

   ```js
   {
     definition: 'JavaScript library',
     createdBy: 'Jordan Walke',
     syntax: 'JSX'
   }

   [
     { definition: 'JavaScript library', createdBy: 'Facebook', syntax: 'JSX' },
     { definition: 'JavaScript library', createdBy: 'Evan You', syntax: 'Template-based' },
     { definition: 'JavaScript library', createdBy: 'Evan You', syntax: 'Template-based' }
   ]
   ```

   :::

2. What is the output of the following code?

   ```js
   const reactCourse = {
     id: 0,
     name: 'React',
     classList: ['Hook', 'useState', 'useEffect'],
   };

   const backupCourseByReference = reactCourse;
   const backupCourseByDestruct = { ...reactCourse };

   reactCourse.name = 'Redux';
   reactCourse.classList[0] = 'useReducer';
   reactCourse.classList = ['useDispatch', 'useSelector'];

   console.log(backupCourseByReference);
   console.log(backupCourseByDestruct);
   ```

   ::: details Show answer

   ```js
   { id: 0, name: 'Redux', classList: ['useDispatch', 'useSelector'] }
   { id: 0, name: 'React', classList: ['useReducer', 'useState', 'useEffect'] }
   ```

   Reason:
   - `backupCourseByReference` points to the same object.
   - `{ ...reactCourse }` is shallow: nested `classList` is initially shared.
   - Reassigning `reactCourse.classList` breaks the sharing only for `reactCourse`.

   :::

3. What is the output of this code?

   ```js
   let a = {};
   let b = a;
   let c = (b = { name: 'foo' });

   c.name = 'bar';

   console.log(b);
   console.log(a);
   ```

   ::: details Show answer

   ```js
   {
     name: 'bar'
   }
   {}
   ```

   `b` is reassigned to a new object, while `a` still points to the original empty object.

   :::

4. Complete the function to perform deep copy.

   ```js
   function cloneDeep(value) {
     // Complete deep copy function
   }

   const object = { a: { b: 1 }, c: { d: 2 } };
   const deepObject = cloneDeep(object);
   console.log(deepObject.a === object.a); // false

   const array = [{ b: 1 }, { d: 2 }];
   const deepArray = cloneDeep(array);
   console.log(deepArray[0] === array[0]); // false
   ```

   ::: details Show answer

   Basic recursive version:

   ```js
   function cloneDeep(value) {
     if (typeof value === 'object' && value !== null) {
       const copyObject = Array.isArray(value) ? [] : {};

       for (const key in value) {
         copyObject[key] = cloneDeep(value[key]);
       }

       return copyObject;
     }

     return value;
   }
   ```

   Limitations:
   - Cannot handle circular references.
   - Cannot correctly clone special objects like `Date`, `RegExp`, `Set`, `Map`.
   - May not preserve prototype/descriptors.

   Improved version:

   ```js
   function cloneDeep(value, cache = new Map()) {
     if (typeof value !== 'object' || value === null) {
       return value;
     }

     if (cache.has(value)) {
       return cache.get(value);
     }

     let copyObject;

     if (Array.isArray(value)) {
       copyObject = [];
     } else if (value instanceof Date) {
       copyObject = new Date(value);
     } else if (value instanceof RegExp) {
       copyObject = new RegExp(value);
     } else if (value instanceof Set) {
       copyObject = new Set();
     } else if (value instanceof Map) {
       copyObject = new Map();
     } else {
       copyObject = Object.create(Object.getPrototypeOf(value));
     }

     cache.set(value, copyObject);

     if (value instanceof Set) {
       value.forEach((item) => copyObject.add(cloneDeep(item, cache)));
       return copyObject;
     }

     if (value instanceof Map) {
       value.forEach((mapValue, mapKey) => {
         copyObject.set(cloneDeep(mapKey, cache), cloneDeep(mapValue, cache));
       });
       return copyObject;
     }

     for (const key in value) {
       if (Object.prototype.hasOwnProperty.call(value, key)) {
         copyObject[key] = cloneDeep(value[key], cache);
       }
     }

     return copyObject;
   }
   ```

   :::

5. Besides implementing manually, what are other ways to deep copy objects?

   ::: details Show answer
   - `structuredClone(value)` (modern built-in, recommended when available)
   - `JSON.parse(JSON.stringify(value))` (simple but loses functions, `undefined`, `Date`, `Map`, `Set`, etc.)
   - Utility libraries like `lodash` (`_.cloneDeep`)

   :::

## Object Data Structures

1. What are the differences between `Map` and `Object`?

   ::: details Show answer
   - `Map` keys can be any type; `Object` keys are strings/symbols.
   - `Map` keeps insertion order reliably for iteration.
   - `Map` has built-in `size`, `get`, `set`, `has`, `delete`, `clear`.
   - `Object` is better for plain records and JSON-like structures.

   :::

2. When should you use `Map`/`Set` vs `WeakMap`/`WeakSet`?

   ::: details Show answer

   Use `Map` / `Set` when:
   - You need to store primitives and/or objects.
   - You need iteration and `size`.
   - You want strong references and explicit lifecycle management.

   Use `WeakMap` / `WeakSet` when:
   - Keys (`WeakMap`) or values (`WeakSet`) must be objects only.
   - You do not need iteration or `size`.
   - You want weak references to avoid memory leaks for short-lived objects.

   ```js
   const elementConfigs = new WeakMap();

   let myDiv = document.createElement('div');
   document.body.appendChild(myDiv);

   elementConfigs.set(myDiv, { animationSpeed: 200, isActive: false });

   myDiv.remove();
   myDiv = null;
   ```

   :::

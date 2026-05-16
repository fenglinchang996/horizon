# JavaScript Async

## Promises, Timers, and Event Loop

1. Describe how to create a Promise and how to use it.

   ::: details Show answer
   - Create a Promise with `new Promise((resolve, reject) => { ... })`.
   - Call `resolve(value)` when successful, `reject(error)` when failed.
   - Consume with `.then()`, `.catch()`, and `.finally()`.

   ```js
   const p = new Promise((resolve, reject) => {
     const ok = true;
     if (ok) resolve('done');
     else reject(new Error('failed'));
   });

   p.then((value) => console.log(value)).catch((err) => console.error(err));
   ```

   :::

2. What is the output of the following code?

   ```js
   const p = new Promise((resolve) => resolve('Promise done'));

   console.log('Before Promise');
   p.then((result) => console.log(result));
   console.log('After Promise');
   ```

   ::: details Show answer

   ```text
   Before Promise
   After Promise
   Promise done
   ```

   :::

3. What is the output of the following code?

   ```js
   function fn() {
     console.log(1);
     return new Promise((resolve) => {
       setTimeout(() => {
         resolve(3);
         console.log(2);
       }, 0);
       console.log(4);
     });
   }

   fn().then((result) => {
     console.log(result);
   });

   console.log(5);
   ```

   ::: details Show answer

   ```text
   1
   4
   5
   2
   3
   ```

   :::

4. The following code is expected to print numbers with 1-second intervals, but it does not behave as expected. Fix it.

   ```js
   for (var i = 0; i < 5; i++) {
     setTimeout(() => {
       console.log(i);
     }, 1000);
   }
   ```

   ::: details Show answer

   ```js
   for (let i = 0; i < 5; i++) {
     setTimeout(
       () => {
         console.log(i);
       },
       1000 * (i + 1)
     );
   }
   ```

   ```js
   let count = 0;
   const timer = setInterval(() => {
     console.log(count);
     if (count === 4) clearInterval(timer);
     count++;
   }, 1000);
   ```

   ```js
   async function run() {
     for (let i = 0; i < 5; i++) {
       await new Promise((resolve) => {
         setTimeout(() => {
           console.log(i);
           resolve();
         }, 1000);
       });
     }
   }

   run();
   ```

   :::

5. Is the following code guaranteed to log exactly `1000 ms`?

   ```js
   const start = Date.now();
   setTimeout(() => {
     console.log('time passed:', Date.now() - start, 'ms');
   }, 1000);
   ```

   ::: details Show answer

   No. It is **at least around** 1000 ms, not guaranteed to be exactly 1000 ms.

   Reasons include:
   - Event loop scheduling
   - Main thread blocking
   - Timer clamping and environment differences

   :::

6. What is the output of the following code?

   ```js
   console.log('Begin!');

   async function asyncFunc() {
     console.log('asyncFunc begin!');
     await console.log('asyncFunc await!');
     console.log('asyncFunc end!');
   }

   asyncFunc();
   console.log('End!');
   ```

   ::: details Show answer

   ```text
   Begin!
   asyncFunc begin!
   asyncFunc await!
   End!
   asyncFunc end!
   ```

   :::

7. What is the execution order of this code? Explain with Event Loop, Macrotask, and Microtask.

   ```js
   setTimeout(() => console.log('timer'));

   Promise.resolve('promise1')
     .then((value) => console.log(value))
     .then(() => console.log('promise2'));

   console.log('log');
   ```

   ::: details Show answer

   ```text
   log
   promise1
   promise2
   timer
   ```

   - `console.log('log')` runs first in the current call stack.
   - Promise callbacks are queued as microtasks and run before macrotasks.
   - `setTimeout` callback is a macrotask, so it runs after microtasks.

   :::

## Promise Utilities and Implementations

1. Implement a Promise-based version of `setTimeout`.

   ```js
   // Convert:
   // setTimeout(callback, timeInMilliseconds)
   // To:
   // setTimeoutPromise(timeInMilliseconds).then(() => callback())
   function setTimeoutPromise(timeInMilliseconds) {
     // Implement here
   }

   setTimeoutPromise(5000).then(() => {
     console.log('doSomething');
   });
   ```

   ::: details Show answer

   ```js
   function setTimeoutPromise(timeInMilliseconds) {
     return new Promise((resolve) => {
       setTimeout(resolve, timeInMilliseconds);
     });
   }
   ```

   :::

2. Implement `Promise.all` behavior.

   ```js
   const p1 = Promise.resolve(3);
   const p2 = 1337;
   const p3 = new Promise((resolve) => {
     setTimeout(resolve, 1000, 'foo');
   });
   const p4 = new Promise((_, reject) => {
     setTimeout(reject, 1000, 'error');
   });

   function promiseAll(promiseArr) {
     // Implement here
   }

   Promise.all([p1, p2, p3]).then((values) => {
     console.log(values); // [3, 1337, 'foo']
   });

   promiseAll([p1, p2, p3]).then((values) => {
     console.log(values); // [3, 1337, 'foo']
   });

   promiseAll([p1, p2, p3, p4]).catch((error) => {
     console.log(error); // error
   });
   ```

   ::: details Show answer

   ```js
   function promiseAll(promiseArr) {
     return new Promise((resolve, reject) => {
       if (promiseArr.length === 0) {
         resolve([]);
         return;
       }

       let resolvedCount = 0;
       const resultArr = [];

       promiseArr.forEach((item, index) => {
         Promise.resolve(item)
           .then((value) => {
             resultArr[index] = value;
             resolvedCount++;
             if (resolvedCount === promiseArr.length) {
               resolve(resultArr);
             }
           })
           .catch((error) => {
             reject(error);
           });
       });
     });
   }
   ```

   :::

3. Implement a `PromiseQueue` so async tasks execute one by one in the order they are added.

   Use this async task factory:

   ```js
   const fakeAsyncFunc = (label, delay) => () =>
     new Promise((resolve) => {
       console.log(`start ${label}`);
       setTimeout(() => {
         console.log(`end ${label} after ${delay} ms`);
         resolve();
       }, delay);
     });
   ```

   Without queue:

   ```js
   fakeAsyncFunc('task 1', 2000)();
   fakeAsyncFunc('task 2', 3000)();
   fakeAsyncFunc('task 3', 1000)();
   ```

   Expected output without queue:

   ```text
   start task 1
   start task 2
   start task 3
   end task 3 after 1000 ms
   end task 1 after 2000 ms
   end task 2 after 3000 ms
   ```

   Queue usage:

   ```js
   const pQueue = new PromiseQueue();

   pQueue.add(fakeAsyncFunc('task 1', 2000));
   pQueue.add(fakeAsyncFunc('task 2', 3000));
   pQueue.add(fakeAsyncFunc('task 3', 1000));
   ```

   Expected output with queue:

   ```text
   start task 1
   end task 1 after 2000 ms
   start task 2
   end task 2 after 3000 ms
   start task 3
   end task 3 after 1000 ms
   ```

   Interface:

   ```js
   class PromiseQueue {
     queue = [];
     isRunning = false;

     add(task) {}
   }
   ```

   ::: details Show answer

   ```js
   class PromiseQueue {
     queue = [];
     isRunning = false;

     add(task) {
       this.queue.push(task);
       if (this.isRunning) return;
       this.execute();
     }

     async execute() {
       this.isRunning = true;

       while (this.queue.length > 0) {
         const task = this.queue.shift();

         try {
           await task();
         } catch (err) {
           console.error('Task failed:', err);
         }
       }

       this.isRunning = false;
     }
   }
   ```

   :::

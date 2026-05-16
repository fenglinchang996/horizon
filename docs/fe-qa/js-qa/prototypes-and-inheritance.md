# Prototypes and Inheritance

## Prototype Basics

1. What is the difference between `Object.keys` and `for...in`?

   Explain with this code:

   ```js
   function Person(first, last) {
     this.name = { first, last };
     this.walking = function () {
       return `${this.name.first} ${this.name.last} is walking!`;
     };
   }

   Person.prototype.greeting = function () {
     return `Hi! I'm ${this.name.first}.`;
   };

   const person = new Person('foo', 'bar');

   console.log('Object keys');
   Object.keys(person).forEach((key) => console.log(key));

   console.log('for...in');
   for (const key in person) {
     console.log(key);
   }
   ```

   ::: details Show answer

   ```text
   Object keys
   name
   walking
   for...in
   name
   walking
   greeting
   ```

   - `Object.keys(obj)` returns only own enumerable properties.
   - `for...in` iterates own + inherited enumerable properties.

   :::

2. What is the output of this code?

   ```js
   function func() {
     this.name = 'test';
   }

   Object.getPrototypeOf(func).getName = function () {
     return this.name;
   };

   console.log(func.getName());
   ```

   ::: details Show answer

   ```text
   func
   ```

   Reason: `func` is itself a function object, and its `name` property is `'func'`.

   :::

3. Given this constructor-based code, describe behavior and key prototype-chain checks.

   ```js
   function Person(first, last, age, gender) {
     this.name = { first, last };
     this.age = age;
     this.gender = gender;
     this.walking = function () {
       return `${this.name.first} ${this.name.last} is walking!`;
     };
   }

   Person.prototype.greeting = function () {
     return `Hi! I'm ${this.name.first}.`;
   };

   const me = new Person('Feng-Lin', 'Chang', 18, 'male');

   console.log(me.walking());
   console.log(me.greeting());
   console.log(me.constructor === Person);
   const personPrototype = Object.getPrototypeOf(me);
   console.log(personPrototype === Person.prototype);
   console.log(personPrototype.constructor === Person);
   console.log(Person.prototype.constructor === Person);
   ```

   ::: details Show answer

   - `walking` is an own method on each instance.
   - `greeting` is shared on `Person.prototype`.
   - All constructor/prototype checks in this snippet evaluate to `true`.

   :::

## Inheritance Patterns

1. The snippet below attempts prototype-chain inheritance. What is wrong and how should it be fixed?

   ```js
   function Engineer(first, last, age, gender, skill) {
     Person.call(this, first, last, age, gender);
     this.skill = skill;
   }

   Engineer.prototype = Object.create(Animal.prototype);
   Engineer.prototype.constructor = Engineer;
   Engineer.prototype.work = function () {
     console.log(`Working with ${skill}`);
   };
   ```

   ::: details Show answer

   Issues:

   - `Animal.prototype` should be `Person.prototype`.
   - `skill` should be `this.skill` inside `work`.

   Fixed version:

   ```js
   function Engineer(first, last, age, gender, skill) {
     Person.call(this, first, last, age, gender);
     this.skill = skill;
   }

   Engineer.prototype = Object.create(Person.prototype);
   Engineer.prototype.constructor = Engineer;

   Engineer.prototype.work = function () {
     console.log(`Working with ${this.skill}`);
   };
   ```

   :::

2. Implement `_new` to simulate `new` behavior.

   ```js
   function _new(constructor, ...args) {
     // Implement here
   }

   const she = _new(Person, 'Zi-Wei', 'Chen', 31, 'female');
   console.log(she.walking());
   console.log(she.greeting());
   ```

   ::: details Show answer

   ```js
   function _new(constructor, ...args) {
     const obj = Object.create(constructor.prototype);
     const res = constructor.call(obj, ...args);
     return typeof res === 'object' && res !== null ? res : obj;
   }
   ```

   :::

3. Implement `_extends` and `_super` to support constructor inheritance.

   ```js
   function _extends(derived, base) {
     // Implement here
   }

   function _super(base, ...args) {
     // Implement here
   }

   function Teacher(first, last, age, gender, subject) {
     this.subject = subject;
     _super.call(this, Person, first, last, age, gender);
   }
   _extends(Teacher, Person);
   ```

   ::: details Show answer

   ```js
   function _extends(derived, base) {
     const derivedPrototype = Object.create(base.prototype);
     derivedPrototype.constructor = derived;
     derived.prototype = derivedPrototype;
   }

   function _super(base, ...args) {
     base.call(this, ...args);
   }
   ```

   :::

4. Use `_extends` and `_super` to mimic basic `class` behavior.

   ```js
   function _class(constructor, methods, base) {
     _extends(constructor, base);
     Object.entries(methods).forEach(([name, method]) => {
       constructor.prototype[name] = method;
     });
     return constructor;
   }

   const Artist = _class(
     function Artist(first, last, age, gender, skill) {
       this.skill = skill;
       _super.call(this, Person, first, last, age, gender);
     },
     {
       painting: function () {
         return `${this.name.first} ${this.name.last} is painting!`;
       },
     },
     Person
   );
   ```

   ::: details Show answer

   This approach mimics only a subset of class behavior:

   - Works for constructor setup and prototype methods.
   - Does not include full `class` semantics (private fields, `super` keyword behavior, static blocks, etc.).

   :::

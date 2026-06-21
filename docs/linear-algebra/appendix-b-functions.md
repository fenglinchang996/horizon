# Functions

This appendix reviews the essential definitions, properties, and theorems regarding mappings or functions between sets, which serve as the foundational language for linear transformations, isomorphisms, and advanced algebraic structures.

## 1. Functions

::: info Definition
If $$ and B are sets, a **function** (or **mapping**) $f$ from a set $A$ to a set $B$ (written $f: A \to B$) is a rule that associates with each element $x \in A$ a unique element $y \in B$, denoted by $f(x)$.
The set $A$ is called the **domain** of $f$, and the set $B$ is called the **codomain** of $f$.
:::

> **Conceptual Note**
> Formally, a function $f: A \to B$ can be defined as a subset of the Cartesian product $A \times B$ satisfying the property that for each $x \in A$, there is a unique element $y \in B$ such that $(x, y) \in f$.

## 2. Range, Images, and Preimages

::: info Definition
Let $f: A \to B$ be a function.

1. The **range** of $f$, is the set of all images of elements in $A$; that is,
   $$ \{ f(x) : x \in A \}$$
2. If $S$ is a subset of $A$, the **image** of $S$ under $f$, denoted by $f(S)$, is the subset of $B$ defined by
   $$f(S) = \{ f(x) : x \in S \}$$
3. If $T$ is a subset of $B$, the **inverse image** (or **preimage**) of $T$ under $f$, denoted by $f^{-1}(T)$, is the subset of $A$ defined by
   $$f^{-1}(T) = \{ x \in A : f(x) \in T \}$$
4. Two functions $f: A \to B$ and $g: A \to B$ are equal, written $f = g$, if $f(x) = g(x)$ for all $x \in A$.

:::

## 3. Restrictions and Identity Functions

::: info Definition
Let $f: A \to B$ be a function, and let $S$ be a subset of $A$. The **restriction** of $f$ to $S$, denoted by $f|_S$, is the function $f|_S: S \to B$ defined by
$$f|_S(x) = f(x) \quad \text{for all } x \in S$$
:::

::: info Definition
For any set $A$, the **identity function** $I_A: A \to A$ is defined by
$$I_A(x) = x \quad \text{for all } x \in A$$
:::

---

## 4. One-to-One and Onto Functions

::: info Definition
A function $f: A \to B$ is said to be **one-to-one** (or **injective**) if for any $x_1, x_2 \in A$, $f(x_1) = f(x_2)$ implies $x_1 = x_2$.
:::

::: info Definition
A function $f: A \to B$ is said to be **onto** (or **surjective**) if the range of $f$ equals $B$; that is, if for every $y \in B$, there exists at least one $x \in A$ such that $f(x) = y$.
:::

::: info Definition
A function that is both one-to-one and onto is called a **one-to-one correspondence** (or a **bijection**).
:::

---

## 5. Composition of Functions

::: info Definition
Let $f: A \to B$ and $g: B \to C$ be functions.
The **composition** of $g$ and $f$, denoted by $g \circ f$, is the function $g \circ f: A \to C$ defined by
$$(g \circ f)(x) = g(f(x)) \quad \text{for all } x \in A$$
:::

::: info Theorem B.1
Let $f: A \to B$, $g: B \to C$, and $h: C \to D$ be functions. Then
$$h \circ (g \circ f) = (h \circ g) \circ f$$
:::

---

## 6. Invertibility and Inverses

::: info Definition
A function $f: A \to B$ is said to be **invertible** if there exists a function $g: B \to A$ such that $g \circ f = I_A$ and $f \circ g = I_B$. Such a function $g$ is called an **inverse** of $f$.
:::

::: info Theorem B.2
If a function $f: A \to B$ is invertible, its inverse is unique.
:::

> Because the inverse of an invertible function is unique, it is unambiguously denoted by the symbol $f^{-1}$. Thus, $f^{-1}: B \to A$ satisfies $f^{-1} \circ f = I_A$ and $f \circ f^{-1} = I_B$.

::: info Theorem B.3
A function $f: A \to B$ is invertible if and only if it is one-to-one and onto (i.e., a bijection).
:::

::: info Theorem B.4
Let $f: A \to B$ and $g: B \to C$ be invertible functions. Then $g \circ f$ is invertible, and
$$(g \circ f)^{-1} = f^{-1} \circ g^{-1}$$
:::

# Vector Spaces

## 1.1 Introduction

This section introduces the fundamental operations of vectors through physical and geometric intuition, and uses these operations to describe lines and planes in space. These geometric properties serve as the foundation for the abstract definition of "vector spaces" in subsequent sections.

### Physical and Geometric Intuition

#### Vector

::: info Definition
An entity possessing both magnitude and direction (e.g., force, velocity). Geometrically, it is typically represented by an arrow.
:::

#### Vector Addition

::: info Parallelogram Law for Vector Addition
The sum $x + y$ of two vectors $x$ and $y$ acting at the same point $P$ can be represented as the diagonal of the parallelogram having $x$ and $y$ as adjacent sides.
:::

#### Scalar Multiplication

Multiplying a vector $x$ by a real number $t$ (a scalar).

- If $t > 0$, the vector $tx$ has the same direction as the original vector $x$; if $t < 0$, it has the opposite direction.
- The magnitude (length) of the vector is stretched or shrunk by a factor of $|t|$.
- If two nonzero vectors $x$ and $y$ satisfy $y = tx$ (where $t$ is a nonzero real number), the two vectors are said to be **parallel**.

### Algebraic Descriptions of Vector Operations in the Plane

- Through analytic geometry, we can place vectors in a coordinate system. Usually, the initial point is set at the origin, and the vector is represented by the coordinates of its terminal point.
- Vector addition and scalar multiplication in a plane or in space will always satisfy the following 8 basic properties:
  1. **Commutativity of addition**: For all vectors $x, y$, we have $x + y = y + x$.
  2. **Associativity of addition**: For all vectors $x, y, z$, we have $(x + y) + z = x + (y + z)$.
  3. **Existence of zero vector**: There exists a vector $\mathbf{0}$ such that $x + \mathbf{0} = x$ for all vectors $x$.
  4. **Existence of additive inverse**: For each vector $x$, there exists a vector $y$ such that $x + y = \mathbf{0}$.
  5. **Multiplicative identity**: $1x = x$.
  6. **Associativity of scalar multiplication**: For all real numbers $a, b$ and vector $x$, $(ab)x = a(bx)$.
  7. **Distributivity of scalar over vector addition**: $a(x + y) = ax + ay$.
  8. **Distributivity of scalar addition over vector**: $(a + b)x = ax + bx$.

### Equations of Lines and Planes in Space

Using vector addition and scalar multiplication, we can concisely describe lines and planes in space:

::: info Equation of a Line
A line passing through two distinct points $A$ and $B$ in space can be expressed as:

$$
x = u + t(v - u)
$$

Here, $u$ and $v$ are the position vectors pointing from the origin to points $A$ and $B$ respectively, and $t$ is any real number. The term $v - u$ represents the direction vector from $A$ to $B$.
:::

::: info Equation of a Plane
A plane containing three noncollinear points $A$, $B$, and $C$ can be expressed as:

$$
x = A + su + tv
$$

Here, $A$ is identified with its position vector, $u$ is the vector pointing from $A$ to $B$, $v$ is the vector pointing from $A$ to $C$, and $s, t$ are any real numbers.
:::

## 1.2 Vector Spaces

In this section, the formal definition of a vector space is introduced, abstracting the eight basic properties observed in Section 1.1. It also provides several fundamental examples of vector spaces that will be used throughout the study of linear algebra.

### Formal Definition of a Vector Space

::: info Definition

A **vector space** (or **linear space**) $\mathsf{V}$ over a field $F$ consists of a set on which two operations (called **addition** and **scalar multiplication**) are defined so that for each pair of elements $x, y$ in $\mathsf{V}$ there is a unique element $x + y$ in $\mathsf{V}$, and for each element $a$ in $F$ and each element $x$ in $\mathsf{V}$ there is a unique element $ax$ in $\mathsf{V}$ satisfying the following eight conditions:

- **(VS 1) Commutativity of addition:** For all $x, y \in \mathsf{V}$, $x + y = y + x$.
- **(VS 2) Associativity of addition:** For all $x, y, z \in \mathsf{V}$, $(x + y) + z = x + (y + z)$.
- **(VS 3) Existence of zero vector:** There exists an element in $\mathsf{V}$ denoted by $\mathbf{0}$ such that $x + \mathbf{0} = x$ for each $x \in \mathsf{V}$.
- **(VS 4) Existence of additive inverse:** For each element $x \in \mathsf{V}$, there exists an element $y \in \mathsf{V}$ such that $x + y = \mathbf{0}$.
- **(VS 5) Multiplicative identity:** For each element $x \in \mathsf{V}$, $1x = x$.
- **(VS 6) Associativity of scalar multiplication:** For each pair of elements $a, b \in F$ and each $x \in \mathsf{V}$, $(ab)x = a(bx)$.
- **(VS 7) Distributivity of scalar over vector addition:** For each $a \in F$ and each pair $x, y \in \mathsf{V}$, $a(x + y) = ax + ay$.
- **(VS 8) Distributivity of vector over scalar addition:** For each pair of elements $a, b \in F$ and each $x \in \mathsf{V}$, $(a + b)x = ax + bx$.

:::

> **Terminology Note:** Elements of the field $F$ are called **scalars**, and elements of the vector space $\mathsf{V}$ are called **vectors**.
> Every vector space is regarded as a vector space over a given field and we often restrict our attention to the fields of real and complex numbers, which are denoted $\mathbb{R}$ and $\mathbb{C}$, respectively.
> Also note that the word "vector" is now being used to describe any element of a vector space, not the physical entity discussed in the previous section.

### Important Examples of Vector Spaces

The textbook introduces several algebraic systems that satisfy the definition of a vector space:

#### $n$-tuples ($\mathsf{F}^n$)

::: info $n$-tuple
An object of the form $(a_1, a_2, \dots, a_n)$, where the entries $a_1, a_2, \dots, a_n$ are elements of a field $F$, is called an $n$-tuple.
The elements $a_1, a_2, \dots, a_n$ are called the **entries** or **components** of the $n$-tuple.
Two $n$-tuples $(a_1, a_2, \dots, a_n)$ and $(b_1, b_2, \dots, b_n)$ with entries from a field $F$ are called equal if $a_i = b_i$ for $i = 1, 2, \dots, n$.
:::

The set of all $n$-tuples $(a_1, a_2, \dots, a_n)$ with entries from a field $F$ is denoted by $\mathsf{F}^n$.
This set is a vector space over $F$ with the operations of coordinatewise addition and scalar multiplication; that is, if $u = (a_1, a_2, \dots, a_n) \in \mathsf{F}^n$, $v = (b_1, b_2, \dots, b_n) \in \mathsf{F}^n$ and $c \in F$, then

$$
u + v = (a_1 + b_1, a_2 + b_2, \dots, a_n + b_n) \quad and \quad cu = (ca_1, ca_2, \dots, ca_n).
$$

Vectors in $\mathsf{F}^n$ may be written as **column vectors**:

$$
\begin{pmatrix}
a_1 \\
a_2 \\
\vdots \\
a_n
\end{pmatrix}
$$

rather than as **row vectors** $(a_1,a_2,\dots,a_n)$.

> Since a 1-tuple whose only entry is from $F$ can be regarded as an element of $F$, we usually write $F$ rather than $\mathsf{F}^1$ for the vector space of 1-tuples with entries from $F$.

#### Matrices as a Vector Space ($\mathsf{M}_{m \times n}(F)$)

::: info Matrix
An $m \times n$ matrix with entries from a field $F$ is a rectangular array of the form

$$
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
$$

where each entry $a_{ij}$ ($1 \le i \le m, 1 \le j \le n$) is an element of $F$.
:::

- The rows of the matrix are regarded as vectors in $\mathsf{F}^n$, and the columns are regarded as vectors in $\mathsf{F}^m$.
- We can also regard a row / column vector in $\mathsf{F}^n$ / $\mathsf{F}^m$ as $1 \times n$ / $m \times 1$ matrix with entries from $F$.
- We denote matrices by capital italic letters and we denote the entry of a matrix $A$ that lies in row $i$ and column $j$ by $A_{ij}$.
- The $m \times n$ matrix in which each entry equals zero is called the **zero matrix** and is denoted by $O$.
- If the number of rows and columns of a matrix are equal, the matrix is called **square**.
- Two $m \times n$ matrices $A$ and $B$ are called **equal** if all their corresponding entries are equal, that is, if $A_{ij}=B_{ij}$ for $1 \le i \le m, 1 \le j \le n$.

The set of all $m \times n$ matrices with entries from a field $F$ is a vector space, which we denote by $\mathsf{M}_{m \times n}(F)$, with the standard operations of **matrix addition** and **scalar multiplication**:
For $A,B \in \mathsf{M}_{m \times n}(F)$ and $c \in F$,

$$
(A+B)_{ij} = A_{ij} + B_{ij} \quad \text{and} \quad (cA)_{ij} = cA_{ij}
$$

#### Functions as a Vector Space ($\mathcal{F}(S, F)$)

The set of all functions from a nonempty set $S$ to a field $F$ is denoted by $\mathcal{F}(S, F)$.
Two functions $f$ and $g$ are equal if $f(s) = g(s)$ for each $s \in S$.
The set $\mathcal{F}(S, F)$ is a vector space with operations defined for $f, g \in \mathcal{F}(S,F)$ and $c \in F$ by

$$
(f+g)(s) = f(s) + g(s) \quad \text{and} \quad (cf)(s) = c[f(s)]
$$

for each $s \in S$.

#### Polynomials as a Vector Space ($\mathsf{P}(F)$)

::: info Polynomials
A polynomial with coefficients from a field $F$ is either the zero polynomial $0$ or an expression of the form

$$
f(x) = a_{n}x^{n} + a_{n-1}x^{n-1} + \dots + a_{1}x + a_0
$$

where $n$ is a nonnegative integer, each $a_k$, called the **coefficient** of $x^k$, is in $F$, and $a_n \ne 0$.
:::

::: info The Degree of a Polynomial
The degree of a nonzero polynomial is defined to be the largest exponent of $x$ that appears with a nonzero coefficient.
$f(x)$ is called the **zero polynomial** if $f(x) = 0$, and its degree is defined to be -1. A polynomial of degree 0 may be written in the form $f(x) = c$ for some nonzero scalar $c$.
:::

Two polynomials,

$$
f(x) = a_{n}x^{n} + a_{n-1}x^{n-1} + \dots + a_{1}x + a_0
$$

and

$$
g(x) = b_{m}x^{m} + b_{m-1}x^{m-1} + \dots + b_{1}x + b_0
$$

are called equal if, after adjoining zero coefficients to whichever polynomial has smaller degree, their corresponding coefficients are equal.

Let

$$
f(x) = a_{n}x^{n} + a_{n-1}x^{n-1} + \dots + a_{1}x + a_0
$$

and

$$
g(x) = b_{m}x^{m} + b_{m-1}x^{m-1} + \dots + b_{1}x + b_0
$$

be polynomials with coefficients from a field $F$. Suppose that $m \le n$, and define $b_{m+1} = b_{m+2} = \dots = b_n = 0$. Then $g(x)$ can be written as

$$
g(x) = b_{n}x^n + b_{n-1}x^{n-1} + \dots + b_{1}x + b_0
$$

Define

$$
f(x) + g(x) = (a_n + b_n)x^n + (a_{n-1} + b_{n-1})x^{n-1} + \dots + (a_1 + b_1)x + (a_0 + b_0)
$$

and

$$
cf(x) = ca_{n}x^n + ca_{n-1}x^{n-1} + \dots + ca_{1}x + ca_0
$$

for $c \in F$.

With these operations, the set of all polynomials with coefficients from $F$ is a vector space, which we denote by $\mathsf{P}(F)$.

### Elementary Consequences of the Definition

From the eight axioms, we can derive several basic algebraic properties of vector spaces:

::: info Theorem 1.1 (Cancellation Law for Vector Addition).
If $x, y,$ and $z$ are vectors in a vector space $\mathsf{V}$ such that $x + z = y + z$, then $x = y$.
:::

::: info Corollary 1.
The vector $\mathbf{0}$ described in (VS 3) is unique.
:::

> The vector $\mathbf{0}$ is called the **zero vector** of $\mathsf{V}$.

::: info Corollary 2.
The vector $y$ described in (VS 4) is unique.
:::

> The vector $y$ in (VS 4) is called the **additive inverse** of $x$ and is denoted by $-x$.

::: info Theorem 1.2.
In any vector space $\mathsf{V}$, the following statements are true:

1. $0x = \mathbf{0}$ for each $x \in \mathsf{V}$.
2. $(-a)x = -(ax) = a(-x)$ for each $a \in F$ and each $x \in \mathsf{V}$.
3. $a\mathbf{0} = \mathbf{0}$ for each $a \in F$.

:::

## 1.3 Subspaces

In the study of vector spaces, we often find that certain subsets of a vector space themselves possess the structure of a vector space under the exact same operations. This section formally defines these subsets and provides a simplified method for identifying them without having to verify all eight vector space axioms.

### Formal Definition of a Subspace

::: info Definition
A subset $\mathsf{W}$ of a vector space $\mathsf{V}$ over a field $F$ is called a **subspace** of $\mathsf{V}$ if $\mathsf{W}$ is a vector space over $F$ with the operations of addition and scalar multiplication defined on $\mathsf{V}$.
:::

> $\mathsf{V}$ and $\{\mathbf{0}\}$ (the zero subspace of $\mathsf{V}$) are subspaces.

Verifying all eight vector space axioms for a subset $\mathsf{W}$ can be tedious. In principle, to show that $\mathsf{W}$ is a subspace, we must show that $\mathsf{W}$ is itself a vector space under the operations inherited from $\mathsf{V}$. However, because the vectors in $\mathsf{W}$ are also vectors in $\mathsf{V}$, properties that apply to all vectors in $\mathsf{V}$ (such as commutativity, associativity, and distributivity) are automatically inherited by the vectors in $\mathsf{W}$.

Thus, in practice, to determine whether a subset is a subspace, it is enough to verify the following:

- $\mathbf{0} \in \mathsf{W}$.
- $x + y \in \mathsf{W}$ whenever $x \in \mathsf{W}$ and $y \in \mathsf{W}$. ($\mathsf{W}$ is **closed under addition**.)
- $cx \in \mathsf{W}$ whenever $c \in F$ and $x \in \mathsf{W}$. ($\mathsf{W}$ is **closed under scalar multiplication**.)

Once these conditions hold, additive inverses also lie in $\mathsf{W}$, since for any $x \in \mathsf{W}$ we have $-x = (-1)x \in \mathsf{W}$.

> For a subset $W$ to be a subspace, it must be completely self-contained with respect to vector addition and scalar multiplication. If you take any vectors inside $W$ and perform these operations on them, the resulting vectors must not "escape" the subset $W$. Additionally, since it must be a vector space in its own right, it must contain the zero vector.

### The Subspace Test (Theorem 1.3)

::: info Theorem 1.3
Let $\mathsf{V}$ be a vector space and $\mathsf{W}$ a subset of $\mathsf{V}$. Then $\mathsf{W}$ is a subspace of $\mathsf{V}$ if and only if the following three conditions hold for the operations defined in $\mathsf{V}$:

1. $\mathbf{0} \in \mathsf{W}$. (The zero vector of $\mathsf{W}$ and $\mathsf{V}$ are the same)
2. $x + y \in \mathsf{W}$ whenever $x \in \mathsf{W}$ and $y \in \mathsf{W}$ (This is known as being **closed under addition**).
3. $cx \in \mathsf{W}$ whenever $c \in F$ and $x \in \mathsf{W}$ (This is known as being **closed under scalar multiplication**).

:::

### Intersection of Subspaces (Theorem 1.4)

::: info Theorem 1.4
Any intersection of subspaces of a vector space $\mathsf{V}$ is a subspace of $\mathsf{V}$.
:::

> The union of subspaces of $\mathsf{V}$ is not necessarily a subspace of $\mathsf{V}$.

## 1.4 Linear Combinations and Systems of Linear Equations

### 1. Linear Combinations

::: info Definition
Let $\mathsf{V}$ be a vector space and $S$ be a nonempty subset of $\mathsf{V}$.
A vector $v \in \mathsf{V}$ is called a **linear combination** of vectors of $S$ if there exist **finitely many** vectors $u_1, u_2, \dots, u_n$ in $S$ and scalars $a_1, a_2, \dots, a_n$ in $F$ such that:

$$
v = a_{1}u_{1} + a_{2}u_{2} + \dots + a_{n}u_{n}
$$

In this case, we also say that $v$ is a linear combination of $u_1, u_2, \dots, u_n$, and $a_1, a_2, \dots, a_n$ are called the **coefficients** of the linear combination.
:::

> A linear combination is the most general way to construct a new vector using addition and scalar multiplication.
> Geometrically, if you have two non-parallel vectors in $\mathbb{R}^3$, their linear combinations fill out a 2D plane.
> The term "linear" signifies that we only use first-power scaling and addition—no multiplying vectors by each other or applying non-linear functions.

### 2. The Span of a Set

::: info Definition
Let $S$ be a nonempty subset of a vector space $\mathsf{V}$.
The **span** of $S$, denoted by $\text{span}(S)$, is the set of all linear combinations of the vectors in $S$.
For convenience, we define $\text{span}(\varnothing) = \{\mathbf{0}\}$.
:::

::: info Theorem 1.5
The span of any subset $S$ of a vector space $\mathsf{V}$ is a **subspace** of $\mathsf{V}$.
Moreover, any subspace of $\mathsf{V}$ that contains $S$ must also contain the span of $S$.
:::

> The span represents the "reach" of a set $S$. While $S$ itself might just be a collection of isolated arrows, $\text{span}(S)$ "fills in the gaps" to form a complete, stable subspace. It is the "smallest" subspace because it contains only what is absolutely necessary to satisfy the closure axioms of a vector space.

### 3. Generating Sets

::: info Definition
A subset $S$ of a vector space $\mathsf{V}$ **generates** (or **spans**) $\mathsf{V}$ if $\text{span}(S) = \mathsf{V}$.
In this case, we also say that the vectors in $S$ generate, or span, $\mathsf{V}$.
:::

> If $S$ generates $\mathsf{V}$, it means every single vector in the entire space $\mathsf{V}$ can be expressed as some linear combination of the vectors in $S$.
> This is a powerful idea: when such a generating set can be chosen to be finite, it allows us to describe the entire space using only finitely many "building blocks."

## 1.5 Linear Dependence and Linear Independence

Suppose that $\mathsf{V}$ is a vector space over an infinite field and that $\mathsf{W}$ is a subspace of $\mathsf{V}$.
Unless $\mathsf{W}$ is the zero subspace, $\mathsf{W}$ is an infinite set.
It is desirable to find a "small" finite subset $S$ of $\mathsf{W}$ that generates $\mathsf{W}$ because we can then describe each vector in $\mathsf{W}$ as a linear combination of the finite number of vectors in $S$.

### Linear Dependence

A subset $S$ of a vector space $\mathsf{V}$ is called **linearly dependent** if there exist a finite number of distinct vectors $u_1, u_2, \dots, u_n$ in $S$ and scalars $a_1, a_2, \dots, a_n$ in $F$, **not all zero**, such that:

$$
a_{1}u_{1} + a_{2}u_{2} + \dots + a_{n}u_{n} = \mathbf{0}
$$

For any vectors $u_1, u_2, \dots, u_n$, we have $a_{1}u_{1} + a_{2}u_{2} + \dots + a_{n}u_{n} = \mathbf{0}$ if $a_1 = a_2 = \dots = a_n = 0$.
This is called the **trivial representation** of $\mathbf{0}$ as a linear combination of $u_1, u_2, \dots, u_n$.

If a set is linearly dependent, it means there is a "non-trivial" way to combine the vectors to get the zero vector.

Consequently, any subset of a vector space that contains the zero vector is automatically linearly dependent, because $1 \cdot \mathbf{0} = \mathbf{0}$ is a non-trivial representation of zero.

### Linear Independence

A subset $S$ of a vector space $\mathsf{V}$ that is not linearly dependent is called **linearly independent**.
In other words, for any finite number of distinct vectors $u_1, u_2, \dots, u_n$ in $S$, the only way to satisfy the equation $\sum a_{i}u_{i} = \mathbf{0}$ is the **trivial representation**:

$$
a_1 = a_2 = \dots = a_n = 0
$$

- The empty set is linearly independent, for linearly dependent sets must be nonempty.
- A set consisting of a single nonzero vector is linearly independent.
  For if $\{u\}$ is linearly dependent, then $au = \mathbf{0}$ for some nonzero scalar $a$.
  Thus

  $$
  u = a^{-1}(au) = a^{-1}\mathbf{0} = \mathbf{0}
  $$

- A set is linearly independent if and only if the only representation of $\mathbf{0}$ as linear combinations of its vectors are trivial representations.

### Key Theorems

::: info Theorem 1.6
Let $\mathsf{V}$ be a vector space, and let $S_1 \subseteq S_2 \subseteq \mathsf{V}$. If $S_1$ is linearly dependent, then $S_2$ is linearly dependent.
:::

::: info Corollary
Let $\mathsf{V}$ be a vector space, and let $S_1 \subseteq S_2 \subseteq \mathsf{V}$. If $S_2$ is linearly independent, then $S_1$ is linearly independent.
:::

::: info Theorem 1.7
Let $S$ be a linearly independent subset of $\mathsf{V}$, and let $v$ be a vector in $\mathsf{V}$ that is not in $S$.
Then $S \cup \{v\}$ is linearly dependent **if and only if** $v \in \text{span}(S)$.
:::

> Theorem 1.7 provides a practical rule: if you want to keep a set independent while adding a new vector $v$, you must make sure $v$ is _not_ already reachable by the vectors you already have (i.e., $v \notin \text{span}(S)$).

## 1.6 Bases and Dimension

This section introduces the concept of a basis, which serves as a coordinate system for a vector space.
We also define the "size" of a vector space, known as its dimension.

### Definition of a Basis

::: info Definition
A **basis** $\beta$ for a vector space $\mathsf{V}$ is a **linearly independent** subset of $\mathsf{V}$ that generates $\mathsf{V}$ (i.e., $\text{span}(\beta) = \mathsf{V}$).
If $\beta$ is a basis for $\mathsf{V}$, we also say that the vectors of $\beta$ **form a basis** for $\mathsf{V}$.
:::

> A basis is a "Goldilocks" set. It has enough vectors to reach everywhere in the space (spanning), but not so many that any of them are redundant (linearly independent).

- $\varnothing$ is a basis of $\{\mathbf{0}\}$ since $\text{span}(\varnothing) = \{\mathbf{0}\}$ and $\varnothing$ is linearly independent.
- The standard basis of $\mathsf{F}^n$ is $\{e_1, e_2, \dots, e_n\}$, where $e_1 = (1, 0, 0, \dots, 0), e_2 = (0, 1, 0, \dots, 0), \dots, e_n = (0, 0, 0, \dots, 1)$.
- The basis of $M_{m \times n}(F)$ is $\{E_{ij}: 1 \le i \le m, 1 \le j \le n\}$, where $E_{ij}$ is the matrix with a 1 in the $(i,j)$ position and 0 elsewhere.
- For $\mathsf{P}_n(F)$, ${\{1, x, x^2, \dots, x^n\}}$ is the standard basis.
- For $\mathsf{P}(F)$, $\{1, x, x^2, \dots\}$ is a basis.

### Unique Representation

::: info Theorem 1.8
Let $\mathsf{V}$ be a vector space and $u_1, u_2, \dots, u_n$ be distinct vectors in $\mathsf{V}$.
Then $\beta = \{u_1, u_2, \dots, u_n\}$ is a basis for $\mathsf{V}$ if and only if each $v \in \mathsf{V}$ can be **uniquely** expressed as a linear combination of vectors in $\beta$, that is, in the form:

$$
v = a_1u_1 + a_2u_2 + \dots + a_nu_n
$$

for unique scalars $a_1, a_2, \dots, a_n$.
:::

### Finite Spanning Set for $\mathsf{V}$ Can be Reduced to a Basis for $\mathsf{V}$

::: info Theorem 1.9
If a vector space $\mathsf{V}$ is generated by a finite set $S$, then some subset of $S$ is a basis for $\mathsf{V}$.
Hence $\mathsf{V}$ has a finite basis.
:::

### The Replacement Theorem

This is the most significant theoretical result in this section.

::: info Theorem 1.10
Let $\mathsf{V}$ be a vector space that is generated by a set $G$ containing exactly $n$ vectors, and let $L$ be a linearly independent subset of $\mathsf{V}$ containing exactly $m$ vectors.
Then $m \le n$ and there exists a subset $H$ of $G$ containing exactly $n - m$ vectors such that $L \cup H$ generates $\mathsf{V}$.
:::

> This theorem implies that the "span" capacity sets an upper limit on how many independent directions you can have.
> You cannot find more "independent directions" than the number of "building blocks" you used to build the space.

::: info Corollary 1
Let $\mathsf{V}$ be a vector space having a finite basis.
Then all bases for $\mathsf{V}$ are finite, and every basis for $\mathsf{V}$ contains the same number of vectors.
:::

### Dimension of a Vector Space

::: info Definition

- **Finite-Dimensional:** A vector space is called finite-dimensional if it has a basis consisting of a finite number of vectors.
- **Infinite-Dimensional:** A vector space that is not finite-dimensional is called infinite-dimensional.
- **Dimension:** The unique number of vectors in each basis for $\mathsf{V}$ is called the **dimension** of $\mathsf{V}$ and is denoted by $\text{dim}(\mathsf{V})$.
- **The Zero Space:** By convention, $\text{dim}(\{0\}) = 0$ (the basis is the empty set $\varnothing$).

:::

> If $\mathsf{V}$ is a finite-dimensional vector space, then no linearly independent subset of $\mathsf{V}$ can contain more than $\text{dim}(\mathsf{V})$ vectors.

::: info Corollary 2
Let $\mathsf{V}$ be a vector space with $\text{dim}(\mathsf{V}) = n$:

1. Any finite generating set for $\mathsf{V}$ must contain at least $n$ vectors. If it has exactly $n$ vectors, it is a basis.
2. Any linearly independent subset of $\mathsf{V}$ that contains exactly $n$ vectors is a basis for $\mathsf{V}$.
3. Every linearly independent subset of $\mathsf{V}$ can be **extended** to a basis for $\mathsf{V}$.
   That is, if $L$ is a linearly independent subset of $\mathsf{V}$, then there is a basis $\beta$ of $\mathsf{V}$ such that $L \subseteq \beta$.

:::

We can summarize the main results of these definitions, theorems, and corollaries:

- A basis for a vector space $\mathsf{V}$ is a linearly independent subset of $\mathsf{V}$ that generates $\mathsf{V}$.
- If $\mathsf{V}$ has a finite basis, then every basis for $\mathsf{V}$ contains the same number of vectors.
  This number $n$ is called the dimension of $\mathsf{V}$, and $\mathsf{V}$ is said to be finite-dimensional,
- Every linearly independent subset of $\mathsf{V}$ contains no more than $n$ vectors and can be extended to a basis for $\mathsf{V}$ by including appropriately chosen vectors.
- Each generating set of $\mathsf{V}$ contains at least $n$ vectors and can be reduced to a basis for $\mathsf{V}$ by excluding appropriately chosen vectors.

### The Dimension of Subspaces

::: info Theorem 1.11
Let $\mathsf{W}$ be a subspace of a finite-dimensional vector space $\mathsf{V}$.
Then $\mathsf{W}$ is finite-dimensional and $\text{dim}(\mathsf{W}) \leq \text{dim}(\mathsf{V})$.
Moreover, if $\text{dim}(\mathsf{W}) = \text{dim}(\mathsf{V})$, then $\mathsf{V} = \mathsf{W}$.
:::

::: info Corollary
If $\mathsf{W}$ is a subspace of a finite-dimensional vector space $\mathsf{V}$, then any basis for $\mathsf{W}$ can be extended to a basis for $\mathsf{V}$.
:::

> A "room" (subspace) cannot have more dimensions than the "building" (vector space) it is inside of.
> If the room is just as large as the building in terms of dimensions, then the room _is_ the building.

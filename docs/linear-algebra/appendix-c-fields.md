# Fields

## Definition

::: info Definition
A field $F$ is a set on which 2 operations $+$ and $\cdot$ (**addition** and **multiplication**) are defined so that,
for each pair of elements $x, y$ in $F$, there are unique elements in $F$ denoted by $x + y$ and $x \cdot y$,
and such that the following conditions hold for all elements $a, b, c \in F$:

- (F 1) Commutativity of addition and multiplication: $a + b = b + a$ and $a \cdot b = b \cdot a$
- (F 2) Associativity of addition and multiplication: $(a + b) + c = a + (b + c)$ and $(a \cdot b) \cdot c = a \cdot (b \cdot c)$
- (F 3) Existence of additive and multiplicative identities: There exist distinct elements $0$ and $1$ in $F$ such that $0 + a = a$ and $1 \cdot a = a$ for all $a \in F$.
- (F 4) Existence of additive and multiplicative inverses: For each element $a$ in $F$ and each nonzero element $b$ in $F$, there exist elements $c$ and $d$ in $F$ such that $a + c = 0$ and $b \cdot d = 1$.
- (F 5) Distributivity of multiplication over addition: $a \cdot (b + c) = a \cdot b + a \cdot c$

:::

The elements $x + y$ and $x \cdot y$ are called the **sum** and **product**, respectively, of $x$ and $y$.
The element $0$ and $1$ mentioned in (F 3) are called **identity elements** for addition and multiplication, respectively.
And the elements $c$ and $d$ referred to in (F 4) are called an **additive inverse** and **multiplicative inverse**, respectively.

## Cancellation Laws and Additive / Multiplicative Inverses

::: info Theorem C.1 Cancellation Laws
For arbitrary elements $a$, $b$, and $c$ in a field $F$:

1. If $a + b = a + c$, then $b = c$.
2. If $a \cdot b = c \cdot b$ and $b \neq 0$, then $a = c$.

:::

::: info Corollary
The elements $0$ and $1$ mentioned in (F 3), and the elements $c$ and $d$ mentioned in (F 4), are unique.
:::

The additive inverse and the multiplicative inverse of $b$ are denoted by $-b$ and $b^{-1}$, respectively.
Note that $-(-b) = b$ and $(b^{-1})^{-1} = b$.

## Subtraction and Division

Subtraction and division can be defined in terms of addition and multiplication by using the additive and multiplicative inverses.
Specifically, subtraction of $b$ is defined to be addition of $-b$ and division by $b \neq 0$ is defined to be multiplication by $b^{-1}$.

$$
a - b = a + (-b) \quad \text{and} \quad \frac{a}{b} = a \cdot b^{-1} \quad (b \neq 0)
$$

## ???

::: info Theorem C.2
Let $a$ and $b$ be arbitrary elements of a field. Then each of the following statements is true.
(a) $a \cdot 0 = 0 \cdot a = 0$
(b) $a \cdot (-b) = (-a) \cdot b = -(a \cdot b)$
(c) $(-a) \cdot (-b) = a \cdot b$
:::

::: info Corollary
The additive identity of a field has no multiplicative inverse.
:::

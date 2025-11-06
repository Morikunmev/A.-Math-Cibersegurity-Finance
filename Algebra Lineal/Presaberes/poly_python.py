import sympy
x = sympy.symbols('x')
p = sympy.poly(x**3)
print(p)

# Salida esperada: Poly(x**3, x, domain='ZZ')

q = sympy.poly(x**2 + 2*x + 1)
print(q)

# Salida esperada: Poly(x**2 + 2*x + 1, x, domain='ZZ')


## Otra forma de crear polinomios es mediante la libreria numpy
import numpy as np
p_np = np.poly1d([1,2,1])
print("primer numpy", p_np)

s = np.poly1d([1,2,3,4,5])
print("segundo numpy", s)

# para comprobar si dos polinomios son iguales
print("son iguales?", p == q)

# Para calcular el grado de un polinomio lo haremos utilizando Polynomial.degree()

print("Grado del polinomio p:", p.degree())
print("Grado del polinomio q:", q.degree())

# para el caso de numpy
print("Grado del polinomio p_np:", p_np.order)
print("Grado del polinomio s:", s.order)

#las operaciones basicas entre polinomios, se llevan a cabo del siguiente modo:
print("Suma de p y q:", p + q)
print("Resta de p y q:", p - q)
print("Producto de p y q:", p * q)
print("Cociente de p y q:", p // q)
print("Resto de p y q:", p % q)

# para el caso de numpy
print("Suma de p_np y s:", p_np + s)
print("Resta de p_np y s:", p_np - s)
print("Producto de p_np y s:", p_np * s)
print("Cociente de p_np y s:", np.polydiv(p_np, s)[0])
print("Resto de p_np y s:", np.polydiv(p_np, s)[1])

# Polynomail.r
print("Polinomiual r :")
r = np.poly1d([1,2,1])
s = np.poly1d([1,2,3,4,5])
print("Polinomio r :", r.r)
print("Polinomio s :", s.r)
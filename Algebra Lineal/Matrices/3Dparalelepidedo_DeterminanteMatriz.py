import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from mpl_toolkits.mplot3d.art3d import Poly3DCollection

# Definir los vectores (columnas de la matriz)
v1 = np.array([2, 0, 0])  # Vector en eje X
v2 = np.array([0, 3, 0])  # Vector en eje Y
v3 = np.array([0, 0, 4])  # Vector en eje Z

# Calcular el determinante
A = np.column_stack([v1, v2, v3])
det = np.linalg.det(A)

# Crear figura 3D
fig = plt.figure(figsize=(12, 10))
ax = fig.add_subplot(111, projection='3d')

# Origen
origen = np.array([0, 0, 0])

# Dibujar los vectores principales desde el origen
ax.quiver(0, 0, 0, v1[0], v1[1], v1[2], 
          color='red', arrow_length_ratio=0.1, linewidth=3, label='v₁ = (2,0,0)')
ax.quiver(0, 0, 0, v2[0], v2[1], v2[2], 
          color='green', arrow_length_ratio=0.1, linewidth=3, label='v₂ = (0,3,0)')
ax.quiver(0, 0, 0, v3[0], v3[1], v3[2], 
          color='blue', arrow_length_ratio=0.1, linewidth=3, label='v₃ = (0,0,4)')

# Definir los 8 vértices del paralelepípedo
vertices = np.array([
    origen,           # 0: (0,0,0)
    v1,               # 1: (2,0,0)
    v2,               # 2: (0,3,0)
    v3,               # 3: (0,0,4)
    v1 + v2,          # 4: (2,3,0)
    v1 + v3,          # 5: (2,0,4)
    v2 + v3,          # 6: (0,3,4)
    v1 + v2 + v3      # 7: (2,3,4)
])

# Definir las 6 caras del paralelepípedo
caras = [
    [vertices[0], vertices[1], vertices[4], vertices[2]],  # Cara inferior
    [vertices[3], vertices[5], vertices[7], vertices[6]],  # Cara superior
    [vertices[0], vertices[1], vertices[5], vertices[3]],  # Cara frontal
    [vertices[2], vertices[4], vertices[7], vertices[6]],  # Cara trasera
    [vertices[0], vertices[2], vertices[6], vertices[3]],  # Cara izquierda
    [vertices[1], vertices[4], vertices[7], vertices[5]]   # Cara derecha
]

# Crear colección de polígonos 3D
poly3d = Poly3DCollection(caras, alpha=0.25, facecolor='cyan', 
                          edgecolor='black', linewidths=1.5)
ax.add_collection3d(poly3d)

# Dibujar los vértices
ax.scatter(vertices[:, 0], vertices[:, 1], vertices[:, 2], 
           color='black', s=50, alpha=0.6)

# Etiquetar algunos vértices clave
ax.text(0, 0, 0, '  Origen (0,0,0)', fontsize=9)
ax.text(v1[0], v1[1], v1[2], '  v₁', fontsize=9, color='red')
ax.text(v2[0], v2[1], v2[2], '  v₂', fontsize=9, color='green')
ax.text(v3[0], v3[1], v3[2], '  v₃', fontsize=9, color='blue')
ax.text(vertices[7][0], vertices[7][1], vertices[7][2], 
        '  v₁+v₂+v₃', fontsize=9)

# Configurar ejes
ax.set_xlabel('X', fontsize=12)
ax.set_ylabel('Y', fontsize=12)
ax.set_zlabel('Z', fontsize=12)

# Título con el determinante
ax.set_title(f'Paralelepípedo en 3D\n' + 
             f'Determinante = Volumen = {det:.1f} unidades cúbicas',
             fontsize=14, fontweight='bold')

# Leyenda
ax.legend(loc='upper left', fontsize=10)

# Ajustar límites para mejor visualización
ax.set_xlim([0, 3])
ax.set_ylim([0, 4])
ax.set_zlim([0, 5])

# Mejorar la vista
ax.view_init(elev=20, azim=45)

# Añadir grid
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print(f"\nMatriz A:")
print(A)
print(f"\nDeterminante = {det}")
print(f"Volumen del paralelepípedo = {det} unidades cúbicas")
print(f"\nVerificación: 2 × 3 × 4 = {2*3*4}")
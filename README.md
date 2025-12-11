# 🛒 Tienda de Ropa – Simulador Interactivo

Proyecto final del curso de JavaScript. 

----------

## 📌 Funcionalidades principales

### ✔ Listado dinámico de productos
- Los productos no están en el HTML.
- Se cargan desde un archivo **JSON externo** usando `fetch`.
- Se muestran en pantalla mediante **DOM + Template Strings**.

### ✔ Carrito de compras
- Agregar productos al carrito.
- Aumentar cantidades automáticamente.
- Eliminar productos individualmente.
- Vaciar el carrito completo.
- Mostrar el total con descuento si supera $20.000.
- Carrito persistente mediante **localStorage**.

### ✔ Búsqueda y ordenamiento
- Buscador por nombre.
- Ordenamiento por precio y por orden alfabético.

### ✔ Finalizar compra
- Formulario simple (nombre, correo, método de pago).
- Validaciones básicas.
- Mensaje de confirmación con **SweetAlert2**.
- Registro del total y los productos adquiridos.
- Limpieza del carrito luego de confirmar compra.

### ✔ Historial de compras
- Guardado de compras en **localStorage**.
- Cada compra incluye:
  - Fecha
  - Productos y cantidades
  - Total
- Listado dinámico en una página aparte (`pages/historial.html`).
- Manejo de errores con `try/catch`.

----------


 📁 Estructura del proyecto
  │── index.html
  │── README.md
  │
  ├── 📁 css
  │   └── style.css
  │
  ├── 📁 js
  │   ├── main.js
  │   ├── compra.js
  │   └── historial.js
  │
  ├── 📁 data
  │   └── productos.json
  │
  └── 📁 pages
      ├── compra.html
      └── historial.html








const productos = [
    { id: 1, nombre: "remera", precio: 5000 },
    { id: 2, nombre: "pantalon", precio: 8000 },
    { id: 3, nombre: "campera", precio: 15000 },
    { id: 4, nombre: "zapatillas", precio: 25000 },
    { id: 5, nombre: "gorra", precio: 4000 }
];


const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos-container");

    for (const producto of productos) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button id="btn${producto.id}">Agregar al carrito</button>
        `;

        contenedor.appendChild(card);


        const boton = document.getElementById(`btn${producto.id}`);
        boton.addEventListener("click", () => agregarAlCarrito(producto));
    }
}

mostrarProductos(productos);

function agregarAlCarrito(producto) {
    // Buscar si el producto ya está en el carrito
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) {
        // Si existe, sumamos la cantidad
        existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
        // Si no existe, lo agregamos con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    mostrarCarrito();
}

function mostrarCarrito(productos) {
    const lista = document.getElementById("carrito-lista");
    const totalTexto = document.getElementById("carrito-total");
    lista.innerHTML = "";
    let total = 0;
    for (const item of carrito) {
        const subtotal = item.precio * item.cantidad;
        const linea = document.createElement("div");
        linea.classList.add("carrito-item");
        linea.innerHTML = `
            <span>${item.nombre} x${item.cantidad} — $${subtotal}</span>
            <button class="eliminar-btn" data-id="${item.id}">X</button>
        `;
        lista.appendChild(linea);
        total += subtotal;
    }
    const botonesEliminar = document.querySelectorAll(".eliminar-btn");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function () {
            const id = parseInt(this.dataset.id);
            eliminarDelCarrito(id);
        });
    });
    if (total >= 20000) {
        total *= 0.9;
    }
    totalTexto.innerText = `Total: $${total}`;
}
function eliminarDelCarrito(id) {
    const item = carrito.find(producto => producto.id === id);
    if (item) {
        if (item.cantidad > 1) {
            item.cantidad--;
        } else {
            const index = carrito.findIndex(producto => producto.id === id);
            carrito.splice(index, 1);
        }
        guardarCarrito();
        mostrarCarrito();
    }
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



const btnVaciar = document.getElementById("vaciar-carrito");
btnVaciar.addEventListener("click", function () {
    carrito.length = 0; 
    guardarCarrito();
    mostrarCarrito();
});


if (carrito.length > 0) {
    mostrarCarrito();
}

let productos = [];

// ===============================
// CARGA DE PRODUCTOS DESDE JSON
// ===============================
fetch("./data/productos.json")
    .then(response => {
        if (!response.ok) throw new Error("Error al cargar productos");
        return response.json();
    })
    .then(data => {
        productos = data;
        mostrarProductos(productos);
    })
    .catch(error => {
        console.error(error);

        // ❗ Reemplazo del alert() por SweetAlert2
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al cargar los productos."
        });
    });

// ===============================
// CARRITO INICIAL
// ===============================
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
for (const item of carrito) {
    if (typeof item.cantidad !== 'number') item.cantidad = 1;
}

// ===============================
// MOSTRAR PRODUCTOS
// ===============================
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
        if (boton) boton.addEventListener("click", () => agregarAlCarrito(producto));
    }
}

// ===============================
// BUSCADOR Y ORDENADOR
// ===============================
const buscador = document.getElementById("buscador");
const ordenar = document.getElementById("ordenar");

if (ordenar) {
    ordenar.addEventListener("change", function () {
        let productosOrdenados = [...productos];

        switch (this.value) {
            case "precio-asc":
                productosOrdenados.sort((a, b) => a.precio - b.precio);
                break;
            case "precio-desc":
                productosOrdenados.sort((a, b) => b.precio - a.precio);
                break;
            case "nombre-asc":
                productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case "nombre-desc":
                productosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            default:
                productosOrdenados = [...productos];
        }

        document.getElementById("productos-container").innerHTML = "";
        mostrarProductos(productosOrdenados);
    });
}

if (buscador) {
    buscador.addEventListener("input", function () {
        const texto = this.value.toLowerCase();

        const filtrados = productos.filter(prod =>
            prod.nombre.toLowerCase().includes(texto)
        );

        document.getElementById("productos-container").innerHTML = "";
        mostrarProductos(filtrados);
    });
}

// ===============================
// AGREGAR AL CARRITO
// ===============================
function agregarAlCarrito(producto) {
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
        existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    mostrarCarrito();

    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `${producto.nombre} agregado`,
        showConfirmButton: false,
        timer: 1000,
        width: "250px"
    });

}


function mostrarCarrito() {
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

if (btnVaciar) {
    btnVaciar.addEventListener("click", function () {

        Swal.fire({
            title: "¿Vaciar carrito?",
            text: "Esto eliminará todos los productos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "Cancelar"
        }).then(result => {
            if (result.isConfirmed) {
                carrito.length = 0;
                guardarCarrito();
                mostrarCarrito();

                Swal.fire({
                    icon: "success",
                    title: "Carrito vacío",
                    timer: 1000,
                    showConfirmButton: false
                });
            }
        });

    });
}


if (carrito.length > 0) {
    mostrarCarrito();
}


const btnFinalizar = document.getElementById("finalizar-compra");

if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
        window.location.href = "./pages/compra.html";
    });
}


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
    carrito.push(producto);
    guardarCarrito();
    mostrarCarrito();
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function mostrarCarrito() {
    const lista = document.getElementById("carrito-lista");
    const totalTexto = document.getElementById("carrito-total");

    lista.innerHTML = "";

    let total = 0;

    for (const item of carrito) {
        const linea = document.createElement("p");
        linea.innerText = `${item.nombre} - $${item.precio}`;
        lista.appendChild(linea);
        total += item.precio;
    }


    if (total >= 20000) {
        total *= 0.9;
    }

    totalTexto.innerText = `Total: $${total}`;
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

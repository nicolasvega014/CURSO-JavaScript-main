
const historialContainer = document.getElementById("historial-container");

let historial = JSON.parse(localStorage.getItem("historialCompras")) || [];

if (historial.length === 0) {
    historialContainer.innerHTML = `
        <p style="text-align:center; font-size:1.2rem;">
            Todavía no realizaste ninguna compra.
        </p>
    `;
} else {

    historial.forEach((compra, index) => {
        const box = document.createElement("div");
        box.classList.add("checkout-box");

        let listaProductos = compra.productos
            .map(item => `${item.nombre} x${item.cantidad}`)
            .join("<br>");

        box.innerHTML = `
            <h2>Compra #${index + 1}</h2>
            <p><strong>Fecha:</strong> ${compra.fecha}</p>
            <p><strong>Total:</strong> $${compra.total}</p>
            <p><strong>Productos:</strong><br>${listaProductos}</p>
        `;

        historialContainer.appendChild(box);
    });
}


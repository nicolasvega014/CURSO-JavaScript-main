function cargarHistorial() {
    try {
        const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];

        const contenedor = document.getElementById("historial-container");

        if (!contenedor) {
            throw new Error("No se encontró el contenedor del historial");
        }

        if (historial.length === 0) {
            contenedor.innerHTML = `
                <p class="sin-historial">No tienes compras registradas.</p>
            `;
            return;
        }

        historial.forEach((compra, index) => {
            const div = document.createElement("div");
            div.classList.add("compra-item");

            div.innerHTML = `
                <h3>Compra #${index + 1}</h3>
                <p><strong>Fecha:</strong> ${compra.fecha}</p>
                <p><strong>Total:</strong> $${compra.total}</p>
                <p><strong>Productos:</strong></p>
                <ul>
                    ${compra.productos
                        .map(p => `<li>${p.nombre} x${p.cantidad}</li>`)
                        .join("")}
                </ul>
            `;

            contenedor.appendChild(div);
        });

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error al cargar historial",
            text: "Ocurrió un problema al mostrar tus compras.",
            confirmButtonText: "Aceptar"
        });
    }
}

cargarHistorial();



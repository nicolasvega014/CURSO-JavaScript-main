const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


if (carrito.length === 0) {
    Swal.fire({
        icon: "warning",
        title: "El carrito está vacío",
        text: "No puedes finalizar una compra sin productos.",
        confirmButtonText: "Volver"
    }).then(() => {
        window.location.href = "../index.html";
    });
}
const form = document.getElementById("form-compra");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

        if (carrito.length === 0) {
            throw new Error("Carrito vacío");
        }


        await new Promise(res => setTimeout(res, 500));

        Swal.fire({
            icon: "success",
            title: "¡Compra realizada!",
            text: "Gracias por tu compra. Te enviamos un correo con los detalles.",
            confirmButtonText: "Aceptar"
        }).then(() => {


            let historial = JSON.parse(localStorage.getItem("historialCompras")) || [];

            historial.push({
                productos: carrito,
                fecha: new Date().toLocaleString(),
                total: carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
            });

            localStorage.setItem("historialCompras", JSON.stringify(historial));


            localStorage.removeItem("carrito");


            window.location.href = "../index.html";
        });

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Hubo un problema",
            text: "No pudimos procesar la compra. Por favor intenta nuevamente.",
            confirmButtonText: "Aceptar"
        });
    }
});

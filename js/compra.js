
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

form.addEventListener("submit", (e) => {
    e.preventDefault();

    Swal.fire({
        icon: "success",
        title: "¡Compra realizada!",
        text: "Gracias por tu compra. Te enviamos un correo con los detalles.",
        confirmButtonText: "Aceptar"
    }).then(() => {

        localStorage.removeItem("carrito");

        window.location.href = "../index.html";
    });
});

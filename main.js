

const productos = [
  { nombre: "remera", precio: 5000 },
  { nombre: "pantalon", precio: 8000 },
  { nombre: "campera", precio: 15000 },
  { nombre: "zapatillas", precio: 25000 },
  { nombre: "gorra", precio: 4000 }
];
 const carrito = [];

let eleccion = prompt("Ingresa el producto que queres comprar o 'salir' para terminar");

while (eleccion !== "salir") {
        let encontrado = false; 
    for (let producto of productos) {
        if (eleccion === producto.nombre) {
            carrito.push(producto);
            alert("Se agregó " + producto.nombre + " correctamente");
            encontrado = true; 
            break;
        }
    }

    if (!encontrado) {
        alert("Producto no encontrado");
    }

    eleccion = prompt("Ingresa el producto que queres comprar o 'salir' para terminar");
}
function calcularTotal (carrito) {
   let total = 0;

     for (let producto of carrito) {
       total+= producto.precio;
        };

      if(total >=20000){
      total*=0.9;}; //Aplica un descuento del 10%

      return (total);
 }


let totalAPagar = calcularTotal(carrito);


alert("El total a pagar es: $" + totalAPagar);

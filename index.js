// Capturamos los argumentos ingresados en la terminal.
// Los dos primeros elementos de process.argv son siempre "node" e "index.js", 
// por eso los salteamos con las dos comas al inicio del destructuring.
// - method: el método HTTP (GET, POST, DELETE)
// - endpoint: el recurso con o sin ID (ej: "products" o "products/7")
// - args: el resto de los argumentos (título, precio, categoría para el POST)
const [,, method, endpoint, ...args] = process.argv;

// Separamos el endpoint en dos partes usando split("/").
// Por ejemplo "products/7" se convierte en ["products", "7"].
// Si no hay barra, id queda undefined.
const [resource, id] = (endpoint || "").split("/");

// Evaluamos el método ingresado y ejecutamos la acción correspondiente.
// Usamos toLowerCase() para aceptar GET, get o Get indistintamente.
// El "?" es optional chaining: evita un error si method es undefined.
switch (method?.toLowerCase()) {

    case "get":
        if (id) {
            // Si hay ID, consultamos un producto específico
            const r1 = await fetch(`https://fakestoreapi.com/products/${id}`);
            const d1 = await r1.json();
            console.log(d1);
        } else {
            // Si no hay ID, consultamos todos los productos
            const r2 = await fetch("https://fakestoreapi.com/products");
            const d2 = await r2.json();
            console.log(d2);
        }
        break;

    case "post":
        // Armamos el objeto con los datos recibidos por terminal.
        // price se mantiene como string porque así lo espera la API.
        const product = { title: args[0], price: args[1], category: args[2] };
        const r3 = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
        const d3 = await r3.json();
        console.log(d3);
        break;

    case "delete":
        // Validamos que se haya ingresado un ID antes de intentar eliminar
        if (!id) { console.log("Especifica un ID. Ejemplo: DELETE products/7"); break; }
        const r4 = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
        const d4 = await r4.json();
        console.log(d4);
        break;

    default:
        // Si el método no es ninguno de los anteriores, avisamos al usuario
        console.log("Comando no reconocido. Usa GET, POST o DELETE.");
}
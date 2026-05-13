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

// Función principal async que envuelve toda la lógica del programa.
// Usamos async/await para manejar las peticiones a la API de forma asíncrona.
const main = async () => {

    // try/catch para manejar errores de red o de la API.
    // Si algo falla (sin conexión, API caída, etc.), mostramos un mensaje claro.
    try {

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
            // Validamos que se hayan ingresado al menos tres argumentos:
            // title, price y category. Sin estos datos no podemos crear el producto.
            if (args.length < 3) {
                console.log("Faltan datos. Uso correcto: POST products :title :price :category");
                break;
            }
            // Extraemos categoría y precio de atrás para adelante usando pop(),
            // que elimina y devuelve el último elemento del array.
            // Esta estrategia permite que el título tenga múltiples palabras
            // sin romper el código. Por ejemplo: "Remera Negra de Algodón 300 remeras"
            // sería tomado como args = ["Remera", "Negra", "de", "Algodón", "300", "remeras"]
            const category = args.pop(); // último elemento: categoría (ej: "remeras")
            const price = args.pop();    // nuevo último elemento: precio (ej: "300")
            // Todo lo que quedó en args es el título. Lo unimos con espacios.
            const title = args.join(" "); // (ej: "Remera Negra de Algodón")
            // Armamos el objeto con los datos extraídos
            const product = { title: title, price: price, category: category };
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
                if (!id) {
                    console.log("Falta el ID. Uso correcto: DELETE products/:id");
                    break;
                }
                const r4 = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
                const d4 = await r4.json();
                console.log(d4);
                break;

            default:
                // Si el método no es ninguno de los anteriores, mostramos los comandos disponibles
                console.log(`Comando no reconocido. Los comandos disponibles son:

  GET products
  GET products/:id
  POST products :title :price :category
  DELETE products/:id`);
        }

    } catch (error) {
        // Capturamos cualquier error inesperado y mostramos un mensaje claro
        console.error("Ocurrió un error:", error.message);
    }
};

// Ejecutamos la función principal
main();
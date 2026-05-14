# Preentrega Back-End/Node-JS 

Herramienta de línea de comandos (CLI) desarrollada en Node.js que permite realizar peticiones HTTP a la FakeStore API. La gestión de los productos de una tienda en línea, se efectúa ejecutando comandos directamente desde la terminal.

## Requisitos

- Node.js instalado

## Instalación

npm install

## Uso

### Consultar todos los productos

npm run start GET products

### Consultar un producto específico

npm run start GET products/:id

### Crear un producto nuevo

npm run start POST products :title :price :category

El título puede contener múltiples palabras. El precio y la categoría siempre deben ser la última y anteúltima palabra respectivamente.

Ejemplo: npm run start POST products Remera Negra de Algodón 300 remeras

### Eliminar un producto

npm run start DELETE products/:id

## Validaciones

- POST: si no se ingresan los tres datos requeridos (title, price, category), el programa avisa con el uso correcto.
- DELETE: si no se ingresa un ID, el programa avisa con el uso correcto.
- Cualquier comando no reconocido muestra la lista de comandos disponibles.
- Los errores de red o de la API se capturan y muestran un mensaje claro.

## Tecnologías utilizadas

- Node.js
- ESModules
- Fetch API
- FakeStore API

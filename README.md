# Preentrega Node.js - Talento Tech

Herramienta de terminal para gestionar productos de una tienda en línea usando la API FakeStore.

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

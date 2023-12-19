//Instalamos prompt con npm install prompt-sync

// Creamos la constante e importamos prompt-sync
const prompt = require('prompt-sync')();
//Almacenamos en una variable lo que escribimos con prompt
let leerInformacion = prompt('Escribe algo:');
//Lo mostramos
console.log("Has escrito", leerInformacion);

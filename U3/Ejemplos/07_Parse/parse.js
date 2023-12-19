// Importamos prompt-Sync
const prompt = require('prompt-sync')();

let num1 = parseInt(prompt('Introuce un numero: '));
let num2 = parseInt(prompt('Introduce otro numero: '));

let suma = num1 + num2;
let resta = num1 - num2;
let mult = num1 * num2;
let div = num1 / num2;
let modulo = num1 % num2;
let exp = num1 ** num2;

console.log('Numero 1: ', num1);
console.log('Numero 2: ', num2);
console.log('Suma: ', suma);
console.log('Resta: ', resta);
console.log('Multiplicacion: ', mult);
console.log('Division: ', div);
console.log('Modulo: ', modulo);
console.log('Exponente: ',exp);
console.log('Raiz cuadrada de ', num1, ' es: ', Math.sqrt(num1));
console.log('Raiz cuadrada de ' + num2 + ' es: '+ Math.sqrt(num2));



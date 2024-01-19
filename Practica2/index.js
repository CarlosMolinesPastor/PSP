const http = require("http");
const mongoose = require('mongoose');
const url = require("url")

//Creamos el esquema de la base de datos
let marvelSchema = new mongoose.Schema({
    nombre: String,
    superpoder: String,
    debilidad: String,
    fuerza: Number
});
//Creamos el modelo de la coleccion de la base de datos
let Superheroe = mongoose.model('superheroes', marvelSchema);

// Función para buscar superheroes y generar la tabla HTML
// La función recibe un callback que se ejecuta cuando se han obtenido los superheroes
function buscarSuperheroes(callback) {
    //Creamos los datos de referencia de la base de datos
    let fila = '<table><tr><th>Nombre</th><th>Superpoder</th><th>Debilidad</th><th>Fuerza</th></tr>';
    // Buscamos todos los superheroes
    Superheroe.find({}, (err, superheroes) => {
        // Si se produce un error, llamamos al callback con el error
        if (err) {
            callback(err);
            return;
        }
        // Si no hay error, generamos la tabla HTML con los superheroes con un forEach
        superheroes.forEach(superheroe => {
            // Añadimos una fila por cada superheroe
            fila += `<tr><td>${superheroe.nombre}</td><td>${superheroe.superpoder}</td><td>${superheroe.debilidad}</td><td>${superheroe.fuerza}</td></tr>`;
        });
        // Cerramos la tabla
        fila += '</table>';
        callback(null, fila);
    });
}

//Declaramos el puerto, el localhost y el servidor
const port = 3000; 

const requestListener = function (request,response){
    let url_parts = url.parse(request.url, true);
    let superHeroe = url_parts.query.nombre;
    if (superHeroe != null){
        Superheroe.find({nombre: superHeroe}, (err,superheroes) =>{
            if(err || superheroes.length == 0){
            response.setHeader("Content-Type", "text/html");
            response.writeHead(500);
            response.write("<h1>Sin Resultados</h1>");
            response.end;
            return;
            }
            let superheroe = superheroes[0];
            let nombre = superheroe.nombre;
            let lista = `<p>Superpoder: ${superheroe.superpoder}</p><p>Debilidad: ${superheroe.debilidad}</p><p>Fuerza: ${superheroe.fuerza}</p>`;
                        response.setHeader("Content-Type", "text/html");
            response.writeHead(200);
            response.write(`<h1>Super Heroe: ${nombre}</h1>`);
            response.end(lista);
        });
    }else {
        buscarSuperheroes((err,lista) => {
        if (err){
            console.log(err);
            return;
        }
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        response.write("<h1>Super Heroes</h1>");
        response.end(lista);
    });
    }
}

const server = http.createServer(requestListener);
server.listen(port);
console.log('Server running at http://127.0.0.1:3000/');

mongoose.set('strictQuery', true);
// Conectamos a la base de datos por el puerto especificado.
mongoose.connect('mongodb://localhost:27017/Marvel');



/*
//###################### Creacion de los documentos y la coleccion ########################

//Anadimos los superheroes
let super1 = new Superheroe({
    nombre: "Spidermann",
    superpoder: "Escalar",
    debilidad: "Su Familia",
    fuerza: 6
});

super1.save().then(
    result => {
        console.log("Superheroe añadido", result);
    }
    ).catch(
    error => {
        console.log("Error", error);
    }
    );

let super2 = new Superheroe({
    nombre: "Batman",
    superpoder: "Tecnologia",
    debilidad: "Murcielagos",
    fuerza: 4
});

super2.save().then(
    result => {
        console.log("Superheroe añadido", result);
    }
    ).catch (
    error => {
        console.log("Error", error);
    })

let super3 = new Superheroe({
    nombre: "Flash",
    superpoder: "Velocidad",
    debilidad: "Comida",
    fuerza: 2
});

super3.save().then(
    result => {
        console.log("Superheroe Añadido", result);
    }
    ).catch(
    error => {
        console.log("Error", error);
    }
    );

let super4 = new Superheroe({
    nombre: "Superman",
    superpoder: "Super",
    debilidad: "kriptonita",
    fuerza: 9
});

super4.save().then(
    result =>{
        console.log("Superheroe añadido" + result);
    }
).catch(
    error => {
        console.log("Error", error);
    }
);
//################### Fin de los Documentos y la coleccion ########################
*/
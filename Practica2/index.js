const http = require("http");
const mongoose = require("mongoose");
const url = require("url");

//###################### Creacion de la base de datos ########################
//Creamos el esquema de la base de datos
let marvelSchema = new mongoose.Schema({
  nombre: String,
  superpoder: String,
  debilidad: String,
  fuerza: Number,
});
//Creamos el modelo de la coleccion de la base de datos
let Superheroe = mongoose.model("superheroes", marvelSchema);

//###################### Funciones ########################
// Funcion para buscar los superheroes en la base de datos
// Se declara una variable filtro que se inicializa vacia
function buscarSuperheroes(paramNombre, callback) {
  let filtro = {};
  //Si el parametro que le pasamos no es undefined o nulo, lo anadimos al filtro
  //Como objeto nombre
  if (paramNombre !== undefined) {
    filtro.nombre = paramNombre;
  }
  // Realizamos la busqueda en la base de datos
  Superheroe.find(filtro, (err, superheroes) => {
    if (err) {
      callback(err);
      return;
    }
    // Si se proporcionó un nombre y no se encontró ningún superhéroe, genera un error
    if (paramNombre !== undefined && superheroes.length === 0) {
      callback(err, "No se encontraron superheroes");
      return;
    }
    // Si se proporcionó un nombre y solo se encontró un superhéroe, genera HTML para un solo superhéroe
    // En todos los demás casos, genera HTML para varios superhéroes
    if (paramNombre !== undefined && superheroes.length > 0 ) {
      generarHTMLUnico(superheroes[0], callback);
    } else {
      generarHTMLTabla(superheroes, callback);
    }
  });
}
// Funcion para generar el HTML de la tabla
function generarHTMLTabla(superheroes, callback) {
  //Se crea una variable tablaHtml que se inicializa con la etiqueta de apertura de la tabla
  let tablaHtml =
    "<table><tr><th>Nombre</th><th>Superpoder</th><th>Debilidad</th><th>Fuerza</th></tr>";
  superheroes.forEach((superheroe) => {
    //Por cada superheroe que se encuentre en la base de datos, se anade una fila a la tabla
    tablaHtml += `<tr><td>${superheroe.nombre}</td><td>${superheroe.superpoder}</td><td>${superheroe.debilidad}</td><td>${superheroe.fuerza}</td></tr>`;
  });
  //Se cierra la tabla
  tablaHtml += "</table>";
  callback(null, tablaHtml);
}
// Funcion para generar el HTML de un solo superheroe
function generarHTMLUnico(superheroe, callback) {
  let unico = `<h1>Super Heroe: ${superheroe.nombre}</h1><p>Superpoder: ${superheroe.superpoder}</p><p>Debilidad: ${superheroe.debilidad}</p><p>Fuerza: ${superheroe.fuerza}</p>`;
  callback(null, unico);
}

//###################### Servidor ########################
const requestListener = function (request, response) {
  //Se declara una variable url_parts que se inicializa con la url que se le pasa
  let url_parts = url.parse(request.url, true);
  //Se declara una variable paramNombre que se inicializa con el nombre que se le pasa
  let paramNombre = url_parts.query.nombre;
  //Se llama a la funcion buscarSuperheroes con el parametro que le pasamos
  buscarSuperheroes(paramNombre, (err, html) => {
     //Si hay un error, se muestra un mensaje de error
    if (err) {
      console.log(err);
      response.setHeader("Content-Type", "text/html");
      response.writeHead(404);
      response.write("<h1>Error 404: Superheroe no encontrado</h1>");
      response.end();
      return;
    }
    //Si no hay error, se muestra el HTML que se ha generado
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(html);
  });
};

//Declaramos el puerto, el localhost y el servidor
const port = 3000;

//Creamos el servidor
const server = http.createServer(requestListener);

//Le decimos al servidor que escuche en el puerto que hemos declarado
server.listen(port);

//Mostramos un mensaje por consola
console.log("Server running at http://127.0.0.1:3000/");

//###################### Conexion a la base de datos ########################
// Evitamos los mensajes de error de deprecated #### Buscado en internet
mongoose.set("strictQuery", true);
// Conectamos a la base de datos por el puerto especificado.
mongoose.connect("mongodb://localhost:27017/Marvel");

////###################### Creacion de los documentos y la coleccion ########################
//
////Anadimos los superheroes
//let super1 = new Superheroe({
//    nombre: "Spidermann",
//    superpoder: "Escalar",
//    debilidad: "Su Familia",
//    fuerza: 6
//});
//
//super1.save().then(
//    result => {
//        console.log("Superheroe añadido", result);
//    }
//    ).catch(
//    error => {
//        console.log("Error", error);
//    }
//    );
//
//let super2 = new Superheroe({
//    nombre: "Batman",
//    superpoder: "Tecnologia",
//    debilidad: "Murcielagos",
//    fuerza: 4
//});
//
//super2.save().then(
//    result => {
//        console.log("Superheroe añadido", result);
//    }
//    ).catch (
//    error => {
//        console.log("Error", error);
//    })
//
//let super3 = new Superheroe({
//    nombre: "Flash",
//    superpoder: "Velocidad",
//    debilidad: "Comida",
//    fuerza: 2
//});
//
//super3.save().then(
//    result => {
//        console.log("Superheroe Añadido", result);
//    }
//    ).catch(
//    error => {
//        console.log("Error", error);
//    }
//    );
//
//let super4 = new Superheroe({
//    nombre: "Superman",
//    superpoder: "Super",
//    debilidad: "kriptonita",
//    fuerza: 9
//});
//
//super4.save().then(
//    result =>{
//        console.log("Superheroe añadido" + result);
//    }
//).catch(
//    error => {
//        console.log("Error", error);
//    }
//);
////################### Fin de los Documentos y la coleccion ########################
//


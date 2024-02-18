const express = require("express");
const mongoose = require("mongoose");
const url = require("url");
const Libros = require("./models/libros.js");

//Creamos la cnexión a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/biblioteca');

//Schema en modulo libros.js

//Creamos el servidor
let app = express();
//Le decimos a express que escuche en el puerto 8080
app.listen(8080, () => {
  console.log("Servidor iniciado en el puerto 8080");
});
//Le decimos a express que vamos a usar JSON
app.use(express.json());

//Creamos el endpoint para el método GET y le decimos que nos devuelva todos los libros
app.get("/libros", (req, res) => {
  //Buscamos todos los libros en la base de datos
  Libros.find({}).then((result) => {
    //Si encontramos libros, los devolvemos
    if (result) {
      res.send(result);
    } else {
      //Si no encontramos libros, devolvemos un error
      res.status(404).send({ message: 'Libros no encontrados' });
    }
  });
});

app.get("/libros/:id", (req, res) => {
  //Creamos una variable que nos guarde el id que nos llega en la petición
  let id = req.params.id;
  //Buscamos el libro en la base de datos con el id que nos llega en la petición
  Libros.findById(id).then((result) => {
    //Si el libro existe, lo devolvemos
    if (result) {
      res.send(result);
    } else {
      //Si el libro no existe, devolvemos un error
      res.status(404).send({ message: 'Libro no encontrado' });
    }
  });
});

//Creamos el endpoint para el método GET y le decimos que nos devuelva el libro con el id que le pasemos
app.get("/libros/:id", (req, res) => {
  res.send("Id Recibido: " + req.params.id);
});

// Creamos un endpoitn para el metodo GET y le decimos que nos devuelva el libro con el id que le pasemos
//app.get("/libros", (req, res) => {
//  var url_parts = url.parse(req.url, true);
//  res.send("Id recibido: " + url_parts.query.id);
//});

// // crearemos el endpoint para el método Post.
//app.post("/libros", (req, res) => {});

// Probar el endpoint en primer lugar mostraremos por consola la información que nos llegue
// en el body de la petición y, a continuación, mandaremos una respuesta vacía al cliente
// para que éste no quede a la espera.
app.post("/libros", (req, res) => {
  //Mostramos por consola la información que nos llega en el body de la petición para ver si hay errores
  console.log(req.body);
  //Insertamos el libro en la base de datos
  //Primero creamos un nuevo libro de la clase libros de nuestro modelo
  let libro = new Libros();
  //Le asignamos los valores que nos llegan en el body de la petición
  libro.titulo = req.body.titulo;
  libro.autor = req.body.autor;
  libro.ejemplares = req.body.ejemplares;
  //Guardamos el libro en la base de datos
  libro.save().
    //Si todo va bien, devolvemos el libro guardado en la base de datos tanto por consola como al cliente
    then((result) => {
      console.log("Libro guardado en la base de datos");
      res.status(200).send(result);
    }).
    catch((error) => {
      console.log("Error al guardar el libro en la base de datos");
      res.status(500).send({ message: 'Error al guardar el libro en la base de datos' });
    });
});

//Endpoint para el método delete
app.delete("/libros/:id", (req, res) => {
  //Creamos una variable que nos guarde el id que nos llega en la petición
  let id = req.params.id;
  //Buscamos el libro en la base de datos con el id que nos llega en la petición
  Libros.findByIdAndDelete(id).then((result) => {
    //Si el libro existe lo borramos y devolvemos un mensaje de éxito
    if (result) {
      res.status(200).send({ message: 'Libro Borrado' });
    }
    else {
      //Si el libro no existe, devolvemos un error
      res.status(404).send({ message: 'Libro no encontrado' });
    }
  });
});

//Endpoint para el método put
app.put("/libros/:id", (req, res) => {
  //Creamos una variable que nos guarde el id que nos llega en la petición
  let id = req.params.id;
  //Creamos una variable que nos guarde el cuerpo de la petición porque ahi estan los datos que queremos actualizar
  let update = req.body;
  //Buscamos el libro en la base de datos con el id que nos llega en la petición
  Libros.findByIdAndUpdate(id, update).then((result) => {
    //Si el libro existe lo actualizamos y devolvemos un mensaje de éxito
    if (result) {
      res.status(200).send({ message: 'Libro Actualizado' });
    }
    else {
      //Si el libro no existe, devolvemos un error
      res.status(404).send({ message: 'Libro no encontrado' });
    }
  });
});
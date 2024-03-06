const express = require("express");
const mongoose = require("mongoose");
const Producto = require("./models/supermercado.js");

//Creamos la cnexión a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/supermercado');

//Creamos el servidor
let app = express();
//Le decimos a express que escuche en el puerto 8080
app.listen(8080, () => {
  console.log("Servidor iniciado en el puerto 8080");
});
//Le decimos a express que vamos a usar JSON
app.use(express.json());

//Insertamos varios producto
// Producto.insertMany([
//     {
//         nombre: "Galleta",
//         precio: 2,
//         iva: 3,
//     },
//     {
//         nombre: "Champu",
//         precio: 7,
//         iva: 4
//     },
//     {
//         nombre: "Cola",
//         precio: 1,
//         iva: 5
//     }
// ]);
Producto.find().then(result => console.log(result));

//A. Insertar un articulo 
app.post("/producto", (req, res) => {
  //Creamos un nuevo articulo  con los datos que nos pasan por el body
  const producto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    iva: req.body.iva,
  });
  //Guardamos el Articulo en la base de datos y lo devolvemos en formato JSON si no devolvemos un mensaje de error
  producto.save().then(result => {
    if (result) {
      res.json(result);
    } else {
      res.status(400).send({ message: 'Error al guardar el Producto' });
    }
  });
});

//B. Obtener todos los productos 
app.get("/producto", (req, res) => {
  //Buscamos todos los productos y los devolvemos en formato JSON
  Producto.find().then(result => {
    res.json(result);
  });
});

//C. A traves de query introducidr los articulos con precio supero a x y iva inferior a i
app.get("/producto/search", (req, res) => {
  let precio = req.query.precio;
  let iva = req.query.iva
  //Buscamos todos los productos y los devolvemos en formato JSON
  Producto.find({ $or: [{ precio: { $gt: precio } }, { iva: { $lt: iva } }] }).then(result => {
    res.json(result);
  });
});

// D Dado el idntificaor de un articulo devolvera en formato Json el precio del articulo aplicandole el IVA
app.get("/producto/:id", (req, res) => {
  let precioIva;
  let id = req.params.id;
  Producto.findById(id).then(result => {
    //Calculamos el precio con el IVA
    precioIva = result.precio + (result.precio * result.iva / 100);
    //Devolvemos el precio con el IVA en formato JSON
    res.json({
      "Precio con IVA ": precioIva
    });
  });
});

//E Pagina Web introducimos  index y nos devolvera el index.html
app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  //Content-type Adecuado
  res.setHeader('Content-Type', 'text/html');
});

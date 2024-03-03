//Creacion de servidor en express
//Importar express
const express = require("express");
//Crear servidor
const app = express();
//Definir puerto
const port = 3000;
//Decimos que utilice json
app.use(express.json());
//Levantar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Base de datos
//Importar base de datos
mongoose = require("mongoose");
//Conectar a la base de datos
//URL de conexion
mongoose.connect("mongodb://localhost:27017/clientes");
//Esquema
let clienteSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  direccion: String,
  poblacion: String,
  telefono: String,
});
//Modelo
const Clientes = mongoose.model("Clientes", clienteSchema);
//Insertamos varios clientes
// Clientes.insertMany([
//   {
//     nombre: "Juan",
//     apellido: "Garcia",
//     edad: 25,
//     direccion: "Calle Mayor 1",
//     poblacion: "Madrid",
//     telefono: "666555444",
//   },
//   {
//     nombre: "Ana",
//     apellido: "Lopez",
//     edad: 30,
//     direccion: "Calle Sol 2",
//     poblacion: "Madrid",
//     telefono: "666555333",
//   },
//   {
//     nombre: "Luis",
//     apellido: "Gomez",
//     edad: 35,
//     direccion: "Calle Luna 3",
//     poblacion: "Madrid",
//     telefono: "666555222",
//   },
// ]);
//Clientes.find().then(result => console.log(result));
//
//Endpoint
//Ruta: /clientes
//Metodo: GET
app.get("/clientes", (req, res) => {
  clientes.fins({}).then((result) => {
    if (result.length > 0) {
      res.status(200).json(result);
      console.log(result);
    } else {
      res.status(404).send("No hay clientes");
    }
  });
});

//Buscamos cliente por id
//Ruta: /clientes/:id
app.get("/clientes/:id", (req, res) => {
  clientes.findById(id).then((result) => {
    if (result) {
      res.status(200).json(result);
      console.log(result);
    } else {
      res.status(404).send("Cliente no encontrado");
    }
  });
});

//Bucsar cliente por poblacion
//
//Ruta: /clientes/poblacion/:poblacion
//Metodo: GET
//Parametros: poblacion
app.get("/clientes/poblacion/:poblacion", (req, res) => {
  clientes.find({ poblacion: req.params.poblacion }).then((result) => {
    if (result.length > 0) {
      res.status(200).json(result);
      console.log(result);
    } else {
      res.status(404).send("No hay clientes en esa poblacion");
    }
  });
});

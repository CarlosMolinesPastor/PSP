//Creacion de servidor en express
//Importar express
const express = require('express');
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
mongoose.connect('mongodb://localhost:27017/personas', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
//Esquema
let personaSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  direccion: String,
  poblacion: String,
  telefono: String,
});
//Modelo
const Personas = mongoose.model("Personas", personaSchema);
//Insertamos varios personas
// Personas.insertMany([
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
//   }
// ]);
Personas.find().then((result) => console.log(result));

//######################################## GET ########################################

//Endpoint

//Ruta: /personas
//Metodo: GET
app.get("/", (req, res) => {
  Personas.find({}).then((result) => {
    if (result.length > 0) {
      res.status(200).json(result);
      console.log(result);
    } else {
      res.status(404).send("No hay personas");
    }
  });
});

//Buscamos cliente por id
//Ruta: /personas/:id
app.get("/personas/:id", (req, res) => {
  let id = req.params.id;
  Personas.findById(id).then((result) => {
    if (result) {
      res.status(200).json(result);
      console.log(result);
    } else {
      res.status(404).send("Cliente no encontrado");
    }
  });
});
//Bucsar cliente por poblacion y los ordena por nombre decreciente
//Ruta: /personas/poblacion/:poblacion
app.get("/personas/poblacion/:poblacion", (req, res) => {
  let poblacion = req.params.poblacion;
  Personas.find({ poblacion: poblacion }).sort({ nombre: -1 }).then((result) => {
    if (result.length > 0) {
      res.status(200).json(result);
      console.log(result);
    } else {
      res.status(404).send("No hay personas en esa poblacion");
    }
  });
});

// //Busca personas por poblacion y las ordena por nombre
// app.get("/personas/search", (req, res) => {
//   let poblacion = req.query.poblacion;
//   let edad = req.query.edad;
//   // Buscar personas en la base de datos por poblacion y mayores de 27 años
//   Personas.find({ poblacion: poblacion, edad: { $gt: edad } })
//     .then((result) => {
//       if (result.length > 0) {
//         res.status(200).json(result);
//         console.log(result);
//       } else {
//         res.status(404).send("No hay personas en esa poblacion");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send("Error al realizar la búsqueda");
//     });
// });

//######################################## POST ########################################
//Endpoint
//Agrega nueva persona
// app.post("/personas", (req, res) => {
//   // Crear una nueva persona
//   const nuevaPersona = new Personas({
//     nombre: req.body.nombre,
//     apellido: req.body.apellido,
//     edad: req.body.edad,
//     direccion: req.body.direccion,
//     poblacion: req.body.poblacion,
//     telefono: req.body.telefono,
//   });
//   // Guardar la nueva persona en la base de datos
//   nuevaPersona.save()
//     .then((result) => {
//       res.status(201).json(result);
//       console.log(result);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send("Error al crear la nueva persona");
//     });
// });

app.post("/personas", (req, res) => {
  // Datos de la nueva persona
  const datosPersona = {
    nombre: req.body.nombre,
    poblacion: req.body.poblacion,
    // Añade aquí cualquier otro campo que necesites
  };

  // Crear y guardar la nueva persona en la base de datos
  Personas.create(datosPersona)
    .then((result) => {
      res.status(201).json(result);
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error al crear la nueva persona");
    });
});
//######################################## PUT ########################################

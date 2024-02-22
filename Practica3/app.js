const express = require("express");
const mongoose = require("mongoose");
const Clientes = require("./models/clientes");
const {
  createCliente,
  createTable,
  copyToClipboard,
  getAllDocuments,
  getDocumentById,
  deleteCliente,
  updateCliente,
  searchCliente,
  deleteAll
} = require('./public/main.js');

const app = express()
const port = 3000

// Sirve archivos estáticos desde el directorio
app.use(express.static(__dirname));
// Middleware para manejar errores, esto es un middleware de nivel de 
// aplicación que lo que hace es manejar los errores que se producen en la aplicación
// y los muestra por consola y devuelve un mensaje de error al cliente
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Algo salió mal' });
});

//Iniciamos el servidor en el puerto 3000
app.listen(port, () => console.log(`Ejemplo app escuchando en puerto ${port}!`));

//Le decimos a express que vamos a usar JSON
app.use(express.json());

//Conectamos con la base de datos
mongoose.connect('mongodb://localhost:27017/Clientes');

//Funcion para validar el id de un cliente ya que si no es valido no se podra realizar ninguna operacion
// y daba error en la consola y salia del programa
function validarId(req, res, next) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID de cliente no válido' });
  }

  next();
}
//##################################   Endspoints  ########################################.

//Creamos un endpoint para obtener todos los clientes
app.get("/clientes", (req, res) => {
  Clientes.find().then((result) => {
    //Si hay clientes los devolvemos en formato JSON si no devolvemos un mensaje de error
    if (result) {
      res.json(result);
    } else {
      res.status(404).send({ message: 'No hay clientes' });
    }
  });
});


//Creamos un endpoint para buscar clientes por su nombre y edad > x
app.get("/clientes/search", (req, res) => {
  //Creamos una variable para guardar el nombre y edad que nos pasan por la URL
  const nombre = req.query.nombre;
  const edad = req.query.edad;
  //Buscamos los clientes que coincidan con el nombre y edad > x
  Clientes.find({ nombre: nombre, edad: { $gt: edad } }).then(result => {
    //Si hay clientes los devolvemos en formato JSON si no devolvemos un mensaje de error
    if (result) {
      res.json(result);
    } else {
      res.status(404).send({ message: 'Cliente no encontrado' });
    }
  });
});

//Creamos un endpoint para obtener un cliente por su id
app.get("/clientes/:id", validarId, (req, res, next) => {
  //Guardamos el id que nos pasan por la URL
  const id = req.params.id;
  //Buscamos el cliente por su id y lo devolvemos en formato JSON si no devolvemos un mensaje de error
  Clientes.findById(id).then(result => {
    if (result) {
      res.json(result);
    } else {
      res.status(404).send({ message: 'Cliente no encontrado' });
    }
  })
    .catch(next); // Pasamos el error al middleware de manejo de errores
});


//Creamos un endpoint para añadir un cliente metodo POST
app.post("/clientes", (req, res) => {
  //Creamos un nuevo cliente con los datos que nos pasan por el body
  const cliente = new Clientes({
    nombre: req.body.nombre,
    edad: req.body.edad,
    direccion: req.body.direccion,
    poblacion: req.body.poblacion,
    tratamiento: req.body.tratamiento
  });
  //Guardamos el cliente en la base de datos y lo devolvemos en formato JSON si no devolvemos un mensaje de error
  cliente.save().then(result => {
    if (result) {
      res.json(result);
    } else {
      res.status(400).send({ message: 'Error al guardar el cliente' });
    }
  });
});

//Creamos un endpoint para modificar un cliente por su id
app.put("/clientes/:id", validarId, (req, res, next) => {
  //Guardamos el id que nos pasan por la URL
  const id = req.params.id;
  //Creamos un objeto con los datos que nos pasan por el body
  const cliente = {
    nombre: req.body.nombre,
    edad: req.body.edad,
    direccion: req.body.direccion,
    poblacion: req.body.poblacion,
    tratamiento: req.body.tratamiento
  };
  //Buscamos el cliente por su id y lo modificamos con los datos que nos pasan por el body
  Clientes.findByIdAndUpdate(id, cliente)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).send({ message: 'Cliente no encontrado' });
      }
    })
    .catch(next); // Pasamos el error al middleware de manejo de errores
});

//Creamos un endpoitn para modificar un cliente por su nombre y edad > x
app.put("/clientes", (req, res) => {
  //Creamos un objeto con los datos que nos pasan por el body
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const cliente = {
    direccion: req.body.direccion,
    poblacion: req.body.poblacion,
    tratamiento: req.body.tratamiento
  };
  //Buscamos el cliente por su nombre y edad > x y lo modificamos con los datos que nos pasan por el body
  Clientes.findOneAndUpdate({ nombre: nombre, edad: { $gt: edad } }, cliente).then(result => {
    if (result) {
      res.json(result);
    } else {
      res.status(404).send({ message: 'Cliente no encontrado' });
    }
  });
});

//Creamos un endpoint para borrar un cliente por su id
app.delete("/clientes/:id", validarId, (req, res, next) => {
  //Guardamos el id que nos pasan por la URL
  const id = req.params.id;
  //Buscamos el cliente por su id y lo borramos si no devolvemos un mensaje de error
  Clientes.findByIdAndDelete(id).then(result => {
    if (result) {
      res.json(result);
    } else {
      res.status(404).send({ message: 'Cliente no encontrado' });
    }
  }).catch(next); // Pasamos el error al middleware de manejo de errores
});

//Borrar todos los clientes
app.delete("/clientes", (req, res, next) => {
  //Borramos todos los clientes si no devolvemos un mensaje de error
  Clientes.deleteMany({})
    .then(result => {
      //Si se han borrado clientes devolvemos un mensaje con el numero de clientes borrados si no devolvemos un mensaje de error
      if (result.deletedCount > 0) {
        res.json({ message: `${result.deletedCount} clientes han sido borrados.` });
      } else {
        res.status(404).send({ message: 'No hay clientes para borrar.' });
      }
    })
    .catch(next); // Pasamos el error al middleware de manejo de errores
});

//Clientes.insertMany([
//  {
//    "nombre": "Juan",
//    "edad": 30,
//    "direccion": "Calle de la Rosa 123",
//    "poblacion": "Alicante",
//    "tratamiento": ["Limpieza dental", "Empaste"]
//  },
//  {
//    "nombre": "María",
//    "edad": 25,
//    "direccion": "Avenida del Mar 456",
//    "poblacion": "Elche",
//    "tratamiento": ["Blanqueamiento dental"]
//  },
//  {
//    "nombre": "Laura",
//    "edad": 40,
//    "direccion": "Calle Mayor 789",
//    "poblacion": "San Vicente del Raspeig",
//    "tratamiento": ["Ortodoncia"]
//  },
//  {
//    "nombre": "Laura",
//    "edad": 35,
//    "direccion": "Plaza de España 10",
//    "poblacion": "Alicante",
//    "tratamiento": ["Extracción dental", "Limpieza dental"]
//  },
//  {
//    "nombre": "Antonio",
//    "edad": 45,
//    "direccion": "Calle de la Palmera 23",
//    "poblacion": "El Campello",
//    "tratamiento": ["Implantes dentales"]
//  },
//  {
//    "nombre": "Elena",
//    "edad": 28,
//    "direccion": "Calle del Sol 15",
//    "poblacion": "Santa Pola",
//    "tratamiento": ["Revisión dental"]
//  },
//  {
//    "nombre": "David",
//    "edad": 32,
//    "direccion": "Avenida de la Luz 54",
//    "poblacion": "Mutxamel",
//    "tratamiento": ["Endodoncia"]
//  },
//  {
//    "nombre": "Juan",
//    "edad": 37,
//    "direccion": "Calle de la Luna 78",
//    "poblacion": "Alicante",
//    "tratamiento": ["Blanqueamiento dental"]
//  },
//  {
//    "nombre": "Javier",
//    "edad": 42,
//    "direccion": "Calle del Marqués 36",
//    "poblacion": "Elche",
//    "tratamiento": ["Limpieza dental"]
//  },
//  {
//    "nombre": "Juan",
//    "edad": 33,
//    "direccion": "Calle del Cid 21",
//    "poblacion": "San Juan de Alicante",
//    "tratamiento": ["Empaste"]
//  },
//  {
//    "nombre": "Raúl",
//    "edad": 38,
//    "direccion": "Calle de la Paloma 5",
//    "poblacion": "Alicante",
//    "tratamiento": ["Ortodoncia"]
//  },
//  {
//    "nombre": "Carmen",
//    "edad": 27,
//    "direccion": "Avenida de los Pinos 32",
//    "poblacion": "Campello",
//    "tratamiento": ["Revisión dental", "Empaste"]
//  },
//  {
//    "nombre": "Pablo",
//    "edad": 29,
//    "direccion": "Calle del Olivo 67",
//    "poblacion": "Mutxamel",
//    "tratamiento": ["Limpieza dental"]
//  },
//  {
//    "nombre": "Luisa",
//    "edad": 31,
//    "direccion": "Plaza de la Libertad 3",
//    "poblacion": "Elche",
//    "tratamiento": ["Extracción dental"]
//  },
//  {
//    "nombre": "Diego",
//    "edad": 36,
//    "direccion": "Calle del Río 8",
//    "poblacion": "Santa Pola",
//    "tratamiento": ["Implantes dentales"]
//  }
//]).then(result => console.log(result));


//Mostramos todos los clientes por la consola:
Clientes.find().then(result => console.log(result));
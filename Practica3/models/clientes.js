// Descripción: Modelo de datos para los clientes
const mongoose = require("mongoose");

//Definimos el esquema de los clientes
const clienteSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    direccion: String,
    poblacion: String,
    //Crear array de tratamientos
    tratamiento: ["Limpieza Bucal", "Endodoncia", " Ortodoncia", "Empaste", "Revision", "Reposicion Pieza"]
});

//Exportamos el modelo
module.exports = mongoose.model("Cliente", clienteSchema);
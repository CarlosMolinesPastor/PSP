const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    direccion: String,
    poblacion: String,
    //Crear array de tratamientos
    tratamiento: ["Limpieza Bucal", "Endodoncia", " Ortodoncia", "Empaste", "Revision", "Reposicion Pieza"]
});

module.exports = mongoose.model("Cliente", clienteSchema);
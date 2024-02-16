const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/biblioteca");

let libroSchema = new mongoose.Schema({
  titulo: String,
  Autor: [String],
  Ejemplares: Number,
});

let Libro = mongoose.model("libros", libroSchema);

module.exports = Libro;

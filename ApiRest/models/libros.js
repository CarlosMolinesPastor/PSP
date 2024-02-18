const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: String,
    autor: [String],
    ejemplares: Number
});

module.exports = mongoose.model('libros', libroSchema);
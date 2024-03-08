const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({

    nombre: String,
    precio: Number,
    iva: Number
});

module.exports = mongoose.model('producto', productoSchema);
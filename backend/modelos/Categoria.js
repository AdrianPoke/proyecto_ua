const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String },
  formatos_disponibles: [{ type: String }]
});

module.exports = mongoose.model('Categoria', CategoriaSchema, 'categorias');

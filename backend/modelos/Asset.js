const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  imagen_principal: { type: String, required: true },
  imagenes_previas: [String],
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  titulo: { type: String, required: true },
  categoria: { type: String, required: true },
  numero_descargas: { type: Number, default: 0 },
  descripcion: { type: String },
  fecha: { type: Date, default: Date.now },
  formatos_disponibles: [String],
  etiquetas: [String],
  es_sensible: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Asset', AssetSchema, 'assets');

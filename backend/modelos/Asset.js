const mongoose = require('mongoose');

const ArchivoSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['principal', 'previa', 'asset'], required: true },
  nombre: { type: String, required: true },
  url: { type: String, required: true }
});

const AssetSchema = new mongoose.Schema({
  archivos: [ArchivoSchema], // ✅ Este campo debe existir
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

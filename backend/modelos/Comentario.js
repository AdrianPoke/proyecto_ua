const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comentario', ComentarioSchema, 'comentarios');

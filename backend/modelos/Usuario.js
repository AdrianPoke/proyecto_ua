const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  foto_perfil: { type: String },
  enlace_twitter: { type: String },
  enlace_instagram: { type: String },
  enlace_linkedin: { type: String },
  assets_subidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }],
  assets_descargados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }],
  assets_favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }],
  config_alto_contraste: { type: Boolean, default: false },
  config_busqueda_segura: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema, 'usuarios');

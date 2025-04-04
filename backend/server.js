const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas
const authRoutes = require('./rutas/auth');
const usuarioRoutes = require('./rutas/usuarios');
const categoriaRoutes = require('./rutas/categorias'); // Si necesitas también las categorías
const assetRoutes = require('./rutas/assets'); // Las rutas de assets

app.use('/api', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/assets', assetRoutes);  // Integración de las rutas de assets

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

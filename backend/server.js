const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// 📌 Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// 📌 Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// 📌 Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

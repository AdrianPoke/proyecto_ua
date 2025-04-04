const express = require('express');
const router = express.Router();
const { obtenerNombresCategorias } = require('../controllers/categoriaController');

// Ruta para obtener los nombres de todas las categorías
router.get('/', obtenerNombresCategorias);

module.exports = router;

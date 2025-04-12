const express = require('express');
const router = express.Router();
const { obtenerNombresCategorias, obtenerFormatosPorCategoria } = require('../controllers/categoriaController');

// Ruta para obtener los nombres de todas las categorías
router.get('/', obtenerNombresCategorias);

router.get('/:nombre/formatos', obtenerFormatosPorCategoria);


module.exports = router;

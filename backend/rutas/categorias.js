const express = require('express');
const router = express.Router();
const {
  obtenerNombresCategorias,
  obtenerFormatosPorCategoria,
  eliminarFormatosDeCategoria,
} = require('../controllers/categoriaController');

router.get('/', obtenerNombresCategorias);
router.get('/:nombre/formatos', obtenerFormatosPorCategoria);
router.put('/:nombre/formatos/eliminar', eliminarFormatosDeCategoria); // nueva ruta

module.exports = router;

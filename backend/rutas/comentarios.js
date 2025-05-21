const express = require('express');
const router = express.Router();
const {
  insertarComentario,
  obtenerComentarios,
  darLikeComentario,
  quitarLikeComentario
} = require('../controllers/comentarioController');
const verificarToken = require('../middlewares/verificarToken');

// Insertar comentario
router.post('/:assetId', verificarToken, insertarComentario);

// Obtener comentarios
router.get('/:assetId', verificarToken, obtenerComentarios);

// Dar like a un comentario
router.post('/:comentarioId/like', verificarToken, darLikeComentario);

router.delete('/:comentarioId/like', verificarToken, quitarLikeComentario);


module.exports = router;

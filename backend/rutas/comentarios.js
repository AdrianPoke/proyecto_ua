const express = require('express');
const router = express.Router();
const { insertarComentario, obtenerComentarios } = require('../controllers/comentarioController');
const verificarToken = require('../middlewares/verificarToken');

// POST /api/comentario/:assetId
router.post('/:assetId', verificarToken, insertarComentario);

router.get('/:assetId', verificarToken, obtenerComentarios);

module.exports = router;

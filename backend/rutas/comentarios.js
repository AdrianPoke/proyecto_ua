const express = require('express');
const router = express.Router();
const { insertarComentario } = require('../controllers/comentarioController');
const verificarToken = require('../middlewares/verificarToken');

// POST /api/comentario/:assetId
router.post('/:assetId', verificarToken, insertarComentario);

module.exports = router;

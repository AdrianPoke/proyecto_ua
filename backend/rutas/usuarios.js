const express = require('express');
const router = express.Router();
const { obtenerUsuarios, obtenerAssetsDescargados } = require('../controllers/usuarioController');
const verificarToken = require("../middlewares/verificarToken");

router.get('/', obtenerUsuarios);
router.get('/descargas', verificarToken, obtenerAssetsDescargados);

module.exports = router;

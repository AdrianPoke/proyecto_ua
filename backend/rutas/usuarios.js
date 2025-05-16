const express = require('express');
const router = express.Router();
const { 
    obtenerUsuarios,
    obtenerAssetsDescargados,
    actualizarPerfil,
    obtenerAssetsSubidos,
    añadirAFavoritos,
    obtenerFavoritos,
    obtenerPerfil,
    quitarDeFavoritos
  } = require('../controllers/usuarioController');
const verificarToken = require("../middlewares/verificarToken");
const upload = require("../middlewares/upload");

router.get('/', obtenerUsuarios);
router.get('/descargas', verificarToken, obtenerAssetsDescargados);
router.put('/perfil', verificarToken, upload.fields([
    { name: "foto_perfil", maxCount: 1 }
  ]), actualizarPerfil);

router.get('/perfil', verificarToken, obtenerPerfil);


router.get('/subidos', verificarToken, obtenerAssetsSubidos);
router.post('/favoritos/:assetId', verificarToken, añadirAFavoritos);
router.get('/favoritos', verificarToken, obtenerFavoritos);
router.delete('/favoritos/:assetId', verificarToken, quitarDeFavoritos);

module.exports = router;

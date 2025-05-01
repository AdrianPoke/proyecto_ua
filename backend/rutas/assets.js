const express = require("express");
const router = express.Router();
const {
  crearAsset,
  obtenerAssetPorId,
  buscarAssets,
  descargarAsset,
  obtenerAssetsRecientes,
  obtenerAssetsPopulares
} = require("../controllers/assetController");
const verificarToken = require("../middlewares/verificarToken");
const upload = require("../middlewares/upload");

// 1. Buscar assets con filtros
router.get('/buscar', buscarAssets);

// 1.1. Obtener assets más recientes
router.get('/recientes', obtenerAssetsRecientes);

// 1.2. Obtener assets más populares
router.get('/populares', obtenerAssetsPopulares);

// 2. Obtener asset por ID
router.get("/:id", verificarToken, obtenerAssetPorId);

// 3. Descargar asset completo en .zip
router.get("/:id/descargar", verificarToken, descargarAsset);

// 4. Crear asset (con archivos)
router.post(
  "/", 
  verificarToken, 
  upload.fields([
    { name: "imagen_principal", maxCount: 1 },
    { name: "imagenes_previas", maxCount: 5 },
    { name: "archivo_asset", maxCount: 10 } 
  ]),
  crearAsset
);

module.exports = router;

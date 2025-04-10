const express = require("express");
const router = express.Router();
const {
  crearAsset,
  obtenerAssetPorId,
  buscarAssets,
  descargarAsset 
} = require("../controllers/assetController");
const verificarToken = require("../middlewares/verificarToken");
const upload = require("../middlewares/upload");

// 1. Buscar assets
router.get('/buscar', buscarAssets);

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
    { name: "archivo_asset", maxCount: 1 }
  ]),
  crearAsset
);

module.exports = router;

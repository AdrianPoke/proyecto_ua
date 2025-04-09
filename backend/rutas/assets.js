const express = require("express");
const router = express.Router();
const { crearAsset, obtenerAssetPorId, buscarAssets } = require("../controllers/assetController");
const verificarToken = require("../middlewares/verificarToken");

// Primero las rutas específicas
router.get('/buscar', buscarAssets);

// Luego las rutas dinámicas
router.get("/:id", verificarToken, obtenerAssetPorId);

// Ruta para crear un asset
router.post("/", verificarToken, crearAsset);

module.exports = router;

const express = require("express");
const router = express.Router();
const { crearAsset, obtenerAssetPorId } = require("../controllers/assetController");
const verificarToken = require("../middlewares/verificarToken");

// Usamos el middleware de verificarToken para proteger la ruta
router.post("/", verificarToken, crearAsset);
router.get("/:id", verificarToken, obtenerAssetPorId);

module.exports = router;

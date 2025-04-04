const express = require("express");
const router = express.Router();
const { crearAsset } = require("../controllers/assetController");
const verificarToken = require("../middlewares/verificarToken");

// Usamos el middleware de verificarToken para proteger la ruta
router.post("/", verificarToken, crearAsset);

module.exports = router;

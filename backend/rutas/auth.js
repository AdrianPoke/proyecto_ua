const express = require('express');
const router = express.Router();
const { registro, login } = require('../controllers/authController');
const verificarToken = require('../middlewares/verificarToken');

// Rutas públicas
router.post('/registro', registro);
router.post('/login', login);

router.get('/verify-token', verificarToken, (req, res) => {
  res.status(200).json({ mensaje: 'Token válido', usuarioId: req.usuarioId });
});

module.exports = router;

const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");

  // Verificar si el token no está presente
  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const tokenLimpiado = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenLimpiado, process.env.JWT_SECRET || "secreto_fallback");

    req.usuarioId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado." });
  }
};

module.exports = verificarToken;

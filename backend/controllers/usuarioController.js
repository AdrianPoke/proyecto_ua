const User = require('../modelos/Usuario');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};


const obtenerAssetsDescargados = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    
    const usuario = await User.findById(usuarioId)
    .populate("assets_descargados"); 
    
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    
    res.json(usuario.assets_descargados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los assets descargados" });
  }
};

module.exports = { obtenerUsuarios, obtenerAssetsDescargados };
const User = require('../modelos/Usuario');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

module.exports = { obtenerUsuarios };

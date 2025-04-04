const Categoria = require('../modelos/Categoria');

// Función para obtener todos los nombres de las categorías
const obtenerNombresCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({}, 'nombre'); // Solo obtener el campo 'nombre'
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener las categorías' });
  }
};

module.exports = {
  obtenerNombresCategorias,
};

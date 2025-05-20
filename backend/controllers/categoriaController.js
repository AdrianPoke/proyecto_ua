const Categoria = require('../modelos/Categoria');

// Función para obtener todos los nombres y descripciones de las categorías
const obtenerNombresCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({}, 'nombre descripcion'); // Obtener 'nombre' y 'descripcion'
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener las categorías' });
  }
};


const obtenerFormatosPorCategoria = async (req, res) => {
  try {
    const { nombre } = req.params;

    const categoria = await Categoria.findOne({ nombre });

    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    res.json({ formatos_permitidos: categoria.formatos_disponibles || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener formatos" });
  }
};

module.exports = {
  obtenerNombresCategorias, obtenerFormatosPorCategoria
};

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

// Eliminar uno o varios formatos del array 'formatos_disponibles' de una categoría
const eliminarFormatosDeCategoria = async (req, res) => {
  try {
    const { nombre } = req.params;
    const { formatos } = req.body; // formatos debe ser un array

    if (!Array.isArray(formatos) || formatos.length === 0) {
      return res.status(400).json({ mensaje: "Debes proporcionar un array de formatos a eliminar." });
    }

    const resultado = await Categoria.updateOne(
      { nombre },
      { $pull: { formatos_disponibles: { $in: formatos } } }
    );

    if (resultado.modifiedCount === 0) {
      return res.status(404).json({ mensaje: "No se encontró la categoría o no se modificó ningún formato." });
    }

    res.json({ mensaje: "Formatos eliminados correctamente.", resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar formatos." });
  }
};


module.exports = {
  obtenerNombresCategorias,
  obtenerFormatosPorCategoria,
  eliminarFormatosDeCategoria,
};

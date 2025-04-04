const Asset = require("../modelos/Asset");

const crearAsset = async (req, res) => {
  try {
    const {
      imagen_principal,
      imagenes_previas,
      categoria,
      titulo,
      descripcion,
      formatos_disponibles,
      etiquetas,
      es_sensible,
    } = req.body;

    // Obtener el ID del autor desde el token decodificado
    const autor = req.usuarioId;

    // Crear el nuevo asset
    const nuevoAsset = new Asset({
      imagen_principal,
      imagenes_previas,
      autor,
      titulo,
      categoria,
      descripcion,
      formatos_disponibles,
      etiquetas,
      es_sensible,
    });

    // Guardar el nuevo asset en la base de datos
    await nuevoAsset.save();

    // Responder con el asset creado
    res.status(201).json({ mensaje: "Asset creado con éxito", asset: nuevoAsset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Hubo un error al crear el asset" });
  }
};

module.exports = {
  crearAsset,
};

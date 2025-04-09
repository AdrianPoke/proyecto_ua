const Asset = require("../modelos/Asset");

const crearAsset = async (req, res) => {
  try {
    const {
      imagen_principal,
      imagenes_previas,
      categoria, // ahora es nombre de categoría
      titulo,
      descripcion,
      formatos_disponibles,
      etiquetas,
      es_sensible,
    } = req.body;

    const autor = req.usuarioId;

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

    await nuevoAsset.save();

    res.status(201).json({ mensaje: "Asset creado con éxito", asset: nuevoAsset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Hubo un error al crear el asset" });
  }
};


const obtenerAssetPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const asset = await Asset.findById(id)
      .populate("autor", "nombre email"); // Solo se necesita poblar el autor

    if (!asset) {
      return res.status(404).json({ mensaje: "Asset no encontrado" });
    }

    res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Hubo un error al obtener el asset" });
  }
};



const buscarAssets = async (req, res) => {
  try {
    const { titulo, categoria, es_sensible, etiquetas, formatos, orden } = req.query;

    let filtros = {};

    // Filtro por título
    if (titulo) {
      filtros.titulo = { $regex: titulo, $options: 'i' };
    }

    // Filtro por nombre de categoría (ahora string)
    if (categoria) {
      filtros.categoria = { $regex: categoria, $options: 'i' }; // Insensible a mayúsculas
    }

    // Filtro por es_sensible
    if (es_sensible !== undefined) {
      filtros.es_sensible = es_sensible === 'true';
    }

    // Filtro por etiquetas
    if (etiquetas) {
      const etiquetasArray = etiquetas.split(',').map(et => et.trim());
      filtros.etiquetas = { $in: etiquetasArray };
    }

    // Filtro por formatos
    if (formatos) {
      const formatosArray = formatos.split(',').map(f => f.trim());
      filtros.formatos_disponibles = { $in: formatosArray };
    }

    // Construcción de la consulta con sort dinámico
    let query = Asset.find(filtros)
      .populate('autor', 'nombre email');

    // Orden dinámico
    if (orden === 'populares') {
      query = query.sort({ numero_descargas: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const assets = await query;
    res.status(200).json(assets);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error al buscar los assets' });
  }
};




module.exports = { crearAsset, obtenerAssetPorId, buscarAssets };

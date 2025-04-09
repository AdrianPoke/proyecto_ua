const mongoose = require("mongoose"); 
const Asset = require("../modelos/Asset");  
const { subirArchivo } = require('../utils/dropbox');  


const crearAsset = async (req, res) => {
  try {
    console.log("📥 Datos recibidos en req.body:", req.body);
    console.log("🖼️ Archivos recibidos en req.files:", req.files);

    const { categoria, titulo, descripcion, es_sensible } = req.body;
    const autor = req.usuarioId;

    const formatos_disponibles = req.body.formatos_disponibles
      .split(',').map(f => f.trim());
    const etiquetas = req.body.etiquetas
      .split(',').map(e => e.trim());

    console.log("🔤 Formatos:", formatos_disponibles);
    console.log("🏷️ Etiquetas:", etiquetas);

    const idTemporal = new mongoose.Types.ObjectId();
    const nombreBase = `${titulo}_${idTemporal.toString()}`;

    // Archivos de imagen principal y previas
    const imagenPrincipalFile = req.files?.imagen_principal?.[0];
    const imagenesPreviasFiles = req.files?.imagenes_previas || [];

    // Verificar imagen principal
    if (!imagenPrincipalFile) {
      console.warn("⚠️ No se recibió imagen principal");
      return res.status(400).json({ mensaje: "Falta la imagen principal" });
    }

    console.log("📷 Imagen principal:", imagenPrincipalFile.originalname);

    imagenesPreviasFiles.forEach((f, i) => {
      console.log(`🖼️ Imagen previa ${i + 1}:`, f.originalname);
    });

    const imagen_principal = await subirArchivo(
      `${nombreBase}_principal.${imagenPrincipalFile.originalname.split('.').pop()}`,
      imagenPrincipalFile.buffer
    );

    const imagenes_previas = await Promise.all(
      imagenesPreviasFiles.map((file, i) =>
        subirArchivo(
          `${nombreBase}_prev${i + 1}.${file.originalname.split('.').pop()}`,
          file.buffer
        )
      )
    );

    // Verificar archivo del asset
    const archivoAssetFile = req.files?.archivo_asset?.[0];
    if (archivoAssetFile) {
      console.log("📦 Archivo Asset:", archivoAssetFile.originalname);
      const archivo_asset = await subirArchivo(
        `${nombreBase}_asset.${archivoAssetFile.originalname.split('.').pop()}`,
        archivoAssetFile.buffer
      );
    } else {
      console.log("⚠️ No se recibió archivo del asset");
    }

    // Crear el nuevo asset
    const nuevoAsset = new Asset({
      _id: idTemporal,
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

    console.log("🆕 Nuevo asset listo para guardar:", nuevoAsset);

    await nuevoAsset.save();

    res.status(201).json({ mensaje: "✅ Asset creado con éxito", asset: nuevoAsset });
  } catch (error) {
    console.error("❌ Error en la creación del asset:", error);
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

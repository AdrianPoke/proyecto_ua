const mongoose = require("mongoose"); 
const Asset = require("../modelos/Asset");  
const { subirArchivo } = require('../utils/dropbox');  
const AdmZip = require('adm-zip');
const axios = require('axios');
const path = require('path');
const mime = require("mime-types"); 

const crearAsset = async (req, res) => {
  try {
    console.log("📥 Datos recibidos en req.body:", req.body);
    console.log("🖼️ Archivos recibidos en req.files:", req.files);

    const { categoria, titulo, descripcion, es_sensible } = req.body;
    const autor = req.usuarioId;

    const formatos_disponibles = req.body.formatos_disponibles.split(',').map(f => f.trim());
    const etiquetas = req.body.etiquetas.split(',').map(e => e.trim());

    const idTemporal = new mongoose.Types.ObjectId();
    const nombreBase = `${titulo.replace(/ /g, "_")}_${idTemporal.toString()}`;
    const archivos = [];

    // Imagen principal
    const imagenPrincipalFile = req.files?.imagen_principal?.[0];
    if (!imagenPrincipalFile) {
      return res.status(400).json({ mensaje: "Falta la imagen principal" });
    }
    const extPrincipal = imagenPrincipalFile.originalname.split('.').pop();
    const nombrePrincipal = `${nombreBase}_principal.${extPrincipal}`;
    const urlPrincipal = await subirArchivo(nombrePrincipal, imagenPrincipalFile.buffer);
    archivos.push({ tipo: 'principal', nombre: nombrePrincipal, url: urlPrincipal });

    // Imágenes previas
    const imagenesPreviasFiles = req.files?.imagenes_previas || [];
    for (let i = 0; i < imagenesPreviasFiles.length; i++) {
      const file = imagenesPreviasFiles[i];
      const ext = file.originalname.split('.').pop();
      const nombrePrev = `${nombreBase}_prev${i + 1}.${ext}`;
      const urlPrev = await subirArchivo(nombrePrev, file.buffer);
      archivos.push({ tipo: 'previa', nombre: nombrePrev, url: urlPrev });
    }

    // Archivo del asset (opcional)
    const archivoAssetFile = req.files?.archivo_asset?.[0];
    if (archivoAssetFile) {
      const ext = archivoAssetFile.originalname.split('.').pop();
      const nombreAsset = `${nombreBase}_asset.${ext}`;
      const urlAsset = await subirArchivo(nombreAsset, archivoAssetFile.buffer);
      archivos.push({ tipo: 'asset', nombre: nombreAsset, url: urlAsset });
    }

    // Crear asset
    const nuevoAsset = new Asset({
      _id: idTemporal,
      archivos,
      autor,
      titulo,
      categoria,
      descripcion,
      formatos_disponibles,
      etiquetas,
      es_sensible
    });

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

    if (titulo) {
      filtros.titulo = { $regex: titulo, $options: 'i' };
    }

    if (categoria) {
      filtros.categoria = { $regex: categoria, $options: 'i' };
    }

    if (es_sensible !== undefined) {
      filtros.es_sensible = es_sensible === 'true';
    }

    if (etiquetas) {
      const etiquetasArray = etiquetas.split(',').map(et => et.trim());
      filtros.etiquetas = { $in: etiquetasArray };
    }

    if (formatos) {
      const formatosArray = formatos.split(',').map(f => f.trim());
      filtros.formatos_disponibles = { $in: formatosArray };
    }

    let query = Asset.find(filtros).populate('autor', 'nombre email');

    if (orden === 'populares') {
      query = query.sort({ numero_descargas: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const assets = await query;

    // 🔁 Adaptar respuesta para incluir solo lo necesario
    const assetsAdaptados = assets.map(asset => {
      const imagenPrincipal = asset.archivos.find(a => a.tipo === 'principal')?.url || null;
      const previas = asset.archivos.filter(a => a.tipo === 'previa').map(a => a.url);

      return {
        _id: asset._id,
        titulo: asset.titulo,
        categoria: asset.categoria,
        descripcion: asset.descripcion,
        autor: asset.autor,
        formatos_disponibles: asset.formatos_disponibles,
        etiquetas: asset.etiquetas,
        numero_descargas: asset.numero_descargas,
        createdAt: asset.createdAt,
        es_sensible: asset.es_sensible,
        imagenPrincipal,
        imagenesPrevias: previas
      };
    });

    res.status(200).json(assetsAdaptados);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error al buscar los assets' });
  }
};



const descargarAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findById(id);
    if (!asset) return res.status(404).json({ mensaje: "Asset no encontrado" });

    const archivoAsset = asset.archivos.find(a => a.tipo === "asset");
    if (!archivoAsset) return res.status(400).json({ mensaje: "Este asset no tiene archivo descargable" });

    // Convertimos la URL de dropbox si está en formato ?dl=0
    let url = archivoAsset.url;
    if (url.includes("dropbox.com")) {
      url = url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "");
    }

    const ext = path.extname(archivoAsset.nombre);
    const tipoMime = mime.lookup(ext) || "application/octet-stream";

    const response = await axios.get(url, { responseType: "stream" });

    res.setHeader("Content-Disposition", `attachment; filename="${archivoAsset.nombre}"`);
    res.setHeader("Content-Type", tipoMime);

    response.data.pipe(res);
  } catch (error) {
    console.error("❌ Error en descarga directa:", error);
    res.status(500).json({ mensaje: "Error al descargar el asset" });
  }
};







module.exports = { crearAsset, obtenerAssetPorId, buscarAssets, descargarAsset };

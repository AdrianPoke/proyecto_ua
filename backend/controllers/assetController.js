const mongoose = require("mongoose"); 
const Asset = require("../modelos/Asset");  
const Usuario = require("../modelos/Usuario");
const Categoria = require("../modelos/Categoria");
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

    let etiquetas = [];

    if (Array.isArray(req.body.etiquetas)) {
      etiquetas = req.body.etiquetas.map(e => e.trim());
    } else if (typeof req.body.etiquetas === 'string') {
      etiquetas = req.body.etiquetas.split(',').map(e => e.trim());
    }


    // 🔍 Obtener categoría y normalizar los formatos permitidos
    const categoriaDoc = await Categoria.findOne({ nombre: categoria });
    if (!categoriaDoc) {
      return res.status(400).json({ mensaje: "Categoría no válida" });
    }
    const formatosPermitidos = (categoriaDoc.formatos_disponibles || []).map(f => f.toLowerCase());

    const idTemporal = new mongoose.Types.ObjectId();
    const nombreBase = `${titulo.replace(/ /g, "_")}_${idTemporal.toString()}`;
    const archivos = [];
    const formatosSubidos = [];

    // ✅ Imagen principal (obligatoria)
    const imagenPrincipalFile = req.files?.imagen_principal?.[0];
    if (!imagenPrincipalFile) {
      return res.status(400).json({ mensaje: "Falta la imagen principal" });
    }
    const extPrincipal = imagenPrincipalFile.originalname.split('.').pop();
    const nombrePrincipal = `${nombreBase}_principal.${extPrincipal}`;
    const urlPrincipal = await subirArchivo(nombrePrincipal, imagenPrincipalFile.buffer);
    archivos.push({ tipo: 'principal', nombre: nombrePrincipal, url: urlPrincipal });

    // ✅ Imágenes previas (opcionales)
    const imagenesPreviasFiles = req.files?.imagenes_previas || [];
    for (let i = 0; i < imagenesPreviasFiles.length; i++) {
      const file = imagenesPreviasFiles[i];
      const ext = file.originalname.split('.').pop();
      const nombrePrev = `${nombreBase}_prev${i + 1}.${ext}`;
      const urlPrev = await subirArchivo(nombrePrev, file.buffer);
      archivos.push({ tipo: 'previa', nombre: nombrePrev, url: urlPrev });
    }

    // ✅ Archivos del asset (pueden ser varios)
    const archivosAsset = req.files?.archivo_asset || [];
    for (let i = 0; i < archivosAsset.length; i++) {
      const file = archivosAsset[i];
      const ext = file.originalname.split('.').pop().toLowerCase();

      if (!formatosPermitidos.includes(ext)) {
        return res.status(400).json({
          mensaje: `❌ Formato .${ext} no permitido para la categoría "${categoria}"`,
        });
      }

      const nombreAsset = `${nombreBase}_asset_${i + 1}.${ext}`;
      const urlAsset = await subirArchivo(nombreAsset, file.buffer);
      archivos.push({ tipo: 'asset', nombre: nombreAsset, url: urlAsset });

      if (!formatosSubidos.includes(ext)) {
        formatosSubidos.push(ext);
      }
    }

    // ✅ Crear el documento del asset
    const nuevoAsset = new Asset({
      _id: idTemporal,
      archivos,
      autor,
      titulo,
      categoria,
      descripcion,
      formatos_disponibles: formatosSubidos,
      etiquetas,
      es_sensible: es_sensible === "true" || es_sensible === true
    });

    await nuevoAsset.save();

    // ✅ Asociar al usuario
    const usuario = await Usuario.findById(autor);
    if (usuario) {
      usuario.assets_subidos.push(nuevoAsset._id);
      await usuario.save();
    }

    res.status(201).json({ mensaje: "✅ Asset creado con éxito", asset: nuevoAsset });
  } catch (error) {
    console.error("❌ Error en la creación del asset:", error);
    res.status(500).json({ mensaje: "Hubo un error al crear el asset" });
  }
};

const obtenerAssetsRecientes = async (req, res) => {
  try {
    const limite = parseInt(req.query.limite) || 10; // Valor por defecto: 10

    const assets = await Asset.find()
      .sort({ createdAt: -1 })
      .limit(limite)
      .populate("autor", "nombre email");

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
    console.error("❌ Error al obtener assets recientes:", error);
    res.status(500).json({ mensaje: "Error al obtener los assets recientes" });
  }
};


const obtenerAssetsPopulares = async (req, res) => {
  try {
    const limite = parseInt(req.query.limite) || 10; // Por defecto: 10

    const assets = await Asset.find()
      .sort({ numero_descargas: -1 })
      .limit(limite)
      .populate("autor", "nombre email");

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
    console.error("❌ Error al obtener assets populares:", error);
    res.status(500).json({ mensaje: "Error al obtener los assets más descargados" });
  }
};



const obtenerAssetPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const asset = await Asset.findById(id)
      .populate("autor", "nombre email foto_perfil")

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

    const usuario = await Usuario.findById(req.usuarioId);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const asset = await Asset.findById(id);
    if (!asset) return res.status(404).json({ mensaje: "Asset no encontrado" });

    const archivosAsset = asset.archivos.filter(a => a.tipo === "asset");
    if (!archivosAsset.length) {
      return res.status(400).json({ mensaje: "Este asset no tiene archivos descargables" });
    }

    const yaDescargado = usuario.assets_descargados.includes(id);
    if (!yaDescargado) {
      usuario.assets_descargados.push(id);
      await usuario.save();
      asset.numero_descargas += 1;
      await asset.save();
    }

    const zip = new AdmZip();
    const tituloLimpio = asset.titulo.trim().toLowerCase().replace(/ /g, "_").replace(/[^\w\-]/g, '');

    for (let i = 0; i < archivosAsset.length; i++) {
      const archivo = archivosAsset[i];
      let url = archivo.url;
      if (url.includes("dropbox.com")) {
        url = url
          .replace("www.dropbox.com", "dl.dropboxusercontent.com")
          .replace("?dl=0", "")
          .replace("?dl=1", "");
      }

      try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const ext = path.extname(archivo.nombre); // extraer extensión original
        const nuevoNombre = `${tituloLimpio}_asset_${i + 1}${ext}`;
        zip.addFile(nuevoNombre, Buffer.from(response.data));
      } catch (err) {
        console.warn(`⚠️ Error descargando ${archivo.nombre}:`, err.message);
      }
    }

    const zipBuffer = zip.toBuffer();

    res.setHeader("Content-Disposition", `attachment; filename="${tituloLimpio}.zip"`);
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Length", zipBuffer.length);
    res.send(zipBuffer);

  } catch (error) {
    console.error("❌ Error al generar la descarga:", error);
    res.status(500).json({ mensaje: "Error al descargar el asset" });
  }
};

const obtenerEtiquetasUnicas = async (req, res) => {
  try {
    const etiquetas = await Asset.distinct("etiquetas");
    const filtradas = etiquetas.filter(e => e && e.trim() !== "").sort();
    res.json(filtradas);
  } catch (error) {
    console.error("❌ Error al obtener etiquetas:", error);
    res.status(500).json({ mensaje: "Error al obtener etiquetas" });
  }
};

const eliminarAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;

    const asset = await Asset.findById(id);
    if (!asset) return res.status(404).json({ mensaje: "Asset no encontrado" });

    if (asset.autor.toString() !== usuarioId) {
      return res.status(403).json({ mensaje: "No tienes permiso para eliminar este asset" });
    }

    await Asset.findByIdAndDelete(id);
    await Usuario.findByIdAndUpdate(usuarioId, { $pull: { assets_subidos: id } });

    res.json({ mensaje: "Asset eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar asset:", error);
    res.status(500).json({ mensaje: "Error al eliminar el asset" });
  }
};

const actualizarAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;

    const asset = await Asset.findById(id);
    if (!asset) return res.status(404).json({ mensaje: "Asset no encontrado" });

    if (asset.autor.toString() !== usuarioId) {
      return res.status(403).json({ mensaje: "No autorizado para modificar este asset" });
    }

    const {
      titulo,
      descripcion,
      categoria,
      licencia,
      precio,
      etiquetas,
      es_sensible
    } = req.body;

    if (titulo) asset.titulo = titulo;
    if (descripcion) asset.descripcion = descripcion;
    if (categoria) asset.categoria = categoria;
    if (licencia) asset.licencia = licencia;
    if (precio !== undefined) asset.precio = parseFloat(precio);
    if (es_sensible !== undefined) asset.es_sensible = es_sensible === 'true' || es_sensible === true;

    if (etiquetas) {
      if (Array.isArray(etiquetas)) {
        asset.etiquetas = etiquetas.map(e => e.trim());
      } else if (typeof etiquetas === 'string') {
        asset.etiquetas = etiquetas.split(',').map(e => e.trim());
      }
    }

    // ✅ Archivos
    const nuevosArchivos = [];

    const subir = async (tipoCampo, tipoNombre) => {
      const files = req.files?.[tipoCampo] || [];
      for (let i = 0; i < files.length; i++) {
        const ext = files[i].originalname.split('.').pop();
        const nombre = `${asset._id}_${tipoCampo}_${i + 1}.${ext}`;
        const url = await subirArchivo(nombre, files[i].buffer);
        nuevosArchivos.push({ tipo: tipoNombre, nombre, url });
      }
    };

    await subir("imagen_principal", "principal");
    await subir("imagenes_previas", "previa");
    await subir("archivo_asset", "asset");

    if (nuevosArchivos.length > 0) {
      const tiposNuevos = nuevosArchivos.map(a => a.tipo);

      asset.archivos = asset.archivos.filter(a => !tiposNuevos.includes(a.tipo));

      asset.archivos.push(...nuevosArchivos);
    }


    await asset.save();

    res.json({ mensaje: "Asset actualizado correctamente", asset });
  } catch (error) {
    console.error("❌ Error al actualizar asset:", error);
    res.status(500).json({ mensaje: "Error al actualizar asset" });
  }
};

const eliminarArchivoDeAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.query;
    const usuarioId = req.usuarioId;

    if (!nombre) {
      return res.status(400).json({ mensaje: "Debe proporcionar el nombre del archivo" });
    }

    const asset = await Asset.findById(id);
    if (!asset) return res.status(404).json({ mensaje: "Asset no encontrado" });

    if (asset.autor.toString() !== usuarioId) {
      return res.status(403).json({ mensaje: "No autorizado para modificar este asset" });
    }

    const archivosAntes = asset.archivos.length;
    asset.archivos = asset.archivos.filter(a => a.nombre !== nombre);

    if (asset.archivos.length === archivosAntes) {
      return res.status(404).json({ mensaje: "Archivo no encontrado en el asset" });
    }

    await asset.save();
    res.json({ mensaje: "Archivo eliminado correctamente", archivos: asset.archivos });
  } catch (error) {
    console.error("❌ Error al eliminar archivo:", error);
    res.status(500).json({ mensaje: "Error al eliminar archivo del asset" });
  }
};


module.exports = {
  crearAsset,
  obtenerAssetPorId,
  buscarAssets,
  descargarAsset,
  obtenerAssetsRecientes,
  obtenerAssetsPopulares,
  obtenerEtiquetasUnicas,
  eliminarAsset,
  actualizarAsset,
  eliminarArchivoDeAsset
};
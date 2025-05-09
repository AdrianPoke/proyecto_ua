const User = require('../modelos/Usuario');
const { subirArchivo } = require("../utils/dropbox");
const bcrypt = require('bcryptjs');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const actualizarPerfil = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const { nombre, contraseña, enlace_twitter, enlace_instagram, enlace_linkedin } = req.body;

    const usuario = await User.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // 🔁 Actualizar nombre si se proporciona
    if (nombre) {
      usuario.nombre = nombre;
    }

    // 🔐 Actualizar contraseña si se proporciona
    if (contraseña) {
      const hash = await bcrypt.hash(contraseña, 10);
      usuario.contraseña = hash;
    }

    // 🌐 Actualizar enlaces si se proporcionan
    if (enlace_twitter !== undefined) usuario.enlace_twitter = enlace_twitter;
    if (enlace_instagram !== undefined) usuario.enlace_instagram = enlace_instagram;
    if (enlace_linkedin !== undefined) usuario.enlace_linkedin = enlace_linkedin;

    // 🖼️ Subir nueva foto de perfil si se adjunta
    const nuevaFoto = req.files?.foto_perfil?.[0];
    if (nuevaFoto) {
      const ext = nuevaFoto.originalname.split('.').pop();
      const nombreArchivo = `perfil_${usuarioId}.${ext}`;
      const url = await subirArchivo(nombreArchivo, nuevaFoto.buffer);
      usuario.foto_perfil = url;
    }

    await usuario.save();

    res.status(200).json({ mensaje: "Perfil actualizado correctamente", usuario });
  } catch (error) {
    console.error("❌ Error al actualizar el perfil:", error);
    res.status(500).json({ mensaje: "Error al actualizar el perfil" });
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

const obtenerAssetsSubidos = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    const usuario = await User.findById(usuarioId)
      .populate("assets_subidos"); 

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuario.assets_subidos);
  } catch (error) {
    console.error("❌ Error al obtener los assets subidos:", error);
    res.status(500).json({ mensaje: "Error al obtener los assets subidos" });
  }
};

const añadirAFavoritos = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const { assetId } = req.params;

    const usuario = await User.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Si ya está en favoritos, no se añade de nuevo
    if (usuario.assets_favoritos.includes(assetId)) {
      return res.status(400).json({ mensaje: "El asset ya está en favoritos" });
    }

    usuario.assets_favoritos.push(assetId);
    await usuario.save();

    res.status(200).json({ mensaje: "Asset añadido a favoritos" });
  } catch (error) {
    console.error("❌ Error al añadir a favoritos:", error);
    res.status(500).json({ mensaje: "Error al añadir el asset a favoritos" });
  }
};

const obtenerFavoritos = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    const usuario = await User.findById(usuarioId)
      .populate("assets_favoritos");

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json(usuario.assets_favoritos);
  } catch (error) {
    console.error("❌ Error al obtener favoritos:", error);
    res.status(500).json({ mensaje: "Error al obtener los assets favoritos" });
  }
};



module.exports = { obtenerUsuarios, obtenerAssetsDescargados, actualizarPerfil, obtenerAssetsSubidos, añadirAFavoritos, obtenerFavoritos };
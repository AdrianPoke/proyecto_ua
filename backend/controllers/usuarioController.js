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

    if (nombre) usuario.nombre = nombre;

    if (contraseña) {
      const hash = await bcrypt.hash(contraseña, 10);
      usuario.contraseña = hash;
    }

    if (enlace_twitter !== undefined) usuario.enlace_twitter = enlace_twitter;
    if (enlace_instagram !== undefined) usuario.enlace_instagram = enlace_instagram;
    if (enlace_linkedin !== undefined) usuario.enlace_linkedin = enlace_linkedin;

    const nuevaFoto = req.files?.foto_perfil?.[0];
    if (nuevaFoto) {
      // Validaciones
      const mimeValido = nuevaFoto.mimetype.startsWith("image/");
      const tamañoValido = nuevaFoto.size <= 2 * 1024 * 1024; // 2MB

      if (!mimeValido) {
        return res.status(400).json({ mensaje: "El archivo debe ser una imagen válida" });
      }
      if (!tamañoValido) {
        return res.status(400).json({ mensaje: "La imagen no debe superar los 2MB" });
      }

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


const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuarioId).select('-contraseña');
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error("❌ Error al obtener el perfil:", error);
    res.status(500).json({ mensaje: "Error al obtener el perfil" });
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

const quitarDeFavoritos = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const { assetId } = req.params;

    const usuario = await User.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Eliminar el asset si está en favoritos
    usuario.assets_favoritos = usuario.assets_favoritos.filter(
      (id) => id.toString() !== assetId
    );

    await usuario.save();

    res.status(200).json({ mensaje: "Asset eliminado de favoritos" });
  } catch (error) {
    console.error("❌ Error al quitar de favoritos:", error);
    res.status(500).json({ mensaje: "Error al quitar el asset de favoritos" });
  }
};


module.exports = { obtenerUsuarios, obtenerAssetsDescargados, actualizarPerfil, obtenerAssetsSubidos, obtenerPerfil, añadirAFavoritos, obtenerFavoritos,  quitarDeFavoritos  };
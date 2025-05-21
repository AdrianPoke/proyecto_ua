const Comentario = require('../modelos/Comentario');

const insertarComentario = async (req, res) => {
    try {
      const { assetId } = req.params;
      const { contenido } = req.body;
      const usuarioId = req.usuarioId;
  
      const nuevoComentario = new Comentario({
        usuario: usuarioId,
        asset: assetId,
        contenido
      });
  
      await nuevoComentario.save();
  
      const comentarioConDatos = await Comentario.findById(nuevoComentario._id)
        .populate('usuario', 'nombre email')
        .populate('asset', 'titulo');          
  
      res.status(201).json({
        mensaje: 'Comentario insertado con éxito',
        comentario: comentarioConDatos
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Hubo un error al insertar el comentario' });
    }
  };

const obtenerComentarios = async (req, res) => {
  try {
    const { assetId } = req.params;

    const comentarios = await Comentario.find({ asset: assetId })
      .sort({ createdAt: -1 }) // más recientes primero
      .populate('usuario', 'nombre email foto_perfil');

    res.status(200).json(comentarios);
  } catch (error) {
    console.error("❌ Error al obtener comentarios:", error);
    res.status(500).json({ mensaje: 'Error al obtener los comentarios del asset' });
  }
};

const darLikeComentario = async (req, res) => {
  try {
    const { comentarioId } = req.params;
    const usuarioId = req.usuarioId;

    const comentario = await Comentario.findById(comentarioId);
    if (!comentario) {
      return res.status(404).json({ mensaje: "Comentario no encontrado" });
    }

    // Verificar si ya ha dado like
    if (comentario.usuarios_que_dieron_like.includes(usuarioId)) {
      return res.status(400).json({ mensaje: "Ya has dado like a este comentario" });
    }

    // Actualización atómica para evitar VersionError
    await Comentario.findByIdAndUpdate(
      comentarioId,
      {
        $inc: { likes: 1 },
        $addToSet: { usuarios_que_dieron_like: usuarioId }
      }
    );

    res.status(200).json({ mensaje: "Like añadido correctamente" });
  } catch (error) {
    console.error("Error al dar like:", error);
    res.status(500).json({ mensaje: "Error al dar like al comentario" });
  }
};


const quitarLikeComentario = async (req, res) => {
  try {
    const { comentarioId } = req.params;
    const usuarioId = req.usuarioId;

    const comentario = await Comentario.findById(comentarioId);
    if (!comentario) {
      return res.status(404).json({ mensaje: "Comentario no encontrado" });
    }

    // Verificar si el usuario realmente había dado like
    if (!comentario.usuarios_que_dieron_like.includes(usuarioId)) {
      return res.status(400).json({ mensaje: "No habías dado like a este comentario" });
    }

    // Actualización atómica segura
    await Comentario.findByIdAndUpdate(
      comentarioId,
      {
        $inc: { likes: -1 },
        $pull: { usuarios_que_dieron_like: usuarioId }
      }
    );

    res.status(200).json({ mensaje: "Like eliminado correctamente" });
  } catch (error) {
    console.error("Error al quitar like:", error);
    res.status(500).json({ mensaje: "Error al quitar like del comentario" });
  }
};


  

module.exports = { insertarComentario, obtenerComentarios, darLikeComentario, quitarLikeComentario };

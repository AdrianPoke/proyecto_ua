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
  

module.exports = { insertarComentario };

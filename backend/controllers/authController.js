const User = require('../modelos/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registro = async (req, res) => {
  const { nombre, email, contrasenya } = req.body;

  try {
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un usuario con ese email.' });
    }

    const salt = await bcrypt.genSalt(10);
    const contrasenyaHasheada = await bcrypt.hash(contrasenya, salt);

    const nuevoUsuario = new User({
      nombre,
      email,
      contrasenya: contrasenyaHasheada,
      foto_perfil: "",
      enlace_twitter: "",
      enlace_instagram: "",
      enlace_linkedin: "",
      assets_subidos: [],
      assets_descargados: [],
      assets_favoritos: [],
      config_alto_contraste: false,
      config_busqueda_segura: true
    });

    await nuevoUsuario.save();

    // 🔑 Generar token JWT
    const token = jwt.sign(
      { id: nuevoUsuario._id },
      process.env.JWT_SECRET || 'secreto_fallback',
      { expiresIn: '2h' }
    );

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente.',
      token, 
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        foto_perfil: nuevoUsuario.foto_perfil
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
  }
};

const login = async (req, res) => {
  const { email, contrasenya } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValida = await bcrypt.compare(contrasenya, usuario.contrasenya);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'contrasenya incorrecta' });
    }

    // Generar token con el ID del usuario
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET || 'secreto_fallback',
      { expiresIn: '2h' }
    );

    res.status(200).json({
      mensaje: 'Login exitoso',
      token, // aquí va el JWT
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        foto_perfil: usuario.foto_perfil
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { registro, login };

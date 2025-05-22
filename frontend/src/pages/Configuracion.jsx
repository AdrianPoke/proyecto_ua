import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCog, FaBell, FaLock, FaGlobe, FaPalette } from 'react-icons/fa';
import axios from 'axios';
import '../styles/configuracion.css';
import defaultFoto from '../icons/profile.png';

const Configuracion = () => {
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuario/perfil`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(res.data);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
      }
    };

    fetchPerfil();
  }, []);

  const normalizarFoto = (url) => {
    if (!url) return defaultFoto;
    return url.includes("dropbox.com")
      ? url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "")
      : url;
  };

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      {/* Panel izquierdo */}
      <div className="perfil-sidebar">
        <img
          src={normalizarFoto(usuario.foto_perfil)}
          alt="Perfil"
          className="perfil-foto"
        />
        <h3 className="perfil-nombre">{usuario.nombre}</h3>
        <p className="perfil-email">{usuario.email}</p>

        <div className="perfil-redes">
          <a href={usuario.enlace_twitter} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href={usuario.enlace_instagram} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href={usuario.enlace_linkedin} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>

        {/* Botón hamburguesa solo visible en móvil */}
        <button className="perfil-hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
          ☰ Opciones
        </button>

        <nav className={`perfil-menu ${menuAbierto ? "activo" : ""}`}>
          <button onClick={() => navigate("/perfil/descargas")}>📥 Tus Descargas</button>
          <button onClick={() => navigate("/perfil/datos")}>📝 Modificar Datos</button>
          <button onClick={() => navigate("/perfil/subidos")}>📤 Assets Subidos</button>
          <button onClick={() => navigate("/perfil/favoritos")}>⭐ Favoritos</button>
          <button onClick={() => navigate("/perfil/configuracion")}>⚙️ Configuración</button>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              navigate("/login");
              window.location.reload();
            }}
          >
            🚪 Cerrar Sesión
          </button>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="perfil-contenido">
        <div className="configuracion-header">
          <h1 className="configuracion-title">
            <FaCog className="title-icon" /> Configuración
          </h1>
        </div>

        <div className="configuracion-secciones">
          {/* Sección de Notificaciones */}
          <section className="configuracion-seccion">
            <h2 className="seccion-titulo">
              <FaBell className="seccion-icono" /> Notificaciones
            </h2>
            <div className="configuracion-opciones">
              <div className="opcion-grupo">
                <label className="opcion-label">
                  <input type="checkbox" defaultChecked />
                  Notificaciones por email
                </label>
                <p className="opcion-descripcion">
                  Recibe notificaciones sobre tus assets y actividad en tu correo
                </p>
              </div>
              <div className="opcion-grupo">
                <label className="opcion-label">
                  <input type="checkbox" defaultChecked />
                  Notificaciones de descargas
                </label>
                <p className="opcion-descripcion">
                  Recibe alertas cuando alguien descarga tus assets
                </p>
              </div>
              <div className="opcion-grupo">
                <label className="opcion-label">
                  <input type="checkbox" />
                  Notificaciones de comentarios
                </label>
                <p className="opcion-descripcion">
                  Recibe alertas cuando alguien comenta en tus assets
                </p>
              </div>
            </div>
          </section>

          {/* Sección de Privacidad */}
          <section className="configuracion-seccion">
            <h2 className="seccion-titulo">
              <FaLock className="seccion-icono" /> Privacidad
            </h2>
            <div className="configuracion-opciones">
              <div className="opcion-grupo">
                <label className="opcion-label">
                  <input type="checkbox" defaultChecked />
                  Perfil público
                </label>
                <p className="opcion-descripcion">
                  Permite que otros usuarios vean tu perfil y assets
                </p>
              </div>
              <div className="opcion-grupo">
                <label className="opcion-label">
                  <input type="checkbox" />
                  Mostrar estadísticas
                </label>
                <p className="opcion-descripcion">
                  Permite que otros vean tus estadísticas de descargas
                </p>
              </div>
            </div>
          </section>

          {/* Sección de Idioma */}
          <section className="configuracion-seccion">
            <h2 className="seccion-titulo">
              <FaGlobe className="seccion-icono" /> Idioma y Región
            </h2>
            <div className="configuracion-opciones">
              <div className="opcion-grupo">
                <label className="opcion-label">Idioma</label>
                <select className="opcion-select" defaultValue="es">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div className="opcion-grupo">
                <label className="opcion-label">Zona horaria</label>
                <select className="opcion-select" defaultValue="UTC+1">
                  <option value="UTC+1">Madrid (UTC+1)</option>
                  <option value="UTC+0">Londres (UTC+0)</option>
                  <option value="UTC-5">Nueva York (UTC-5)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Sección de Apariencia */}
          <section className="configuracion-seccion">
            <h2 className="seccion-titulo">
              <FaPalette className="seccion-icono" /> Apariencia
            </h2>
            <div className="configuracion-opciones">
              <div className="opcion-grupo">
                <label className="opcion-label">Tema</label>
                <select className="opcion-select" defaultValue="dark">
                  <option value="dark">Oscuro</option>
                  <option value="light">Claro</option>
                  <option value="system">Sistema</option>
                </select>
              </div>
              <div className="opcion-grupo">
                <label className="opcion-label">
                  <input type="checkbox" defaultChecked />
                  Animaciones
                </label>
                <p className="opcion-descripcion">
                  Activa o desactiva las animaciones de la interfaz
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="configuracion-acciones">
          <button className="boton-guardar">Guardar Cambios</button>
          <button className="boton-reset">Restaurar Valores por Defecto</button>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;

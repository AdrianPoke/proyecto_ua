import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaCalendarAlt, FaClock } from 'react-icons/fa';
import '../styles/descargas.css';

const Descargas = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de carga de usuario sin base de datos
    const usuarioEjemplo = {
      nombre: "Andrew C. Curtis",
      email: "andrew@gmail.com",
      foto_perfil: "https://randomuser.me/api/portraits/men/32.jpg",
      enlace_twitter: "https://x.com/andrew",
      enlace_instagram: "https://instagram.com/andrew",
      enlace_linkedin: "https://linkedin.com/in/andrew",
    };

    setTimeout(() => setUsuario(usuarioEjemplo), 500);
  }, []);

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      {/* Panel izquierdo */}
      <div className="perfil-sidebar">
        <img
          src={usuario.foto_perfil}
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

        <nav className="perfil-menu">
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
        <div className="descargas-header">
          <h1 className="descargas-title">
            <FaDownload className="title-icon" /> Mis Descargas
          </h1>
          <div className="descargas-stats">
            <div className="stat-item">
              <span className="stat-value">15</span>
              <span className="stat-label">Total Descargas</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">5</span>
              <span className="stat-label">Este Mes</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2</span>
              <span className="stat-label">Esta Semana</span>
            </div>
          </div>
        </div>

        <div className="descargas-filters">
          <select className="filter-select" defaultValue="">
            <option value="">Todas las categorías</option>
            <option value="3d">Modelos 3D</option>
            <option value="texturas">Texturas</option>
            <option value="audio">Audio</option>
          </select>
          <select className="filter-select" defaultValue="reciente">
            <option value="reciente">Más reciente</option>
            <option value="antiguo">Más antiguo</option>
            <option value="nombre">Por nombre</option>
          </select>
        </div>

        <div className="descargas-grid">
          {/* Datos de ejemplo */}
          {[
            {
              id: 1,
              nombre: "Asset 3D - Personaje Principal",
              categoria: "Modelos 3D",
              fecha: "2024-03-15",
              hora: "14:30",
              imagen: "https://via.placeholder.com/300x200",
              autor: "ModelCreator3D"
            },
            {
              id: 2,
              nombre: "Pack de Texturas HD",
              categoria: "Texturas",
              fecha: "2024-03-14",
              hora: "09:15",
              imagen: "https://via.placeholder.com/300x200",
              autor: "TextureMaster"
            },
            {
              id: 3,
              nombre: "Efectos de Sonido - Ambiente",
              categoria: "Audio",
              fecha: "2024-03-13",
              hora: "16:45",
              imagen: "https://via.placeholder.com/300x200",
              autor: "SoundDesigner"
            }
          ].map((descarga) => (
            <div key={descarga.id} className="descarga-card">
              <div className="descarga-imagen">
                <img src={descarga.imagen} alt={descarga.nombre} />
              </div>
              <div className="descarga-info">
                <h3 className="descarga-nombre">{descarga.nombre}</h3>
                <p className="descarga-categoria">{descarga.categoria}</p>
                <p className="descarga-autor">Por: {descarga.autor}</p>
                <div className="descarga-metadata">
                  <span className="metadata-item">
                    <FaCalendarAlt /> {descarga.fecha}
                  </span>
                  <span className="metadata-item">
                    <FaClock /> {descarga.hora}
                  </span>
                </div>
                <button className="descargar-nuevamente">
                  <FaDownload /> Descargar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Descargas;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaEdit, FaTrash, FaDownload, FaStar } from 'react-icons/fa';
import '../styles/assetsSubidos.css';

const AssetsSubidos = () => {
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
        <div className="assets-subidos-header">
          <h1 className="assets-subidos-title">
            <FaUpload className="title-icon" /> Mis Assets Subidos
          </h1>
          <div className="assets-subidos-stats">
            <div className="stat-item">
              <span className="stat-value">8</span>
              <span className="stat-label">Total Assets</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">3.2k</span>
              <span className="stat-label">Descargas Totales</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4.6</span>
              <span className="stat-label">Rating Promedio</span>
            </div>
          </div>
        </div>

        <div className="assets-subidos-filters">
          <select className="filter-select" defaultValue="">
            <option value="">Todas las categorías</option>
            <option value="3d">Modelos 3D</option>
            <option value="texturas">Texturas</option>
            <option value="audio">Audio</option>
          </select>
          <select className="filter-select" defaultValue="reciente">
            <option value="reciente">Más reciente</option>
            <option value="descargas">Más descargados</option>
            <option value="rating">Mejor rating</option>
          </select>
        </div>

        <div className="assets-subidos-grid">
          {/* Datos de ejemplo */}
          {[
            {
              id: 1,
              nombre: "Modelo 3D - Guerrero Medieval",
              categoria: "Modelos 3D",
              fecha: "2024-03-15",
              descargas: 850,
              rating: 4.8,
              imagen: "https://via.placeholder.com/300x200"
            },
            {
              id: 2,
              nombre: "Pack de Texturas - Castillo",
              categoria: "Texturas",
              fecha: "2024-03-10",
              descargas: 620,
              rating: 4.5,
              imagen: "https://via.placeholder.com/300x200"
            },
            {
              id: 3,
              nombre: "Efectos de Sonido - Batalla",
              categoria: "Audio",
              fecha: "2024-03-05",
              descargas: 430,
              rating: 4.7,
              imagen: "https://via.placeholder.com/300x200"
            }
          ].map((asset) => (
            <div key={asset.id} className="asset-card">
              <div className="asset-imagen">
                <img src={asset.imagen} alt={asset.nombre} />
                <div className="asset-actions">
                  <button className="action-button edit">
                    <FaEdit />
                  </button>
                  <button className="action-button delete">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="asset-info">
                <h3 className="asset-nombre">{asset.nombre}</h3>
                <p className="asset-categoria">{asset.categoria}</p>
                <p className="asset-fecha">Subido: {asset.fecha}</p>
                <div className="asset-stats">
                  <span className="stat">
                    <FaDownload /> {asset.descargas}
                  </span>
                  <span className="stat">
                    <FaStar /> {asset.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetsSubidos;

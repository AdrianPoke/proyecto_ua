import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaDownload, FaShare, FaStar } from 'react-icons/fa';
import '../styles/favoritos.css';

const Favoritos = () => {
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
        <div className="favoritos-header">
          <h1 className="favoritos-title">
            <FaHeart className="title-icon" /> Mis Favoritos
          </h1>
          <div className="favoritos-stats">
            <div className="stat-item">
              <span className="stat-value">12</span>
              <span className="stat-label">Total Favoritos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">3</span>
              <span className="stat-label">Categorías</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4.7</span>
              <span className="stat-label">Rating Promedio</span>
            </div>
          </div>
        </div>

        <div className="favoritos-filters">
          <select className="filter-select" defaultValue="">
            <option value="">Todas las categorías</option>
            <option value="3d">Modelos 3D</option>
            <option value="texturas">Texturas</option>
            <option value="audio">Audio</option>
          </select>
          <select className="filter-select" defaultValue="rating">
            <option value="rating">Mayor rating</option>
            <option value="reciente">Más reciente</option>
            <option value="descargas">Más descargados</option>
          </select>
        </div>

        <div className="favoritos-grid">
          {/* Datos de ejemplo */}
          {[
            {
              id: 1,
              nombre: "Modelo 3D - Espada Medieval",
              categoria: "Modelos 3D",
              autor: "WeaponDesigner",
              imagen: "https://via.placeholder.com/300x200",
              descargas: 1250,
              rating: 4.8
            },
            {
              id: 2,
              nombre: "Pack de Texturas - Medieval",
              categoria: "Texturas",
              autor: "TextureArtist",
              imagen: "https://via.placeholder.com/300x200",
              descargas: 850,
              rating: 4.5
            },
            {
              id: 3,
              nombre: "Efectos de Sonido - Combate",
              categoria: "Audio",
              autor: "AudioMaster",
              imagen: "https://via.placeholder.com/300x200",
              descargas: 2100,
              rating: 4.9
            }
          ].map((favorito) => (
            <div key={favorito.id} className="favorito-card">
              <div className="favorito-imagen">
                <img src={favorito.imagen} alt={favorito.nombre} />
                <button className="remove-favorito">
                  <FaHeart />
                </button>
              </div>
              <div className="favorito-info">
                <h3 className="favorito-nombre">{favorito.nombre}</h3>
                <p className="favorito-categoria">{favorito.categoria}</p>
                <p className="favorito-autor">Por: {favorito.autor}</p>
                <div className="favorito-stats">
                  <span className="stat">
                    <FaDownload /> {favorito.descargas}
                  </span>
                  <span className="stat">
                    <FaStar /> {favorito.rating}
                  </span>
                </div>
                <div className="favorito-actions">
                  <button className="action-button download">
                    <FaDownload /> Descargar
                  </button>
                  <button className="action-button share">
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favoritos;

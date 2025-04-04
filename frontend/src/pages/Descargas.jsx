import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaCalendarAlt, FaClock, FaStar } from 'react-icons/fa';
import SidebarPerfil from '../Components/SidebarPerfil';
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

  const handleVerAsset = (id) => {
    navigate(`/asset/${id}`);
  };

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      {/* Panel izquierdo */}
      <SidebarPerfil usuario={usuario} />

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
              <span className="stat-value">8</span>
              <span className="stat-label">Categorías</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4.7</span>
              <span className="stat-label">Rating Promedio</span>
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
            <option value="descargas">Más descargados</option>
            <option value="rating">Mejor rating</option>
          </select>
        </div>

        <div className="descargas-grid">
          {/* Datos de ejemplo */}
          {[
            {
              id: 1,
              nombre: "Modelo 3D - Guerrero Medieval",
              categoria: "Modelos 3D",
              formato: ".blend",
              autor: "Juan Pérez",
              fecha: "2024-03-15",
              hora: "14:30",
              imagen: "https://via.placeholder.com/300x200"
            },
            {
              id: 2,
              nombre: "Pack de Texturas - Castillo",
              categoria: "Texturas",
              formato: ".png",
              autor: "María García",
              fecha: "2024-03-10",
              hora: "09:15",
              imagen: "https://via.placeholder.com/300x200"
            },
            {
              id: 3,
              nombre: "Efectos de Sonido - Batalla",
              categoria: "Audio",
              formato: ".wav",
              autor: "Carlos López",
              fecha: "2024-03-05",
              hora: "16:45",
              imagen: "https://via.placeholder.com/300x200"
            }
          ].map((asset) => (
            <div key={asset.id} className="asset-card">
              <div className="asset-imagen" onClick={() => handleVerAsset(asset.id)}>
                <img src={asset.imagen} alt={asset.nombre} />
              </div>
              <div className="asset-info">
                <h3 className="asset-nombre" onClick={() => handleVerAsset(asset.id)}>
                  {asset.nombre}
                </h3>
                <p className="asset-categoria">{asset.categoria} <span className="asset-formato">{asset.formato}</span></p>
                <p className="asset-autor">Por: {asset.autor}</p>
                <p className="asset-fecha">Descargado: {asset.fecha} a las {asset.hora}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Descargas;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaDownload, FaShare, FaStar } from 'react-icons/fa';
import SidebarPerfil from '../Components/SidebarPerfil';
import axios from 'axios';
import '../styles/favoritos.css';

const Favoritos = () => {
  const [usuario, setUsuario] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarioYFavoritos = async () => {
      try {
        // Simular datos del usuario
        const usuarioEjemplo = {
          nombre: "Andrew C. Curtis",
          email: "andrew@gmail.com",
          foto_perfil: "https://randomuser.me/api/portraits/men/32.jpg",
          enlace_twitter: "https://x.com/andrew",
          enlace_instagram: "https://instagram.com/andrew",
          enlace_linkedin: "https://linkedin.com/in/andrew",
        };
        setUsuario(usuarioEjemplo);

        // Obtener favoritos reales del backend
        const res = await axios.get('http://localhost:5000/api/usuario/favoritos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        setFavoritos(res.data);
      } catch (err) {
        console.error("Error al obtener favoritos:", err);
      }
    };

    fetchUsuarioYFavoritos();
  }, []);

  const handleVerAsset = (id) => {
    navigate(`/asset/${id}`);
  };

  const dropboxToRaw = (url) => url?.replace('dl=0', 'raw=1');

  const obtenerUrlPrincipal = (archivos) => {
    const archivo = archivos?.find(a => a.tipo === 'principal');
    return archivo ? dropboxToRaw(archivo.url) : "/assets/default.jpg";
  };

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <SidebarPerfil usuario={usuario} />

      <div className="perfil-contenido">
        <div className="favoritos-header">
          <h1 className="favoritos-title">
            <FaHeart className="title-icon" /> Mis Favoritos
          </h1>
          <div className="favoritos-stats">
            <div className="stat-item">
              <span className="stat-value">{favoritos.length}</span>
              <span className="stat-label">Total Favoritos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {
                  [...new Set(favoritos.map(f => f.categoria))].length
                }
              </span>
              <span className="stat-label">Categorías</span>
            </div>
          </div>
        </div>

        <div className="favoritos-grid">
          {favoritos.map((asset) => (
            <div key={asset._id} className="asset-card">
              <div className="asset-imagen" onClick={() => handleVerAsset(asset._id)}>
                <img src={obtenerUrlPrincipal(asset.archivos)} alt={asset.titulo} />
                <div className="asset-actions">
                  <button className="action-button download">
                    <FaDownload />
                  </button>
                  <button className="action-button share">
                    <FaShare />
                  </button>
                </div>
              </div>
              <div className="asset-info">
                <h3 className="asset-nombre" onClick={() => handleVerAsset(asset._id)}>
                  {asset.titulo}
                </h3>
                <p className="asset-categoria">
                  {asset.categoria}
                  {asset.formatos_disponibles?.[0] && (
                    <span className="asset-formato">.{asset.formatos_disponibles[0]}</span>
                  )}
                </p>
                <p className="asset-autor">Por: {asset.autor?.nombre || "Autor desconocido"}</p>
                <div className="asset-stats">
                  <span className="stat">
                    <FaDownload /> {asset.numero_descargas || 0}
                  </span>
                  <span className="stat">
                    <FaStar /> {asset.rating || '4.5'}
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

export default Favoritos;

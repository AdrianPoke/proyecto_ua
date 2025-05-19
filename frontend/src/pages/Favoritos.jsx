import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import SidebarPerfil from '../Components/SidebarPerfil';
import AssetCard from '../Components/AssetCard';
import axios from 'axios';
import defaultFoto from '../icons/default.jpg';
import '../styles/descargas.css';
import '../styles/assetCard.css';

const Favoritos = () => {
  const [usuario, setUsuario] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const resPerfil = await axios.get('http://localhost:5000/api/usuario/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(resPerfil.data);

        const resFavoritos = await axios.get('http://localhost:5000/api/usuario/favoritos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavoritos(resFavoritos.data);
      } catch (err) {
        console.error("Error al obtener datos del usuario o favoritos:", err);
      }
    };

    fetchDatos();
  }, []);

  const handleVerAsset = (id) => {
    navigate(`/asset/${id}`);
  };

  const dropboxToRaw = (url) => {
    if (!url) return "https://via.placeholder.com/300x200";
    return url.includes("dropbox.com")
      ? url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "")
      : url;
  };

  const normalizarFotoPerfil = (url) => {
    if (!url) return defaultFoto;
    return url.includes("dropbox.com")
      ? url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "")
      : url;
  };

  const usuarioConFoto = { ...usuario, foto_perfil: normalizarFotoPerfil(usuario?.foto_perfil) };

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <SidebarPerfil usuario={usuarioConFoto} />

      <div className="perfil-contenido">
        <div className="descargas-header">
          <h1 className="descargas-title">
            <FaStar className="title-icon" /> Mis Favoritos
          </h1>
          <div className="descargas-stats">
            <div className="stat-item">
              <span className="stat-value">{favoritos.length}</span>
              <span className="stat-label">Total Favoritos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {[...new Set(favoritos.map(a => a.categoria))].length}
              </span>
              <span className="stat-label">Categorías</span>
            </div>
          </div>
        </div>

        <div className="descargas-grid">
          {favoritos.map((asset) => {
            const archivoPrincipal = asset.archivos?.find(a => a.tipo === 'principal');
            const imagenPrincipal = archivoPrincipal ? dropboxToRaw(archivoPrincipal.url) : '';

            return (
              <AssetCard
                key={asset._id}
                asset={{ ...asset, imagenPrincipal }}
                onClick={() => handleVerAsset(asset._id)}
                mostrarDescargas={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favoritos;

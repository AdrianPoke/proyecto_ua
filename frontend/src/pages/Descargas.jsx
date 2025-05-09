import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import SidebarPerfil from '../Components/SidebarPerfil';
import axios from 'axios';
import defaultFoto from '../icons/default.jpg';
import '../styles/descargas.css';

const Descargas = () => {
  const [usuario, setUsuario] = useState(null);
  const [descargas, setDescargas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const resPerfil = await axios.get('http://localhost:5000/api/usuario/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(resPerfil.data);

        const resDescargas = await axios.get('http://localhost:5000/api/usuario/descargas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDescargas(resDescargas.data);
      } catch (err) {
        console.error("Error al obtener datos del usuario o descargas:", err);
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

  const obtenerUrlPrincipal = (archivos) => {
    const archivoPrincipal = archivos?.find(a => a.tipo === 'principal');
    return archivoPrincipal ? dropboxToRaw(archivoPrincipal.url) : "https://via.placeholder.com/300x200";
  };

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  const usuarioConFoto = { ...usuario, foto_perfil: normalizarFotoPerfil(usuario.foto_perfil) };

  return (
    <div className="perfil-container">
      <SidebarPerfil usuario={usuarioConFoto} />

      <div className="perfil-contenido">
        <div className="descargas-header">
          <h1 className="descargas-title">
            <FaDownload className="title-icon" /> Mis Descargas
          </h1>
          <div className="descargas-stats">
            <div className="stat-item">
              <span className="stat-value">{descargas.length}</span>
              <span className="stat-label">Total Descargas</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {[...new Set(descargas.map(a => a.categoria))].length}
              </span>
              <span className="stat-label">Categorías</span>
            </div>
          </div>
        </div>

        <div className="assets-grid">
          {descargas.map((asset) => (
            <div key={asset._id} className="asset-card" onClick={() => handleVerAsset(asset._id)}>
              <img
                src={obtenerUrlPrincipal(asset.archivos)}
                alt={asset.titulo}
                className="asset-image"
              />
              <div className="asset-title">{asset.titulo}</div>
              <div className="asset-subtext">
                {asset.categoria} {asset.formatos_disponibles?.[0] && `(${asset.formatos_disponibles[0]})`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Descargas;
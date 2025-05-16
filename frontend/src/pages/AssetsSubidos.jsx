import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaEdit, FaTrash } from 'react-icons/fa';
import SidebarPerfil from '../Components/SidebarPerfil';
import axios from 'axios';
import defaultFoto from '../icons/default.jpg';
import '../styles/descargas.css';

const AssetsSubidos = () => {
  const [usuario, setUsuario] = useState(null);
  const [subidos, setSubidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const resPerfil = await axios.get('http://localhost:5000/api/usuario/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(resPerfil.data);

        const resSubidos = await axios.get('http://localhost:5000/api/usuario/subidos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubidos(resSubidos.data);
      } catch (err) {
        console.error("Error al obtener datos del usuario o subidos:", err);
      }
    };

    fetchDatos();
  }, []);

  const handleVerAsset = (id) => {
    navigate(`/asset/${id}`);
  };

  const handleEditarAsset = (id) => {
    navigate(`/asset/${id}/editar`);
  };

  const dropboxToRaw = (url) => {
    if (!url) return "https://via.placeholder.com/300x200";
    return url.includes("dropbox.com")
      ? url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "")
      : url;
  };

  const handleEliminarAsset = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const confirmado = window.confirm("¿Seguro que quieres eliminar este asset?");

    if (!confirmado) return;

    await axios.delete(`http://localhost:5000/api/asset/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Elimina el asset de la lista en frontend
    setSubidos(prev => prev.filter(asset => asset._id !== id));
  } catch (err) {
    console.error("Error al eliminar asset:", err);
    alert("No se pudo eliminar el asset.");
  }
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
            <FaUpload className="title-icon" /> Mis Assets Subidos
          </h1>
          <div className="descargas-stats">
            <div className="stat-item">
              <span className="stat-value">{subidos.length}</span>
              <span className="stat-label">Total Subidos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {[...new Set(subidos.map(a => a.categoria))].length}
              </span>
              <span className="stat-label">Categorías</span>
            </div>
          </div>
        </div>

        <div className="assets-grid">
          {subidos.map((asset) => (
            <div key={asset._id} className="asset-card">
              <div className="asset-imagen-container">
                <img
                  src={obtenerUrlPrincipal(asset.archivos)}
                  alt={asset.titulo}
                  className="asset-image"
                  onClick={() => handleVerAsset(asset._id)}
                />
                <div className="asset-actions">
                  <button className="action-button edit" onClick={() => handleEditarAsset(asset._id)}>
                    <FaEdit />
                  </button>
                    <button className="action-button delete" onClick={() => handleEliminarAsset(asset._id)}>
                  <FaTrash />
                </button>
                </div>
              </div>
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

export default AssetsSubidos;

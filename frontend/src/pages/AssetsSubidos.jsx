import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaEdit, FaTrash } from 'react-icons/fa';
import SidebarPerfil from '../Components/SidebarPerfil';
import axios from 'axios';
import defaultFoto from '../icons/default.jpg';
import '../styles/descargas.css';
import '../styles/assetCard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AssetsSubidos = () => {
  const [usuario, setUsuario] = useState(null);
  const [subidos, setSubidos] = useState([]);
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const resPerfil = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuario/perfil`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(resPerfil.data);

        const resSubidos = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuario/subidos`, {
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

  const handleEliminarAsset = (asset) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="react-confirm-alert-body">
          <h1>¿Eliminar este asset?</h1>
          <p>Estás a punto de eliminar <strong>{asset.titulo}</strong>.<br />Esta acción no se puede deshacer.</p>
          <div className="react-confirm-alert-button-group">
            <button
              onClick={async () => {
                onClose();
                await eliminarAsset(asset._id);
              }}
            >
              Sí, eliminar
            </button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        </div>
      )
    });
  };

  const eliminarAsset = async (id) => {
    try {
      setCargando(true);
      const token = localStorage.getItem("authToken");

      await axios.delete(`${process.env.REACT_APP_API_URL}/api/asset/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSubidos(prev => prev.filter(asset => asset._id !== id));
      toast.success("✅ Asset eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar asset:", err);
      toast.error("❌ No se pudo eliminar el asset.");
    } finally {
      setCargando(false);
    }
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

        <div className="descargas-grid">
          {subidos.map((asset) => (
            <div key={asset._id} className="asset-card">
              <div className="asset-image-wrapper">
                <img
                  src={obtenerUrlPrincipal(asset.archivos)}
                  alt={asset.titulo}
                  className="asset-image"
                  onClick={() => handleVerAsset(asset._id)}
                />
                <div className="asset-descargas asset-actions">
                  <button className="action-button edit" onClick={() => handleEditarAsset(asset._id)}>
                    <FaEdit />
                  </button>
                  <button className="action-button delete" onClick={() => handleEliminarAsset(asset)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="asset-title">{asset.titulo}</div>
              <div className="asset-formats">
                {asset.categoria} {asset.formatos_disponibles?.[0] && `(${asset.formatos_disponibles[0]})`}
              </div>
            </div>
          ))}
        </div>
      </div>
      {cargando && (
        <div className="overlay-carga">
          <div className="spinner"></div>
          <p className="mensaje-carga">Eliminando asset...</p>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AssetsSubidos;

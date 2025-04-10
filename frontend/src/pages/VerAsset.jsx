import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaDownload, FaHeart, FaShare, FaUser, FaCalendar, FaTag, FaFileAlt } from 'react-icons/fa';
import '../styles/verAsset.css';

const VerAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDescargar = async () => {
    const assetId = '67f83a234f3924688aa1d362';
  
    try {
      const response = await fetch(`http://localhost:5000/api/asset/${assetId}/descargar`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
  
      if (!response.ok) throw new Error("Error al descargar el asset");
  
      const disposition = response.headers.get("Content-Disposition");
      let nombreArchivo = `asset_${assetId}`;
      if (disposition && disposition.includes("filename=")) {
        nombreArchivo = disposition.split("filename=")[1].replace(/"/g, '');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Error en la descarga:", error);
      alert("Hubo un error al intentar descargar el asset.");
    }
  };
  
  
  

  useEffect(() => {
    // Simular carga de datos del asset
    setTimeout(() => {
      setAsset({
        id: 1,
        nombre: "Modelo 3D - Guerrero Medieval",
        descripcion: "Un modelo 3D detallado de un guerrero medieval con armadura completa. Incluye texturas en alta resolución y diferentes poses de animación. Perfecto para juegos de rol o proyectos históricos.",
        categoria: "Modelos 3D",
        formato: "FBX, OBJ",
        autor: "Juan Pérez",
        fechaSubida: "15/03/2024",
        descargas: 1250,
        valoracion: 4.8,
        precio: 0,
        licencia: "Creative Commons",
        imagenPrincipal: "/assets/warrior.webp",
        imagenes: [
          "/assets/warrior.webp",
          "/assets/warrior-pose1.jpg",
          "/assets/warrior-pose2.jpg"
        ],
        etiquetas: ["medieval", "guerrero", "3D", "personaje", "juego"]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando asset...</p>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="error-container">
        <h2>Asset no encontrado</h2>
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
    );
  }

  return (
    <div className="ver-asset-container">
      <div className="asset-header">
        <h1>{asset.nombre}</h1>
        <div className="asset-stats">
          <div className="stat">
            <FaStar className="icon" />
            <span>{asset.valoracion}</span>
          </div>
          <div className="stat">
            <FaDownload className="icon" />
            <span>{asset.descargas}</span>
          </div>
        </div>
      </div>

      <div className="asset-content">
        <div className="asset-gallery">
          <img src={asset.imagenPrincipal} alt={asset.nombre} className="main-image" />
          <div className="thumbnail-container">
            {asset.imagenes.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${asset.nombre} - Vista ${index + 1}`} 
                className="thumbnail"
                onClick={() => {/* Implementar vista previa */}}
              />
            ))}
          </div>
        </div>

        <div className="asset-info">
          <div className="info-section">
            <h2>Información del Asset</h2>
            <div className="info-grid">
              <div className="info-item">
                <FaUser className="icon" />
                <span>Autor:</span>
                <strong>{asset.autor}</strong>
              </div>
              <div className="info-item">
                <FaCalendar className="icon" />
                <span>Fecha:</span>
                <strong>{asset.fechaSubida}</strong>
              </div>
              <div className="info-item">
                <FaTag className="icon" />
                <span>Categoría:</span>
                <strong>{asset.categoria}</strong>
              </div>
              <div className="info-item">
                <FaFileAlt className="icon" />
                <span>Formato:</span>
                <strong>{asset.formato}</strong>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2>Descripción</h2>
            <p>{asset.descripcion}</p>
          </div>

          <div className="info-section">
            <h2>Etiquetas</h2>
            <div className="tags-container">
              {asset.etiquetas.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="info-section">
            <h2>Licencia y Uso</h2>
            <p>
              Este asset está disponible bajo licencia {asset.licencia}.
              {asset.precio === 0 ? " Descarga gratuita." : ` Precio: ${asset.precio}€`}
            </p>
          </div>

          <div className="action-buttons">
          <button className="btn-download" onClick={handleDescargar}>
            <FaDownload /> Descargar
          </button>

            <button className="btn-favorite">
              <FaHeart /> Favorito
            </button>
            <button className="btn-share">
              <FaShare /> Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerAsset; 
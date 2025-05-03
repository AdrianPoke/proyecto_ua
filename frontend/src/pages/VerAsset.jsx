import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload, FaHeart, FaShare, FaUser, FaCalendar, FaTag, FaFileAlt } from 'react-icons/fa';
import '../styles/verAsset.css';

const VerAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewIndex, setPreviewIndex] = useState(0);

  const dropboxToRaw = (url) => url?.replace("dl=0", "raw=1");

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/asset/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        if (!res.ok) throw new Error("Error al obtener el asset");
        const data = await res.json();
        setAsset(data);
      } catch (error) {
        console.error("❌ Error al cargar asset:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  const handleDescargar = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/asset/${id}/descargar`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!res.ok) throw new Error("Error al descargar el asset");

      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition");
      const fileNameMatch = disposition?.match(/filename="?(.+?)"?$/);
      const fileName = fileNameMatch ? fileNameMatch[1] : `asset_${id}.zip`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Error en la descarga:", error);
      alert("Hubo un error al intentar descargar el asset.");
    }
  };

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

  // Imagen principal
  const principal = asset.archivos.find((a) => a.tipo === 'principal');
  const imagenPrincipal = dropboxToRaw(principal?.url);

  // Imágenes previas
  const previas = asset.archivos
    .filter((a) => a.tipo === 'previa')
    .map((a) => dropboxToRaw(a.url));

  // Todas las imágenes del carrusel (principal + previas)
  const imagenes = [imagenPrincipal, ...previas];

  const handleNext = () => {
    setPreviewIndex((prev) => (prev + 1) % imagenes.length);
  };

  const handlePrev = () => {
    setPreviewIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <div className="ver-asset-container">
      <div className="asset-header">
        <h1>{asset.titulo}</h1>
        <div className="asset-stats">
          <div className="stat">
            <FaDownload className="icon" />
            <span>{asset.numero_descargas} descargas</span>
          </div>
        </div>
      </div>

      <div className="asset-content">
        <div className="asset-gallery">
          <img
            src={imagenes[previewIndex]}
            alt={`Vista ${previewIndex + 1}`}
            className="main-image"
          />

          {imagenes.length > 1 && (
            <div className="carousel-container">
              <button className="carousel-btn" onClick={handlePrev}>⟨</button>
              <img
                src={imagenes[previewIndex]}
                alt={`Vista previa ${previewIndex + 1}`}
                className="carousel-image"
              />
              <button className="carousel-btn" onClick={handleNext}>⟩</button>
            </div>
          )}
        </div>

        <div className="asset-info">
          <div className="info-section">
            <h2>Información del Asset</h2>
            <div className="info-grid">
              <div className="info-item">
                <FaUser className="icon" />
                <span>Autor:</span>
                <strong>{asset.autor?.nombre || "Desconocido"}</strong>
              </div>
              <div className="info-item">
                <FaCalendar className="icon" />
                <span>Fecha:</span>
                <strong>{new Date(asset.createdAt).toLocaleDateString()}</strong>
              </div>
              <div className="info-item">
                <FaTag className="icon" />
                <span>Categoría:</span>
                <strong>{asset.categoria}</strong>
              </div>
              <div className="info-item">
                <FaFileAlt className="icon" />
                <span>Formatos:</span>
                <strong>{asset.formatos_disponibles?.join(", ") || "Ninguno"}</strong>
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
              {asset.etiquetas?.map((tag, i) => (
                tag && <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="info-section">
            <h2>Privacidad</h2>
            <p>{asset.es_sensible ? "Este asset se considera sensible." : "No es un contenido sensible."}</p>
          </div>

          <div className="info-section">
            <h2>Archivos incluidos</h2>
            <ul>
              {asset.archivos?.map((file, i) => (
                <li key={i}>
                  <a href={dropboxToRaw(file.url)} target="_blank" rel="noopener noreferrer">
                    {file.nombre} ({file.tipo})
                  </a>
                </li>
              ))}
            </ul>
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

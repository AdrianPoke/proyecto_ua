import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload, FaHeart, FaShare, FaUser, FaCalendar, FaTag, FaFileAlt } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/verAsset.css';

const VerAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState("");

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

    const fetchComentarios = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/comentario/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setComentarios(data);
        } else {
          setComentarios([]);
        }
      } catch (error) {
        console.error("❌ Error al cargar comentarios:", error);
      }
    };

    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/usuario/perfil`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUsuarioActual(data);
        }
      } catch (error) {
        console.error("❌ Error al cargar perfil de usuario:", error);
      }
    };

    fetchAsset();
    fetchComentarios();
    fetchUsuario();
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

  const handleComentar = async () => {
    if (!nuevoComentario.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/comentario/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ contenido: nuevoComentario }),
      });

      if (!res.ok) throw new Error("No se pudo enviar el comentario");

      const data = await res.json();
      setComentarios((prev) => [data.comentario, ...prev]);
      setNuevoComentario("");
    } catch (error) {
      console.error("❌ Error al enviar comentario:", error);
      alert("Error al publicar el comentario.");
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

  const principal = asset.archivos.find((a) => a.tipo === 'principal');
  const imagenPrincipal = dropboxToRaw(principal?.url);

  const previas = asset.archivos
    .filter((a) => a.tipo === 'previa')
    .map((a) => dropboxToRaw(a.url));

  const imagenes = [imagenPrincipal, ...previas];

  const sliderSettings = {
    dots: imagenes.length > 1,
    infinite: imagenes.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: imagenes.length > 1,
    className: "asset-slider"
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
          <Slider {...sliderSettings}>
            {imagenes.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Vista ${index + 1}`} className="main-image" />
              </div>
            ))}
          </Slider>
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
              {asset.etiquetas?.map((tag, i) => tag && (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="info-section">
            <h2>Privacidad</h2>
            <p>{asset.es_sensible ? "Este asset se considera sensible." : "No es un contenido sensible."}</p>
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

      {/* Comentarios */}
      <div className="comentarios-container">
        <h2>Comentarios</h2>

        {/* Caja de nuevo comentario */}
        {usuarioActual && (
          <div className="nueva-caja-comentario">
            <img
              src={dropboxToRaw(usuarioActual.foto_perfil)}
              alt="usuario"
              className="comentario-avatar"
            />
            <div className="caja-comentario-input">
              <textarea
                rows="3"
                placeholder="Escribe un comentario..."
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
              />
              <button onClick={handleComentar}>Comentar</button>
            </div>
          </div>
        )}

        {/* Lista de comentarios */}
        {comentarios.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          comentarios.map((comentario) => (
            <div key={comentario._id} className="comentario-item">
              <img src={dropboxToRaw(comentario.usuario.foto_perfil)} alt="usuario" className="comentario-avatar" />
              <div>
                <strong>{comentario.usuario.nombre}</strong>
                <p>{comentario.contenido}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerAsset;

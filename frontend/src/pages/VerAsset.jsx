import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload, FaHeart, FaUser, FaCalendar, FaTag, FaFileAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/verAsset.css';
import xIcon from '../icons/x.png';
import igIcon from '../icons/instagram.png';
import linkedinIcon from '../icons/linkedin.webp';

const dropboxToRaw = (url) => url?.replace("dl=0", "raw=1");

const VerAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [esFavorito, setEsFavorito] = useState(false);
  const [cooldowns, setCooldowns] = useState({});
  const [descargando, setDescargando] = useState(false);


  const handleFavorito = async () => {
    try {
      const metodo = esFavorito ? "DELETE" : "POST";
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/usuario/favoritos/${id}`, {
        method: metodo,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.mensaje || "Error al actualizar favoritos");
      }

      setEsFavorito(!esFavorito);
      toast.success(esFavorito ? "Asset eliminado de favoritos" : "Asset añadido a favoritos");
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetRes, comentariosRes, usuarioRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/api/asset/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
          }),
          fetch(`${process.env.REACT_APP_API_URL}/api/comentario/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
          }),
          fetch(`${process.env.REACT_APP_API_URL}/api/usuario/perfil`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
          })
        ]);

        if (!assetRes.ok) throw new Error("Error al obtener el asset");
        const assetData = await assetRes.json();
        setAsset(assetData);

        const comentariosData = await comentariosRes.json();
        setComentarios(Array.isArray(comentariosData) ? comentariosData : []);

        if (usuarioRes.ok) {
          const usuarioData = await usuarioRes.json();
          setUsuarioActual(usuarioData);
          if (usuarioData.assets_favoritos?.includes(id)) {
            setEsFavorito(true);
          }
        }
      } catch (error) {
        console.error("Error en la carga de datos:", error);
        toast.error("Error al cargar datos del asset.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDescargar = async () => {
    try {
      setDescargando(true);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/asset/${id}/descargar`, {
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
      console.error("Error en la descarga:", error);
      toast.error("Hubo un error al intentar descargar el asset.");
    } finally {
      setDescargando(false); 
    }
  };


  const handleComentar = async () => {
    if (!nuevoComentario.trim()) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/comentario/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ contenido: nuevoComentario }),
      });

      if (!res.ok) throw new Error("No se pudo enviar el comentario");

      window.location.reload();
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      toast.error("Error al publicar el comentario.");
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
  const previas = asset.archivos.filter((a) => a.tipo === 'previa').map((a) => dropboxToRaw(a.url));
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
              <div className="info-item autor-item">
                <FaUser className="icon" />
                <span>Autor:</span>
                <img
                  src={dropboxToRaw(asset.autor?.foto_perfil)}
                  alt="Foto del autor"
                  className="autor-avatar"
                />
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
            <button className="btn-favorite" onClick={handleFavorito}>
              <FaHeart /> {esFavorito ? "Quitar Favorito" : "Favorito"}
            </button>
          </div>
        </div>
      </div>

      {/* Comentarios */}
      <div className="comentarios-container">
        <h2>Comentarios</h2>

        {usuarioActual && (
          <div className="nueva-caja-comentario">
            <img src={dropboxToRaw(usuarioActual.foto_perfil)} alt="usuario" className="comentario-avatar" />
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

        {comentarios.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          comentarios.map((comentario) => {
            const haDadoLike = comentario.usuarios_que_dieron_like?.includes(usuarioActual?._id);
            const estaEnCooldown = cooldowns[comentario._id] === true;

            const toggleLike = async () => {
              if (estaEnCooldown) return;

              setCooldowns(prev => ({ ...prev, [comentario._id]: true }));

              try {
                const metodo = haDadoLike ? 'DELETE' : 'POST';
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/comentario/${comentario._id}/like`, {
                  method: metodo,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                  }
                });

                if (!res.ok) throw new Error("Error al actualizar like");

                setComentarios(prev =>
                  prev.map(c => {
                    if (c._id === comentario._id) {
                      const nuevosLikes = haDadoLike ? c.likes - 1 : c.likes + 1;
                      const nuevosUsuarios = haDadoLike
                        ? c.usuarios_que_dieron_like.filter(id => id !== usuarioActual._id)
                        : [...c.usuarios_que_dieron_like, usuarioActual._id];
                      return { ...c, likes: nuevosLikes, usuarios_que_dieron_like: nuevosUsuarios };
                    }
                    return c;
                  })
                );
              } catch (error) {
                console.error("Error al cambiar el like:", error);
                toast.error("Hubo un error al cambiar el like.");
              } finally {
                setTimeout(() => {
                  setCooldowns(prev => ({ ...prev, [comentario._id]: false }));
                }, 1000);
              }
            };

            return (
              <div key={comentario._id} className="comentario-item">
                <img src={dropboxToRaw(comentario.usuario.foto_perfil)} alt="usuario" className="comentario-avatar" />
                <div style={{ flex: 1 }}>
                  <strong>{comentario.usuario.nombre}</strong>

                    <div className="comentario-redes">
                      {comentario.usuario.enlace_twitter && (
                        <a href={comentario.usuario.enlace_twitter} target="_blank" rel="noreferrer">
                          <img src={xIcon} alt="Twitter" className="social-icon" />
                        </a>
                      )}
                      {comentario.usuario.enlace_instagram && (
                        <a href={comentario.usuario.enlace_instagram} target="_blank" rel="noreferrer">
                          <img src={igIcon} alt="Instagram" className="social-icon" />
                        </a>
                      )}
                      {comentario.usuario.enlace_linkedin && (
                        <a href={comentario.usuario.enlace_linkedin} target="_blank" rel="noreferrer">
                          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                        </a>
                      )}
                    </div>

                    <p>{comentario.contenido}</p>

                  <button onClick={toggleLike} className="like-button">
                    <FaHeart style={{ color: haDadoLike ? 'red' : 'gray', marginRight: '6px' }} />
                    {comentario.likes}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
      {descargando && (
        <div className="overlay-carga">
          <div className="spinner"></div>
          <p className="mensaje-carga">Descargando asset, por favor espera...</p>
        </div>
      )}

    </div>
  );
};

export default VerAsset;

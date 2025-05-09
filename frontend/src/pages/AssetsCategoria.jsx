import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/assetsCategoria.css';

const AssetsCategoria = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Mapa para convertir el slug a nombre de categoría
  const convertirSlugANombre = (slug) => {
    const mapa = {
      modelos3d: "MODELOS 3D",
      graficos2d: "GRÁFICOS 2D",
      audio: "AUDIO",
      scripts: "SCRIPTS",
      ia: "IA",
      efectos3d: "EFECTOS 3D",
      materiales: "MATERIALES",
      paquetes: "PAQUETES"
    };
    return mapa[slug] || slug;
  };

  const dropboxToRaw = (url) => {
    return url?.replace("dl=0", "raw=1");
  };

  const handleVerAsset = (id) => {
    navigate(`/asset/${id}`);
  };

  useEffect(() => {
    const nombreCategoria = convertirSlugANombre(categoria);

    const obtenerAssets = async () => {
      try {
        setCargando(true);
        const response = await fetch(`http://localhost:5000/api/asset/buscar?categoria=${encodeURIComponent(nombreCategoria)}`);
        if (!response.ok) throw new Error('Error al obtener los assets del servidor.');
        const data = await response.json();
        setAssets(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerAssets();
  }, [categoria]);

  if (cargando) return <p>Cargando assets de la categoría "{categoria}"...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="categoria-container">
      <h1 className="categoria-title">Categoría: {convertirSlugANombre(categoria)}</h1>
      <div className="asset-grid">
        {assets.length > 0 ? (
          assets.map((asset) => (
            <div key={asset._id} className="asset-card" onClick={() => handleVerAsset(asset._id)}>
              <img
                src={dropboxToRaw(asset.imagenPrincipal) || 'https://via.placeholder.com/150'}
                alt={asset.titulo}
                className="asset-image"
              />
              <div className="asset-title">{asset.titulo}</div>
              <div className="asset-subtext">{asset.numero_descargas} descargas</div>
              <div className="asset-description">{asset.descripcion}</div>
            </div>
          ))
        ) : (
          <p>No hay assets disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default AssetsCategoria;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AssetCard from '../Components/AssetCard';
import '../styles/home.css';
import '../styles/categoriasGlobal.css';

const AssetsCategoria = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [infoCategoria, setInfoCategoria] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const convertirSlugANombre = (slug) => {
    const mapa = {
      modelos3d: "MODELOS 3D",
      graficos2d: "GRÁFICOS 2D",
      audio: "AUDIO",
      scripts: "SCRIPTS",
      ia: "INTELIGENCIA ARTIFICIAL",
      efectos3d: "EFECTOS 3D",
      materiales: "MATERIALES",
      paquetes: "PAQUETES"
    };
    return mapa[slug] || slug.toUpperCase();
  };

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        setCargando(true);
        const resCat = await fetch('http://localhost:5000/api/categoria');
        const categorias = await resCat.json();
        const nombreBuscado = convertirSlugANombre(categoria);
        const catActual = categorias.find(cat => cat.nombre.toUpperCase() === nombreBuscado);
        if (!catActual) throw new Error('Categoría no encontrada');
        setInfoCategoria(catActual);

        const resAssets = await fetch(`http://localhost:5000/api/asset/buscar?categoria=${encodeURIComponent(catActual.nombre)}`);
        const assetsData = await resAssets.json();
        setAssets(assetsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchCategoria();
  }, [categoria]);

  const handleVerAsset = (id) => {
    navigate(`/asset/${id}`);
  };

  if (cargando) return <p className="categoria-loading">Cargando categoría...</p>;
  if (error) return <p className="categoria-error">Error: {error}</p>;

  return (
    <div className="categoria-container">
      {/* Cabecera de categoría visual tipo mockup */}
      <div className="categoria-cabecera-mockup">
        <h1 className="categoria-nombre-header">{infoCategoria.nombre.toUpperCase()}</h1>
        <p className="categoria-descripcion">{infoCategoria.descripcion}</p>
      </div>

      {/* Divider */}
      <div className="section-divider">
        <span>Assets Populares</span>
      </div>

      {/* Grid de assets */}
      <div className="assets-grid">
        {assets.length > 0 ? (
          assets
            .slice()
            .sort((a, b) => b.numero_descargas - a.numero_descargas)
            .slice(0, 10)
            .map((asset) => (
              <AssetCard
                key={asset._id}
                asset={asset}
                onClick={() => handleVerAsset(asset._id)}
                mostrarDescargas={true}
              />
            ))
        ) : (
          <p>No hay assets disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default AssetsCategoria;

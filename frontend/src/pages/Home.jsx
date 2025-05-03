import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/home.css';

function Home() {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/asset/recientes?limite=12', {
          headers: {
            Authorization: 'Bearer TU_TOKEN_AQUI' // Reemplaza con tu token real
          }
        });
        setAssets(res.data);
      } catch (error) {
        console.error('Error al obtener assets recientes:', error);
      }
    };

    fetchAssets();
  }, []);

  const handleVerAsset = (id) => {
    navigate(`/asset/${id}`);
  };

  // Función auxiliar para convertir imagen de Dropbox a raw
  const dropboxToRaw = (url) => {
    return url?.replace('dl=0', 'raw=1');
  };

  return (
    <div className="home-container">
      <h2 className="home-title">Página Principal</h2>

      <div className="section-title">
        <span className="clock-icon">🕒</span> Assets Recientes
      </div>
      <div className="assets-grid">
        {assets.map((asset) => (
          <div key={asset._id} className="asset-card" onClick={() => handleVerAsset(asset._id)}>
            <img src={dropboxToRaw(asset.imagenPrincipal)} alt={asset.titulo} className="asset-image" />
            <div className="asset-title">{asset.titulo}</div>
          </div>
        ))}
      </div>

      <div className="section-title" style={{ marginTop: '40px' }}>
        Assets más descargados ⬇️
      </div>
      <div className="assets-grid">
        {assets
          .slice()
          .sort((a, b) => b.numero_descargas - a.numero_descargas)
          .slice(0, 6)
          .map((asset) => (
            <div key={`desc-${asset._id}`} className="asset-card" onClick={() => handleVerAsset(asset._id)}>
              <img src={dropboxToRaw(asset.imagenPrincipal)} alt={asset.titulo} className="asset-image" />
              <div className="asset-title">{asset.titulo}</div>
              <div className="asset-subtext">{asset.numero_descargas} descargas</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;

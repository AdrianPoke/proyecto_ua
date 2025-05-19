import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AssetCard from '../Components/AssetCard';
import '../styles/home.css';

function Home() {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/asset/recientes?limite=10', {
          headers: {
            Authorization: 'Bearer TU_TOKEN_AQUI'
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

  return (
    <div className="home-container">
      <h2 className="home-title">Página Principal</h2>

      <div className="section-divider">
        <span>Assets Recientes</span>
      </div>
      <div className="assets-grid">
        {assets.map((asset) => (
          <AssetCard
            key={asset._id}
            asset={asset}
            onClick={() => handleVerAsset(asset._id)}
          />
        ))}
      </div>

      <div className="section-divider">
        <span>Assets más descargados</span>
      </div>
      <div className="assets-grid">
        {assets
          .slice()
          .sort((a, b) => b.numero_descargas - a.numero_descargas)
          .slice(0, 6)
          .map((asset) => (
            <AssetCard
              key={`desc-${asset._id}`}
              asset={asset}
              onClick={() => handleVerAsset(asset._id)}
              mostrarDescargas={true}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;

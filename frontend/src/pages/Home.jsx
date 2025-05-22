import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AssetCard from '../Components/AssetCard';
import '../styles/home.css';

function Home() {
  const [usuario, setUsuario] = useState(null);
  const [assetsRecientes, setAssetsRecientes] = useState([]);
  const [assetsPopulares, setAssetsPopulares] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');

        // Cargar usuario
        const resUsuario = await axios.get('http://localhost:5000/api/usuario/perfil', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(resUsuario.data);

        // Recientes
        const resRecientes = await axios.get('http://localhost:5000/api/asset/recientes?limite=10');
        setAssetsRecientes(resRecientes.data);

        // Populares
        const resPopulares = await axios.get('http://localhost:5000/api/asset/populares?limite=7');
        setAssetsPopulares(resPopulares.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleVerAsset = (id) => {
    navigate(`/asset/${id}`);
  };

  return (
    <div className="home-container">
      {usuario && (
        <p className="mensaje-bienvenida">
          Bienvenido, <strong>{usuario.nombre}</strong> 👋
        </p>
      )}

      <h2 className="home-title">Página Principal</h2>

      <div className="section-divider">
        <span>Assets Recientes</span>
      </div>
      <div className="assets-grid">
        {assetsRecientes.map((asset) => (
          <AssetCard
            key={asset._id}
            asset={asset}
            onClick={() => handleVerAsset(asset._id)}
          />
        ))}
      </div>

      <br /><br />

      <div className="section-divider">
        <span>Assets más descargados</span>
      </div>
      <div className="assets-grid">
        {assetsPopulares.map((asset) => (
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

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
    const token = localStorage.getItem('authToken');
    // Intentar cargar el perfil del usuario
    if (token) {
      try {
        const resUsuario = await axios.get('http://localhost:5000/api/usuario/perfil', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setUsuario(resUsuario.data);
      } catch (error) {
        console.warn("⚠️ No se pudo cargar el usuario:", error.response?.data || error.message);
      }
    } else {
      console.log("No hay token: usuario no logueado");
    }

    // Cargar assets recientes
    try {
      const resRecientes = await axios.get('http://localhost:5000/api/asset/recientes?limite=10');
      setAssetsRecientes(resRecientes.data);
    } catch (error) {
      console.error("❌ Error al obtener assets recientes:", error.response?.data || error.message);
    }

    // Cargar assets populares
    try {

      const resPopulares = await axios.get('http://localhost:5000/api/asset/populares?limite=7');

      setAssetsPopulares(resPopulares.data);
    } catch (error) {
      console.error("❌ Error al obtener assets populares:", error.response?.data || error.message);
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import SidebarPerfil from '../Components/SidebarPerfil';
import axios from 'axios';
import '../styles/home.css'; // ⬅️ Usa el estilo de Home

const Favoritos = () => {
  const [usuario, setUsuario] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarioYFavoritos = async () => {
      try {
        const usuarioEjemplo = {
          nombre: "Andrew C. Curtis",
          email: "andrew@gmail.com",
          foto_perfil: "https://randomuser.me/api/portraits/men/32.jpg",
          enlace_twitter: "https://x.com/andrew",
          enlace_instagram: "https://instagram.com/andrew",
          enlace_linkedin: "https://linkedin.com/in/andrew",
        };
        setUsuario(usuarioEjemplo);

        const res = await axios.get('http://localhost:5000/api/usuario/favoritos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        setFavoritos(res.data);
      } catch (err) {
        console.error("Error al obtener favoritos:", err);
      }
    };

    fetchUsuarioYFavoritos();
  }, []);

  const handleVerAsset = (id) => {
    navigate(`/asset/${id}`);
  };

  const dropboxToRaw = (url) => url?.replace("dl=0", "raw=1");

  const obtenerUrlPrincipal = (archivos) => {
    const archivoPrincipal = archivos?.find(a => a.tipo === 'principal');
    return archivoPrincipal ? dropboxToRaw(archivoPrincipal.url) : "https://via.placeholder.com/300x200";
  };

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <SidebarPerfil usuario={usuario} />

      <div className="perfil-contenido">
        <div className="descargas-header">
          <h1 className="descargas-title">
            <FaStar className="title-icon" /> Mis Favoritos
          </h1>
        </div>

        <div className="assets-grid">
          {favoritos.map((asset) => (
            <div
              key={asset._id}
              className="asset-card"
              onClick={() => handleVerAsset(asset._id)}
            >
              <img
                src={obtenerUrlPrincipal(asset.archivos)}
                alt={asset.titulo}
                className="asset-image"
              />
              <div className="asset-title">{asset.titulo}</div>
              <div className="asset-subtext">
                {asset.categoria} {asset.formatos_disponibles?.[0] && `(${asset.formatos_disponibles[0]})`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favoritos;

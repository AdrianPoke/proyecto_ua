import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/sidebarPerfil.css';
import x from '../icons/x.png';
import ig from '../icons/instagram.png';
import linkedin from '../icons/linkedin.webp';

const SidebarPerfil = ({ usuario }) => {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="perfil-sidebar">
  <div className="perfil-info">
    <img
      src={usuario.foto_perfil}
      alt="Perfil"
      className="perfil-foto"
    />
    <h3 className="perfil-nombre">{usuario.nombre}</h3>
    <p className="perfil-email">{usuario.email}</p>

    <div className="perfil-redes">
  <a href={usuario.enlace_twitter} target="_blank" rel="noreferrer">
    <img src={x} alt="Twitter" className="social-icon" />
  </a>
  <a href={usuario.enlace_instagram} target="_blank" rel="noreferrer">
    <img src={ig} alt="Instagram" className="social-icon" />
  </a>
  <a href={usuario.enlace_linkedin} target="_blank" rel="noreferrer">
    <img src={linkedin} alt="LinkedIn" className="social-icon" />
  </a>
</div>

  </div>

  <button className="perfil-hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
    ☰ Opciones
  </button>

  <nav className={`perfil-menu ${menuAbierto ? "activo" : ""}`}>
    <button onClick={() => navigate("/perfil/descargas")}>📥 Tus Descargas</button>
    <button onClick={() => navigate("/perfil/datos")}>📝 Modificar Datos</button>
    <button onClick={() => navigate("/perfil/assets-subidos")}>📤 Assets Subidos</button>
    <button onClick={() => navigate("/perfil/favoritos")}>⭐ Favoritos</button>
    <button
      onClick={() => {
        localStorage.removeItem("authToken");
        navigate("/login");
        window.location.reload();
      }}
    >
      🚪 Cerrar Sesión
    </button>
  </nav>
</div>

  );
};

export default SidebarPerfil; 
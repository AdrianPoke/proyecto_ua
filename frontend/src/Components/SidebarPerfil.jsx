import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/sidebarPerfil.css';

const SidebarPerfil = ({ usuario }) => {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="perfil-sidebar">
      <img
        src={usuario.foto_perfil}
        alt="Perfil"
        className="perfil-foto"
      />
      <h3 className="perfil-nombre">{usuario.nombre}</h3>
      <p className="perfil-email">{usuario.email}</p>

      <div className="perfil-redes">
        <a href={usuario.enlace_twitter} target="_blank" rel="noreferrer">
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a href={usuario.enlace_instagram} target="_blank" rel="noreferrer">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href={usuario.enlace_linkedin} target="_blank" rel="noreferrer">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>

      {/* Botón hamburguesa solo visible en móvil */}
      <button className="perfil-hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
        ☰ Opciones
      </button>

      <nav className={`perfil-menu ${menuAbierto ? "activo" : ""}`}>
        <button onClick={() => navigate("/perfil/descargas")}>📥 Tus Descargas</button>
        <button onClick={() => navigate("/perfil/datos")}>📝 Modificar Datos</button>
        <button onClick={() => navigate("/perfil/assets-subidos")}>📤 Assets Subidos</button>
        <button onClick={() => navigate("/perfil/favoritos")}>⭐ Favoritos</button>
        <button onClick={() => navigate("/perfil/configuracion")}>⚙️ Configuración</button>
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
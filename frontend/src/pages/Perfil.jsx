import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/perfil.css";
import defaultFoto from "../icons/profile.png";
import x from "../icons/x.png";
import ig from "../icons/instagram.png";
import linkedin from "../icons/linkedin.webp";
const normalizarFoto = (url) => {
  if (!url) return defaultFoto;
  return url.includes("dropbox.com")
    ? url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "")
    : url;
};

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuario/perfil`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(res.data);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
      }
    };

    fetchPerfil();
  }, []);

  const normalizarFoto = (url) => {
    if (!url) return defaultFoto;
    return url.includes("dropbox.com")
      ? url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "")
      : url;
  };

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      {/* Panel izquierdo */}
      <div className="perfil-sidebar">
        <div className="perfil-info">
<img src={normalizarFoto(usuario.foto_perfil)} alt="Perfil" className="perfil-foto" />

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
            }}
          >
            🚪 Cerrar Sesión
          </button>
        </nav>
      </div>

      {/* Contenido a la derecha */}
      <div className="perfil-contenido">
        <h2>¡Bienvenido, {usuario.nombre.split(" ")[0]}!</h2>
        <p style={{ color: "var(--color-texto-secundario)" }}>
          Selecciona una opción del menú para gestionar tu perfil.
        </p>
      </div>
    </div>
  );
}

export default Perfil;

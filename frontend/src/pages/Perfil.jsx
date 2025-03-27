import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/perfil.css";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/usuarios/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error al obtener perfil");
        }

        const data = await res.json();
        setUsuario(data);
      } catch (error) {
        console.error("Error:", error);
        alert("No se pudo cargar el perfil.");
      }
    };

    fetchPerfil();
  }, [navigate]);

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      {/* Panel izquierdo */}
      <div className="perfil-sidebar">
        <img
          src={
            usuario.foto_perfil ||
            "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
          }
          alt="Perfil"
          className="perfil-foto"
        />
        <h3 className="perfil-nombre">{usuario.nombre}</h3>
        <p className="perfil-email">{usuario.email}</p>

        <div className="perfil-redes">
          {usuario.enlace_twitter && (
            <a href={usuario.enlace_twitter} target="_blank" rel="noreferrer">
              X
            </a>
          )}
          {usuario.enlace_instagram && (
            <a href={usuario.enlace_instagram} target="_blank" rel="noreferrer">
              📷
            </a>
          )}
          {usuario.enlace_linkedin && (
            <a href={usuario.enlace_linkedin} target="_blank" rel="noreferrer">
              🔗
            </a>
          )}
        </div>

        <nav className="perfil-menu">
          <button onClick={() => navigate("/perfil/descargas")}>📥 Tus Descargas</button>
          <button onClick={() => navigate("/perfil/datos")}>📝 Modificar Datos</button>
          <button onClick={() => navigate("/perfil/subidos")}>📤 Assets Subidos</button>
          <button onClick={() => navigate("/perfil/favoritos")}>⭐ Favoritos</button>
          <button onClick={() => navigate("/perfil/configuracion")}>⚙️ Configuración</button>
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

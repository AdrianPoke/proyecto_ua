import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/datos.css"; // Hereda de perfil.css y añade estilos propios

function Datos() {
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Usuario de ejemplo
    const usuarioEjemplo = {
      nombre: "Andrew C. Curtis",
      email: "andrew@gmail.com",
      foto_perfil: "https://randomuser.me/api/portraits/men/32.jpg",
      enlace_twitter: "https://x.com/tu_usuario",
      enlace_instagram: "https://www.instagram.com/tu_usuario",
      enlace_linkedin: "https://www.linkedin.com/in/tu_usuario",
    };

    setTimeout(() => setUsuario(usuarioEjemplo), 500); // Simulación de carga
  }, []);

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      {/* Panel izquierdo */}
      <div className="perfil-sidebar">
        <img src={usuario.foto_perfil} alt="Perfil" className="perfil-foto" />
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

      {/* Contenido derecho */}
      <div className="perfil-datos">
        <h2 className="seccion-titulo">Datos Personales</h2>

        <div className="datos-form">
          <div className="form-col">
            <label>Nombre y Apellidos reales de Usuario:</label>
            <input type="text" defaultValue={usuario.nombre} className="input-text" />
          </div>

          <div className="form-col">
            <label>Email:</label>
            <input type="email" defaultValue={usuario.email} className="input-email" />
          </div>

          <div className="form-col">
            <label>Nueva Contraseña:</label>
            <input type="password" placeholder="Mínimo 10 caracteres" className="input-password" />
          </div>

          <div className="form-col">
            <label>Foto de Perfil:</label>
            <div className="drop-zone">
              <p>
                Arrastra y suelta tus archivos <br /> o haz clic para
                seleccionarlos
              </p>
              <input type="file" />
            </div>
          </div>
        </div>

        <h2 className="seccion-titulo">Redes Sociales</h2>

        <div className="datos-form">
          <div className="form-col">
            <label>X / Twitter:</label>
            <input type="url" defaultValue={usuario.enlace_twitter} className="input-url" />
          </div>
          <div className="form-col">
            <label>Instagram:</label>
            <input type="url" defaultValue={usuario.enlace_instagram} className="input-url" />
          </div>
          <div className="form-col">
            <label>Linkedin:</label>
            <input type="url" defaultValue={usuario.enlace_linkedin} className="input-url" />
          </div>
        </div>

        <button className="boton-verde">Modificar</button>
      </div>
    </div>
  );
}

export default Datos;
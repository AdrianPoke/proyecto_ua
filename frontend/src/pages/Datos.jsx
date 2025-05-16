import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/datos.css";
import defaultFoto from "../icons/default.jpg";
import x from "../icons/x.png";
import ig from "../icons/instagram.png";
import linkedin from "../icons/linkedin.webp";
const normalizarFoto = (url) => {
  if (!url) return defaultFoto;
  return url.includes("dropbox.com")
    ? url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "")
    : url;
};

function Datos() {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    contraseña: "",
    enlace_twitter: "",
    enlace_instagram: "",
    enlace_linkedin: "",
    foto_perfil: null,
  });
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("http://localhost:5000/api/usuario/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(res.data);
        setFormData({
          nombre: res.data.nombre,
          contraseña: "",
          enlace_twitter: res.data.enlace_twitter || "",
          enlace_instagram: res.data.enlace_instagram || "",
          enlace_linkedin: res.data.enlace_linkedin || "",
          foto_perfil: null,
        });
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };
    fetchUsuario();
  }, []);

  const normalizarUrlDropbox = (url) => {
    if (!url) return defaultFoto;
    if (url.includes("dropbox.com")) {
      return url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "");
    }
    return url;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, foto_perfil: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const data = new FormData();
      data.append("nombre", formData.nombre);
      if (formData.contraseña) data.append("contraseña", formData.contraseña);
      data.append("enlace_twitter", formData.enlace_twitter);
      data.append("enlace_instagram", formData.enlace_instagram);
      data.append("enlace_linkedin", formData.enlace_linkedin);
      if (formData.foto_perfil) data.append("foto_perfil", formData.foto_perfil);

      await axios.put("http://localhost:5000/api/usuario/perfil", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Perfil actualizado correctamente");
    } catch (error) {
      console.error("❌ Error al actualizar el perfil", error);
      alert("❌ Error al actualizar el perfil");
    }
  };

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  const fotoPerfil = normalizarUrlDropbox(usuario.foto_perfil);

  return (
    <div className="perfil-container">
      <aside className="perfil-sidebar">
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
          <button onClick={() => navigate("/perfil/subidos")}>📤 Assets Subidos</button>
          <button onClick={() => navigate("/perfil/favoritos")}>⭐ Favoritos</button>
          <button onClick={() => { localStorage.removeItem("authToken"); navigate("/login"); }}>
            🚪 Cerrar Sesión
          </button>
        </nav>
      </aside>

      <main className="perfil-main">
        <div className="subir-asset-header">
          <h2 className="subir-asset-title">Editar Perfil</h2>
        </div>

        <form className="subir-asset-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="subir-columna">
            <label>Foto de Perfil <span className="recomendacion">(JPG, PNG o GIF - máx. 5MB)</span></label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <label>X / Twitter:</label>
            <input type="url" name="enlace_twitter" value={formData.enlace_twitter} onChange={handleChange} />

            <label>Instagram:</label>
            <input type="url" name="enlace_instagram" value={formData.enlace_instagram} onChange={handleChange} />

            <label>LinkedIn:</label>
            <input type="url" name="enlace_linkedin" value={formData.enlace_linkedin} onChange={handleChange} />
          </div>

          <div className="subir-columna">
            <label>Nombre y Apellidos:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>Nueva Contraseña</label>
            <input type="password" name="contraseña" placeholder="Mínimo 10 caracteres" onChange={handleChange} />

            <button type="submit" className="subir-asset-boton">Modificar</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Datos;

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
  const [errores, setErrores] = useState({});
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

  const validarCampo = (name, value) => {
    let msg = "";

    if (name === "nombre" && !value.trim()) msg = "El nombre no puede estar vacío.";
    if (name === "contraseña" && value && value.length < 10)
      msg = "La contraseña debe tener al menos 10 caracteres.";
    if (["enlace_twitter", "enlace_instagram", "enlace_linkedin"].includes(name)) {
      if (value && !/^https?:\/\/.+\..+/.test(value)) {
        msg = "Debe ser una URL válida.";
      }
    }

    setErrores((prev) => ({ ...prev, [name]: msg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validarCampo(name, value);
  };

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo && archivo.size > 5 * 1024 * 1024) {
      setErrores((prev) => ({
        ...prev,
        foto_perfil: "La imagen no puede superar los 5MB.",
      }));
    } else {
      setErrores((prev) => ({ ...prev, foto_perfil: "" }));
    }
    setFormData((prev) => ({ ...prev, foto_perfil: archivo }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación final antes de enviar
    let hayErrores = false;
    Object.entries(formData).forEach(([key, val]) => {
      validarCampo(key, val);
      if (errores[key]) hayErrores = true;
    });

    if (hayErrores) {
      alert("Corrige los errores antes de enviar.");
      return;
    }

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
      window.location.reload();
    } catch (error) {
      console.error("❌ Error al actualizar el perfil", error);
      alert("❌ Error al actualizar el perfil");
    }
  };

  if (!usuario) {
    return <p style={{ color: "white", padding: "20px" }}>Cargando perfil...</p>;
  }

  const fotoPerfil = normalizarFoto(usuario.foto_perfil);

  return (
    <div className="perfil-container">
      <aside className="perfil-sidebar">
        <div className="perfil-info">
          <img src={fotoPerfil} alt="Perfil" className="perfil-foto" />
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
        <button className="perfil-hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>☰ Opciones</button>
        <nav className={`perfil-menu ${menuAbierto ? "activo" : ""}`}>
          <button onClick={() => navigate("/perfil/descargas")}>📥 Tus Descargas</button>
          <button onClick={() => navigate("/perfil/datos")}>📝 Modificar Datos</button>
          <button onClick={() => navigate("/perfil/assets-subidos")}>📤 Assets Subidos</button>
          <button onClick={() => navigate("/perfil/favoritos")}>⭐ Favoritos</button>
          <button onClick={() => { localStorage.removeItem("authToken"); navigate("/login"); }}>🚪 Cerrar Sesión</button>
        </nav>
      </aside>

      <main className="perfil-main">
        <div className="subir-asset-header">
          <h2 className="subir-asset-title">Editar Perfil</h2>
        </div>

        <form className="subir-asset-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="subir-columna">
            <label>
              Foto de Perfil <span className="recomendacion">(JPG, PNG o GIF - máx. 5MB)</span>
              {errores.foto_perfil && <span className="error-text"> – {errores.foto_perfil}</span>}
            </label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <label>
              Tu perfil de X:
              {errores.enlace_twitter && <span className="error-text"> – {errores.enlace_twitter}</span>}
            </label>
            <input
              type="url"
              name="enlace_twitter"
              value={formData.enlace_twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/usuario"
            />

            <label>
              Tu perfil de Instagram:
              {errores.enlace_instagram && <span className="error-text"> – {errores.enlace_instagram}</span>}
            </label>
            <input
              type="url"
              name="enlace_instagram"
              value={formData.enlace_instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/usuario"
            />

            <label>
              Tu perfil de LinkedIn:
              {errores.enlace_linkedin && <span className="error-text"> – {errores.enlace_linkedin}</span>}
            </label>
            <input
              type="url"
              name="enlace_linkedin"
              value={formData.enlace_linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/usuario"
            />
          </div>

          <div className="subir-columna">
            <label>
              Nombre y Apellidos:
              {errores.nombre && <span className="error-text"> – {errores.nombre}</span>}
            </label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>
              Nueva Contraseña:
              {errores.contraseña && <span className="error-text"> – {errores.contraseña}</span>}
            </label>
            <input type="password" name="contraseña" placeholder="Mínimo 10 caracteres" onChange={handleChange} />

            <button type="submit" className="subir-asset-boton">Modificar</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Datos;

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
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
  nombre: "",
  contrasenya: "",
  usuario_twitter: "",
  usuario_instagram: "",
  usuario_linkedin: "",
  foto_perfil: null,
});

  const [errores, setErrores] = useState({});
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuario/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(res.data);
        setFormData({
        nombre: res.data.nombre,
        contrasenya: "",
        usuario_twitter: res.data.enlace_twitter?.split("/").pop() || "",
        usuario_instagram: res.data.enlace_instagram?.split("/").pop() || "",
        usuario_linkedin: res.data.enlace_linkedin?.split("/").pop() || "",
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

    if (name === "nombre" && !value.trim()) {
      msg = "El nombre no puede estar vacío.";
    }

    if (name === "contrasenya" && value && value.length < 10) {
      msg = "La contraseña debe tener al menos 10 caracteres.";
    }

    if (["usuario_twitter", "usuario_instagram", "usuario_linkedin"].includes(name)) {
      if (/\s/.test(value)) {
        msg = "El nombre de usuario no debe contener espacios.";
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

  let nuevosErrores = {};
  Object.entries(formData).forEach(([key, val]) => {
    let msg = "";

    if (key === "nombre" && !val.trim()) msg = "El nombre no puede estar vacío.";
    if (key === "contrasenya" && val && val.length < 10)
      msg = "La contraseña debe tener al menos 10 caracteres.";
    if (
      ["enlace_twitter", "enlace_instagram", "enlace_linkedin"].includes(key) &&
      val &&
      !/^https?:\/\/.+\..+/.test(val)
    ) {
      msg = "Debe ser una URL válida.";
    }
    if (key === "foto_perfil" && formData.foto_perfil?.size > 5 * 1024 * 1024) {
      msg = "La imagen no puede superar los 5MB.";
    }

    if (msg) nuevosErrores[key] = msg;
  });

  setErrores(nuevosErrores);
  if (Object.keys(nuevosErrores).length > 0) return;

  try {
    setIsLoading(true);

    const token = localStorage.getItem("authToken");
    const data = new FormData();
    data.append("nombre", formData.nombre);
    if (formData.contrasenya) data.append("contrasenya", formData.contrasenya);
    data.append("enlace_twitter", formData.usuario_twitter ? `https://twitter.com/${formData.usuario_twitter}` : "");
    data.append("enlace_instagram", formData.usuario_instagram ? `https://instagram.com/${formData.usuario_instagram}` : "");
    data.append("enlace_linkedin", formData.usuario_linkedin ? `https://linkedin.com/in/${formData.usuario_linkedin}` : "");
    if (formData.foto_perfil) data.append("foto_perfil", formData.foto_perfil);

    // 🔍 LOG DEL FORM DATA
    console.log("🔍 FormData que se va a enviar:");
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    await axios.put(`${process.env.REACT_APP_API_URL}/api/usuario/perfil`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setIsLoading(false);
    window.location.reload();
  } catch (error) {
    console.error("❌ Error al actualizar el perfil", error);
    setIsLoading(false);
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
              Foto de Perfil <span className="recomendacion">(JPG, PNG o avif - máx. 5MB)</span>
              {errores.foto_perfil && <span className="error-text"> – {errores.foto_perfil}</span>}
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.avif"
              onChange={handleFileChange}
            />


            <label>
              Tu usuario de X:
              {errores.usuario_twitter && <span className="error-text"> – {errores.usuario_twitter}</span>}
            </label>
            <input
              type="text"
              name="usuario_twitter"
              value={formData.usuario_twitter}
              onChange={handleChange}
              placeholder="<usuario>"
            />

            <label>
              Tu usuario de Instagram:
              {errores.usuario_instagram && <span className="error-text"> – {errores.usuario_instagram}</span>}
            </label>
            <input
              type="text"
              name="usuario_instagram"
              value={formData.usuario_instagram}
              onChange={handleChange}
              placeholder="<usuario>"
            />

            <label>
              Tu usuario de LinkedIn:
              {errores.usuario_linkedin && <span className="error-text"> – {errores.usuario_linkedin}</span>}
            </label>
            <input
              type="text"
              name="usuario_linkedin"
              value={formData.usuario_linkedin}
              onChange={handleChange}
              placeholder="<usuario>"
            />

          </div>

          <div className="subir-columna">
            <label>
              Nombre y Apellidos:
              {errores.nombre && <span className="error-text"> – {errores.nombre}</span>}
            </label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>
              Nueva contraseña:
              {errores.contrasenya && <span className="error-text"> – {errores.contrasenya}</span>}
            </label>
            <input type="password" name="contrasenya" placeholder="Mínimo 10 caracteres" onChange={handleChange} />

            <button type="submit" className="subir-asset-boton">Modificar</button>
            <p className="instrucciones">
              Si por ejemplo tu usuario es <strong>@maria_123</strong>, en los campos de X, instagram y Linkedin debes escribir solamente <strong>maria_123</strong>.
            </p>
          </div>
        </form>
        {isLoading && (
          <div className="overlay-carga">
            <div className="spinner"></div>
            <p className="mensaje-carga">Guardando cambios, por favor espera...</p>
          </div>
        )}

      </main>
      
    </div>
  );
}

export default Datos;

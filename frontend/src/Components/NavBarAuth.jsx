import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import "../styles/NavBarAuth.css";
import logo from "../logo.png";
import defaultFoto from "../icons/profile.png";
import axios from "axios";

function NavBarAuth() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("http://localhost:5000/api/usuario/perfil", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(res.data);
      } catch (err) {
        console.error("Error al obtener el perfil:", err);
      }
    };

    fetchPerfil();

    const cerrar = () => setMenuAbierto(false);
    window.addEventListener("scroll", cerrar);
    return () => window.removeEventListener("scroll", cerrar);
  }, []);

  const normalizarFotoPerfil = (url) => {
    if (!url) return defaultFoto;
    return url.includes("dropbox.com")
      ? url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "")
      : url;
  };

  const realizarBusqueda = () => {
    if (busqueda.trim() !== "") {
      navigate(`/busqueda-avanzada?q=${encodeURIComponent(busqueda.trim())}`);
      setBusqueda("");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Inserte palabras clave ..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") realizarBusqueda();
              }}
            />
            <button className="search-button" onClick={realizarBusqueda}>
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Menú horizontal */}
        <div className="navbar-right">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/subir-assets" className="nav-link">
            <FaPlusCircle className="icon" /> Subir Assets
          </Link>
          <Link to="/categorias" className="nav-link">Categorías</Link>
          <Link to="/busqueda-avanzada" className="nav-link">Búsqueda Avanzada</Link>
          <Link to="/perfil" className="profile-icon">
            <img src={normalizarFotoPerfil(usuario?.foto_perfil)} alt="Perfil" />
          </Link>
        </div>

        {/* Botón hamburguesa */}
        <button className="hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
          ☰
        </button>
      </nav>

      {/* Sidebar móvil */}
      <div className={`sidebar ${menuAbierto ? "activo" : ""}`}>
        <Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link>
        <Link to="/subir-assets" onClick={() => setMenuAbierto(false)}>Subir Assets</Link>
        <Link to="/categorias" onClick={() => setMenuAbierto(false)}>Categorías</Link>
        <Link to="/busqueda-avanzada" onClick={() => setMenuAbierto(false)}>Búsqueda Avanzada</Link>
        <Link to="/perfil" onClick={() => setMenuAbierto(false)}>Perfil</Link>
      </div>

      {/* Cierre lateral al hacer clic */}
      {menuAbierto && <div className="sidebar-overlay" onClick={() => setMenuAbierto(false)} />}
    </>
  );
}

export default NavBarAuth;

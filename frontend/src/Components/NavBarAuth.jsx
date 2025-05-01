import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import "../styles/NavBarAuth.css";
import logo from "../logo.png";
import pr from "../icons/profile.png";

function NavBarAuth() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const cerrar = () => setMenuAbierto(false);
    window.addEventListener("scroll", cerrar);
    return () => window.removeEventListener("scroll", cerrar);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="search-bar">
            <input type="text" placeholder="Inserte palabras clave ..." />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Menú horizontal (escritorio) */}
        <div className="navbar-right">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/subir-assets" className="nav-link">
            <FaPlusCircle className="icon" /> Subir Assets
          </Link>
          <Link to="/categorias" className="nav-link">Categorías</Link>
          <Link to="/busqueda-avanzada" className="nav-link">Búsqueda Avanzada</Link>
          <Link to="/perfil" className="profile-icon">
            <img src={pr} alt="Perfil" />
          </Link>
        </div>

        {/* Botón hamburguesa (solo móvil) */}
        <button className="hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
          ☰
        </button>
      </nav>

      {/* Sidebar lateral (móvil) */}
      <div className={`sidebar ${menuAbierto ? "activo" : ""}`}>
        <Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link>
        <Link to="/subir-assets" onClick={() => setMenuAbierto(false)}>Subir Assets</Link>
        <Link to="/categorias" onClick={() => setMenuAbierto(false)}>Categorías</Link>
        <Link to="/busqueda-avanzada" onClick={() => setMenuAbierto(false)}>Búsqueda Avanzada</Link>
        <Link to="/perfil" onClick={() => setMenuAbierto(false)}>Perfil</Link>
      </div>

      {/* Fondo que cierra menú al hacer clic */}
      {menuAbierto && <div className="sidebar-overlay" onClick={() => setMenuAbierto(false)} />}
    </>
  );
}

export default NavBarAuth;

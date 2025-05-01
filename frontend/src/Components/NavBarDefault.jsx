import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../styles/NavBarAuth.css";
import logo from "../logo.png";

function NavBarDefault() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cerrar menú al hacer scroll
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

        {/* Menú horizontal para escritorio */}
        <div className="navbar-right">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/categorias" className="nav-link">Categorías</Link>
          <Link to="/busqueda-avanzada" className="nav-link">Búsqueda Avanzada</Link>
          <Link to="/registro" className="nav-link">Regístrate</Link>
          <Link to="/login" className="nav-link login-button">Iniciar Sesión</Link>
        </div>

        {/* Botón hamburguesa solo visible en móvil */}
        <button className="hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
          ☰
        </button>
      </nav>

      {/* Sidebar para móvil */}
      <div className={`sidebar ${menuAbierto ? "activo" : ""}`}>
        <Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link>
        <Link to="/categorias" onClick={() => setMenuAbierto(false)}>Categorías</Link>
        <Link to="/busqueda-avanzada" onClick={() => setMenuAbierto(false)}>Búsqueda Avanzada</Link>
        <Link to="/registro" onClick={() => setMenuAbierto(false)}>Regístrate</Link>
        <Link to="/login" onClick={() => setMenuAbierto(false)}>Iniciar Sesión</Link>
      </div>

      {/* Capa de fondo que cierra el menú al hacer clic */}
      {menuAbierto && <div className="sidebar-overlay" onClick={() => setMenuAbierto(false)} />}
    </>
  );
}

export default NavBarDefault;

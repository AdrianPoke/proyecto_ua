import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../styles/NavBarAuth.css"; // Reutilizamos el CSS de Auth
import logo from "../logo.png";

function NavBarDefault() {
  return (
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

      <div className="navbar-right">
        <Link to="/categorias" className="nav-link">Categorías</Link>
        <Link to="/busqueda-avanzada" className="nav-link">Búsqueda Avanzada</Link>
        <Link to="/registro" className="nav-link">Regístrate</Link>
        <Link to="/login" className="nav-link login-button">Iniciar Sesión</Link>
      </div>
    </nav>
  );
}

export default NavBarDefault;

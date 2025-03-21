import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBarDefault.css"; // Importamos los estilos
import logo from "../logo.png";

function NavBarDefault() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
        </Link>
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

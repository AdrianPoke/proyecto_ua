import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import "../styles/NavBarAuth.css"; // Importa los estilos
import logo from "../logo.png";


function NavBarAuth() {
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
        <Link to="/subir-assets" className="nav-link">
          <FaPlusCircle className="icon" /> Subir Assets
        </Link>
        <Link to="/categorias" className="nav-link">Categorías</Link>
        <Link to="/busqueda-avanzada" className="nav-link">Búsqueda Avanzada</Link>
        <Link to="/perfil" className="profile-icon">
          <img src="/perfil.jpg" alt="Perfil" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBarAuth;

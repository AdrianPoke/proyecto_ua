import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../styles/NavBarAuth.css";
import logo from "../logo.png";
import { useAuth } from "../context/AuthContext";

function NavBarDefault() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const { usuario, cargando } = useAuth(); // ✅ Ahora sí está definido `cargando`

  useEffect(() => {
    const cerrar = () => setMenuAbierto(false);
    window.addEventListener("scroll", cerrar);
    return () => window.removeEventListener("scroll", cerrar);
  }, []);

  const realizarBusqueda = () => {
    if (busqueda.trim() !== "") {
      navigate(`/busqueda-avanzada?q=${encodeURIComponent(busqueda.trim())}`);
      setBusqueda("");
    }
  };

  // ✅ No renderizar nada hasta saber si hay usuario o no
  if (cargando) return null;
  if (usuario) return null;

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

        <div className="navbar-right">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/categorias" className="nav-link">Categorías</Link>
          <Link to="/busqueda-avanzada" className="nav-link">Búsqueda Avanzada</Link>
          <Link to="/registro" className="nav-link">Regístrate</Link>
          <Link to="/login" className="nav-link login-button">Iniciar Sesión</Link>
        </div>

        <button className="hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
          ☰
        </button>
      </nav>

      <div className={`sidebar ${menuAbierto ? "activo" : ""}`}>
        <Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link>
        <Link to="/categorias" onClick={() => setMenuAbierto(false)}>Categorías</Link>
        <Link to="/busqueda-avanzada" onClick={() => setMenuAbierto(false)}>Búsqueda Avanzada</Link>
        <Link to="/registro" onClick={() => setMenuAbierto(false)}>Regístrate</Link>
        <Link to="/login" onClick={() => setMenuAbierto(false)}>Iniciar Sesión</Link>
      </div>

      {menuAbierto && <div className="sidebar-overlay" onClick={() => setMenuAbierto(false)} />}
    </>
  );
}

export default NavBarDefault;

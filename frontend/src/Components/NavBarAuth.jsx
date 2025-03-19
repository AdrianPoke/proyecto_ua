import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Usamos el hook useNavigate

function NavBarAuth() {
  const navigate = useNavigate(); // Usamos el hook useNavigate para navegar

  const handleLogout = () => {
    // Elimina el token de localStorage al hacer logout
    localStorage.removeItem("authToken");

    // Redirige al login después de hacer logout
    navigate("/home");
    window.location.reload();

  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
        <li><Link to="/categorias">Explorar Categorías</Link></li>
        <li>
          <button onClick={handleLogout}>Logout</button> {/* Llamamos a logout */}
        </li>
      </ul>
    </nav>
  );
}

export default NavBarAuth;

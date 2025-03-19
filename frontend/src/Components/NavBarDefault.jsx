import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Usamos el hook useNavigate

function NavBarDefault({ setIsAuthenticated }) {
  const navigate = useNavigate(); // Usamos el hook useNavigate para navegar

  const handleFakeLogin = () => {
    // Simular un login falso, configurando el estado de autenticación en localStorage
    localStorage.setItem("isAuthenticated", "true");  // Seteamos el estado de autenticación
    setIsAuthenticated(true); // Actualizamos el estado en React

    // Redirigir inmediatamente a la página de inicio (sin recargar la página)
    navigate("/");  // Esto navegará a la ruta de inicio ("/")
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li> {/* Enlace a Home */}
        <li><Link to="/login">Login</Link></li> {/* Enlace a Login */}
        <li><Link to="/registro">Register</Link></li> {/* Enlace a Registro */}
        {/* Botón de falso login */}
        <li>
          <button onClick={handleFakeLogin}>Falso Login</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBarDefault;

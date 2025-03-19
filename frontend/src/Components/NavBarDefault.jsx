import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Usamos el hook useNavigate

function NavBarDefault() {
  const navigate = useNavigate(); // Usamos el hook useNavigate para navegar

  const handleFakeLogin = () => {
    // Simula un login, guardando el token en localStorage
    localStorage.setItem("authToken", "sampleToken");  // Guarda el token

    // Redirige inmediatamente a la página de inicio (sin recargar la página)
    navigate("/");  // Esto navegará a la ruta de inicio ("/")
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li> {/* Enlace a Home */}
        <li><Link to="/login">Login</Link></li> {/* Enlace a Login */}
        <li><Link to="/registro">Register</Link></li> {/* Enlace a Registro */}
        <li>
          <button onClick={handleFakeLogin}>Falso Login</button> {/* Botón de falso login */}
        </li>
      </ul>
    </nav>
  );
}

export default NavBarDefault;

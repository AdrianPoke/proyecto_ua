import React from "react";
import { Link } from "react-router-dom"; // Usamos el hook useNavigate

function NavBarDefault() {


  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li> {/* Enlace a Home */}
        <li><Link to="/categorias">Categorias</Link></li> {/* Enlace a Home */}
        <li><Link to="/busqueda-avanzada">Búsqueda Avanzada</Link></li> {/* Enlace a Home */}
        <li><Link to="/registro">Registrate</Link></li> {/* Enlace a Registro */}
        <li><Link to="/login">Iniciar Sesión</Link></li>
      </ul>
    </nav>
  );
}

export default NavBarDefault;

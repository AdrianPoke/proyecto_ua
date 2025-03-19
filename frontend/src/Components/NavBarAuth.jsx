import React from "react";
import { Link } from "react-router-dom"; // Usamos Link para navegación
import useLogout from "../hooks/useLogout"; // Importamos el hook de logout

function NavBarAuth({ setIsAuthenticated }) {
  const logout = useLogout(setIsAuthenticated);  // Usamos el hook de logout

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>  {/* Enlace a Home */}
        <li><Link to="/Perfil">Perfil</Link></li>  {/* Enlace a Perfil */}
        <li><Link to="/Categorias">Explorar Categorías</Link></li>  {/* Enlace a Assets */}
        <li>
          <button onClick={logout}>Logout</button> {/* Llamamos a logout */}
        </li>
      </ul>
    </nav>
  );
}

export default NavBarAuth;

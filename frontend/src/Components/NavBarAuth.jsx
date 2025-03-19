import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout"; // Importar el hook de logout

function NavBarAuth() {
  const logout = useLogout(); // Usar el hook de logout

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/perfil">Profile</Link></li>
        <li>
          <Link to="#" onClick={logout}>Logout</Link> {/* Usar el enlace para hacer logout */}
        </li>
      </ul>
    </nav>
  );
}

export default NavBarAuth;

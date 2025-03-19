import React from "react";
import NavBarDefault from "./NavBarDefault";
import NavBarAuth from "./NavBarAuth";
import Footer from "./Footer";
import useAuth from "../hooks/useAuth"; // Importa el custom hook

function Layout({ children }) {
  const isAuthenticated = useAuth(); // Usa el hook para obtener el estado de autenticación

  return (
    <div>
      {/* Barra de navegación condicional */}
      <header>
        {isAuthenticated ? <NavBarAuth /> : <NavBarDefault />}
      </header>

      {/* Contenido principal */}
      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;

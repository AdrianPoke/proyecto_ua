import React from "react";
import NavBarDefault from "./NavBarDefault";
import NavBarAuth from "./NavBarAuth";
import Footer from "./Footer";
import useAuth from "../hooks/useAuth";  // Usamos el hook para la autenticación

function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useAuth();  // Traemos el estado de autenticación

  return (
    <div>
      {/* Barra de navegación condicional */}
      <header>
        {isAuthenticated ? <NavBarAuth setIsAuthenticated={setIsAuthenticated} /> : <NavBarDefault setIsAuthenticated={setIsAuthenticated} />}
      </header>

      {/* Contenido principal */}
      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;

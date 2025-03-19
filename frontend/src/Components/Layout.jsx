import React, { useEffect, useState } from "react";
import NavBarDefault from "./NavBarDefault"; // Importar NavBarDefault
import NavBarAuth from "./NavBarAuth"; // Importar NavBarAuth
import Footer from "./Footer";

function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  return (
    <div>
      {/* Barra de navegación condicional */}
      <header>
        {isAuthenticated ? <NavBarAuth /> : <NavBarDefault />}
      </header>

      {/* Contenido principal */}
      <main>{children}</main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}

export default Layout;

import React, { useState, useEffect } from "react";
import NavBarDefault from "./NavBarDefault";
import NavBarAuth from "./NavBarAuth";
import Footer from "./Footer";

function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authToken") !== null);

  // Este useEffect se ejecutará cada vez que el componente se monte o cuando el localStorage cambie
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("authToken") !== null); // Actualizamos el estado al cambiar el token
    };

    // Escuchamos los cambios en localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Limpiamos el listener cuando el componente se desmonte
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Solo se ejecuta una vez cuando el componente se monta

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

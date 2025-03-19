import React from "react";
import NavBarDefault from "./NavBarDefault";
import NavBarAuth from "./NavBarAuth";
import Footer from "./Footer";

function Layout({ children }) {
  const authToken = localStorage.getItem("authToken");  // Verificamos si hay un token en localStorage

  return (
    <div>
      {/* Barra de navegación condicional */}
      <header>
        {authToken ? <NavBarAuth /> : <NavBarDefault />}
      </header>

      {/* Contenido principal */}
      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;

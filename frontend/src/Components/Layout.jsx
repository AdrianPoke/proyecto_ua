import React, { useState, useEffect } from "react";
import NavBarDefault from "./NavBarDefault";
import NavBarAuth from "./NavBarAuth";
import Footer from "./Footer";

function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authToken") !== null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("authToken") !== null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="layout-container">
      <header>{isAuthenticated ? <NavBarAuth /> : <NavBarDefault />}</header>

      {/* Contenido principal ocupa el espacio disponible */}
      <main className="content">{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;

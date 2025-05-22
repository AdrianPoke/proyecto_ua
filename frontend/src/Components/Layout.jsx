import React from "react";
import NavBarDefault from "./NavBarDefault";
import NavBarAuth from "./NavBarAuth";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext"; // ✅ Importa el contexto

function Layout({ children }) {
  const { usuario, cargando } = useAuth(); // ✅ Obtiene el estado desde el contexto

  if (cargando) return null; // ⏳ Evita parpadeos o errores mientras se verifica

  return (
    <div className="layout-container">
      <header>{usuario ? <NavBarAuth /> : <NavBarDefault />}</header>
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

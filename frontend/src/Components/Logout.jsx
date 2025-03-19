import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isAuthenticated");

    // Redirigir al usuario a la página de inicio
    navigate("/"); // Redirige a la página de inicio
  }, [navigate]);

  return <div>Cerrando sesión...</div>;
}

export default Logout;

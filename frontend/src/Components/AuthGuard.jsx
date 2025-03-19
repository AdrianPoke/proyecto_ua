import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const authToken = localStorage.getItem("authToken");  // Verifica si el token está en localStorage

  if (!authToken) {
    return <Navigate to="/login" replace />;  // Si no está autenticado, redirige al login
  }

  return children;  // Si está autenticado, permite renderizar el componente
};

export default AuthGuard;

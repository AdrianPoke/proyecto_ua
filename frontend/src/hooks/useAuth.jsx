import { useState, useEffect } from "react";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []); // Ejecuta solo al montar el componente

  // Forzar la actualización del estado de autenticación cuando el localStorage cambia
  useEffect(() => {
    const interval = setInterval(() => {
      const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === "true");
    }, 500); // Verificar cada medio segundo si el estado ha cambiado

    return () => clearInterval(interval);
  }, []);

  return isAuthenticated;
}

export default useAuth;

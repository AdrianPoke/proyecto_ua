import { useState, useEffect } from "react";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");

    // Escuchar cambios en el localStorage de forma reactiva sin usar intervalos
    const storageEventListener = (e) => {
      if (e.key === "isAuthenticated") {
        setIsAuthenticated(e.newValue === "true");
      }
    };

    window.addEventListener("storage", storageEventListener);

    return () => {
      window.removeEventListener("storage", storageEventListener);
    };
  }, []); // Solo se ejecuta al montar el componente

  return [isAuthenticated, setIsAuthenticated];
}

export default useAuth;

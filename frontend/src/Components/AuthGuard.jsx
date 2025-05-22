import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setAutenticado(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/verify-token`, {
          headers: {
            Authorization: token,
          },
        });

        if (res.ok) {
          setAutenticado(true);
        } else {
          setAutenticado(false);
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
        setAutenticado(false);
      } finally {
        setLoading(false);
      }
    };

    verificarToken();
  }, []);

  if (loading) return null;

  if (!autenticado) {
    sessionStorage.setItem("reloadAfterRedirectToLogin", "true");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;

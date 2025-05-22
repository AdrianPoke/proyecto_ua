import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const verificarAuth = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUsuario(null);
      setCargando(false);
      return;
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuario/perfil`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuario(res.data);
    } catch (error) {
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    verificarAuth();
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    verificarAuth();
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

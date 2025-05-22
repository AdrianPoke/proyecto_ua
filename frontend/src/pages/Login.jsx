import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Importa el contexto
import "react-toastify/dist/ReactToastify.css";
import "../styles/Global.css";
import "../styles/login.css";
import logo from "../logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Usa la función login del contexto

  useEffect(() => {
    const shouldReload = sessionStorage.getItem("reloadAfterRedirectToLogin");
    if (shouldReload) {
      sessionStorage.removeItem("reloadAfterRedirectToLogin");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, ingresa tu email y contraseña.", { autoClose: 5000 });
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contrasenya: password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, data.usuario); // ✅ Actualiza el contexto
        navigate("/home");
      } else {
        toast.error(data.mensaje || "Error al iniciar sesión.", { autoClose: 5000 });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error del servidor. Inténtalo más tarde.", { autoClose: 5000 });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2 className="subir-asset-title">Formulario de Inicio de Sesión</h2>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo"
            required
          />

          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 10 caracteres"
            required
          />

          <button type="submit" className="boton-accion">
            Aceptar
          </button>

          <p>
            ¿No tienes una cuenta creada?{" "}
            <a href="/registro">Regístrate aquí</a>
          </p>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default Login;

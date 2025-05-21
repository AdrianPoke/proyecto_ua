import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "../styles/Global.css";
import "../styles/login.css";
import logo from "../logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const navigate = useNavigate();

  // 🔁 Si venimos del AuthGuard tras perder el token, recargamos para actualizar el navbar
  useEffect(() => {
    const shouldReload = sessionStorage.getItem("reloadAfterRedirectToLogin");
    if (shouldReload) {
      sessionStorage.removeItem("reloadAfterRedirectToLogin");
      window.location.reload();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, ingresa tu email y contraseña.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          contraseña: password, // debe coincidir con el campo en el backend
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Guardar el token JWT
        localStorage.setItem("authToken", data.token);

        // Redirigir y recargar para que la barra superior se actualice
        window.location.href = "/home";
      } else {
        alert(data.mensaje || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error del servidor. Inténtalo más tarde.");
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
    </div>
  );
}

export default Login;

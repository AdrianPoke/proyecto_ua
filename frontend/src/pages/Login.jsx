import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Global.css"; // Importa los estilos globales
import "../styles/login.css";
import logo from "../logo.png";

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simula la autenticación (puedes añadir más validación si lo deseas)
    if (email && password) {
      // Guarda un token falso en localStorage
      localStorage.setItem("authToken", "sampleToken");
     
      navigate("/perfil");
      window.location.reload();

    } else {
      alert("Por favor, ingresa tu email y contraseña.");
    }
  };

  return (
<div className="login-page">
  <div className="login-container">
  <div className="login-header">
      <img src={logo} alt="Logo" className="login-logo" />
      <h2>Formulario de Inicio de Sesión</h2>
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

      <button type="submit">Inicia Sesión</button>

      <p>¿No tienes una cuenta creada? <a href="/registro">Regístrate aquí</a></p>
    </form>
  </div>
</div>

  );
}

export default Login;

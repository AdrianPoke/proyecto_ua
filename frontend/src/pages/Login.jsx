import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      // Redirige al perfil después de "loguearse"
      navigate("/perfil");
    } else {
      alert("Por favor, ingresa tu email y contraseña.");
    }
  };

  return (
    <div>
      <h1>Página de Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo"
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <div>
          <button type="submit">Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

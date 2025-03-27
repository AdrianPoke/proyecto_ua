import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Global.css";
import "../styles/login.css"; // Reutilizamos el mismo CSS
import logo from "../logo.png";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !contraseña || !repetirContraseña) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (contraseña !== repetirContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, contraseña }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registro exitoso. Inicia sesión.");
        navigate("/login");
      } else {
        alert(data.mensaje || "Error al registrarse.");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error del servidor.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Formulario de Registro</h2>
        </div>

        <form className="login-form" onSubmit={handleRegistro}>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            required
          />

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
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Mínimo 10 caracteres"
            required
          />

          <label>Repetir Contraseña:</label>
          <input
            type="password"
            value={repetirContraseña}
            onChange={(e) => setRepetirContraseña(e.target.value)}
            placeholder="Confirma tu contraseña"
            required
          />

          <button type="submit">Registrarse</button>

          <p>
            ¿Ya tienes una cuenta?{" "}
            <a href="/login">Inicia sesión aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registro;

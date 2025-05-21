import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Global.css";
import "../styles/login.css";
import logo from "../logo.png";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const validarCampo = (campo, valor) => {
    let error = "";

    if (!valor.trim()) error = "Este campo es obligatorio.";
    if (campo === "contraseña" && valor && valor.length < 10)
      error = "La contraseña debe tener al menos 10 caracteres.";
    if (campo === "repetirContraseña" && valor !== contraseña)
      error = "Las contraseñas no coinciden.";

    setErrores((prev) => ({ ...prev, [campo]: error }));
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!nombre.trim()) nuevosErrores.nombre = "Este campo es obligatorio.";
    if (!email.trim()) nuevosErrores.email = "Este campo es obligatorio.";
    if (!contraseña) nuevosErrores.contraseña = "Este campo es obligatorio.";
    else if (contraseña.length < 10)
      nuevosErrores.contraseña = "La contraseña debe tener al menos 10 caracteres.";
    if (!repetirContraseña)
      nuevosErrores.repetirContraseña = "Este campo es obligatorio.";
    else if (repetirContraseña !== contraseña)
      nuevosErrores.repetirContraseña = "Las contraseñas no coinciden.";

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

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
          <h2 className="subir-asset-title">Formulario de Registro</h2>
        </div>

        <form className="login-form" onSubmit={handleRegistro}>
          <label>
            Nombre Real de Usuario:
            {errores.nombre && <span className="error"> — {errores.nombre}</span>}
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              validarCampo("nombre", e.target.value);
            }}
            placeholder="Nombre completo"
          />

          <label>
            Email:
            {errores.email && <span className="error"> — {errores.email}</span>}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validarCampo("email", e.target.value);
            }}
            placeholder="Ingrese su correo"
          />

          <label>
            Contraseña:
            {errores.contraseña && <span className="error"> — {errores.contraseña}</span>}
          </label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => {
              setContraseña(e.target.value);
              validarCampo("contraseña", e.target.value);
            }}
            placeholder="Mínimo 10 caracteres"
          />

          <label>
            Repetir Contraseña:
            {errores.repetirContraseña && (
              <span className="error"> — {errores.repetirContraseña}</span>
            )}
          </label>
          <input
            type="password"
            value={repetirContraseña}
            onChange={(e) => {
              setRepetirContraseña(e.target.value);
              validarCampo("repetirContraseña", e.target.value);
            }}
            placeholder="Confirma tu contraseña"
          />

          <button type="submit" className="boton-accion">
            Aceptar
          </button>

          <p>
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registro;
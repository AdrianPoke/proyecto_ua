import React, { useEffect, useState } from "react";

function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/usuarios") // Llamar a la API del backend
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error("Error al obtener usuarios:", error));
  }, []);

  return (
    <div>
      <h1>Página de Inicio</h1>
      <h2>Usuarios Registrados</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario._id}>
            {usuario.nombre} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

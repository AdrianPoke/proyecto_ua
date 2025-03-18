import React, { useEffect, useState } from "react";

function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Usamos la variable de entorno para la URL del backend
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/api/usuarios`) // Llamar a la API del backend con la URL parametrizada
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

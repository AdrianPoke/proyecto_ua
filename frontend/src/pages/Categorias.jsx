import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // ⬅️ Importante
import '../styles/categorias.css';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categoria');
        if (!response.ok) throw new Error('Error al cargar las categorías');
        const data = await response.json();
        setCategorias(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerCategorias();
  }, []);

  const obtenerRutaImagen = (nombre) => {
    const nombreSanitizado = nombre
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/\s/g, '').replace(/[^\w]/g, '');
    return `/assets/categoria/${nombreSanitizado}.jpg`;
  };

  const crearSlug = (nombre) => {
    return nombre
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/\s/g, '').replace(/[^\w]/g, '');
  };

  if (cargando) return <p>Cargando categorías...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="categorias-container">
      <h2 className="categorias-title">CATEGORÍAS</h2>
      <div className="categorias-grid">
        {categorias.map((cat, index) => (
          <Link to={`/categorias/${crearSlug(cat.nombre)}`} className="categoria-card">
            <img
              src={obtenerRutaImagen(cat.nombre)}
              alt={cat.nombre}
              className="categoria-imagen"
            />
            <div className="categoria-nombre">{cat.nombre}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categorias;

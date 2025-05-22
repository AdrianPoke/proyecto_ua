import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/categoriasGlobal.css';

// Imágenes importadas (ajusta según tus archivos)
import iconAudio from '../icons/audio.jpg';
import iconPaquetes from '../icons/pack.jpg';
import iconEfectos from '../icons/efectos3d.jpg';
import iconMateriales from '../icons/material.jpeg';
import iconModelos3d from '../icons/modelos3d.jpg';
import iconGraficos2d from '../icons/graficos2d.jpeg';
import iconIA from '../icons/ia.jpeg';
import iconScripts from '../icons/scripts.jpg';

// Relación entre slug de categoría y la imagen correspondiente
const imagenesPorCategoria = {
  'audio': iconAudio,
  'paquetes': iconPaquetes,
  'efectos3d': iconEfectos,
  'materiales': iconMateriales,
  'modelos3d': iconModelos3d,
  'graficos2d': iconGraficos2d,
  'ia': iconIA,
  'scripts': iconScripts
};

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categoria`);
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
        {categorias.map((cat, index) => {
          const slug = crearSlug(cat.nombre);
          const imagen = imagenesPorCategoria[slug];

          if (!imagen) return null; // Si no hay imagen, no renderiza

          return (
            <Link key={index} to={`/categorias/${slug}`} className="tarjeta-categoria">
              <img
                src={imagen}
                alt={cat.nombre}
                className="tarjeta-categoria-imagen"
              />
              <div className="tarjeta-categoria-nombre">{cat.nombre}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categorias;

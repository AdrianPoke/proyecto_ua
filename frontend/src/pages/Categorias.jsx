import React from 'react';
import '../styles/categorias.css'; // Asegúrate de tener este CSS creado

const categorias = [
  { nombre: 'MODELOS 3D', imagen: '/assets/categorias/model3d.jpg' },
  { nombre: 'GRÁFICOS 2D', imagen: '/assets/categorias/graficos2d.jpg' },
  { nombre: 'AUDIO', imagen: '/assets/categorias/audio.jpg' },
  { nombre: 'SCRIPTS', imagen: '/assets/categorias/scr.jpg' },
  { nombre: 'IA', imagen: '/assets/categorias/ia.jpg' },
  { nombre: 'EFECTOS 3D', imagen: '/assets/categorias/efectos3d.jpg' },
  { nombre: 'MATERIALES', imagen: '/assets/categorias/materiales.jpg' },
  { nombre: 'PAQUETES', imagen: '/assets/categorias/titpac.jpg' },
];

const Categorias = () => {
  return (
    <div className="categorias-container">
      <h2 className="categorias-title">CATEGORÍAS</h2>
      <div className="categorias-grid">
        {categorias.map((cat, index) => (
          <div key={index} className="categoria-card">
            <img src={cat.imagen} alt={cat.nombre} className="categoria-imagen" />
            <div className="categoria-nombre">{cat.nombre}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;

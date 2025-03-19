import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Datos falsos de ejemplo
const fakeAssets = {
  efectos3d: [
    { name: 'Efecto 3D 1', image: 'https://via.placeholder.com/150', description: 'Descripción del Efecto 3D 1' },
    { name: 'Efecto 3D 2', image: 'https://via.placeholder.com/150', description: 'Descripción del Efecto 3D 2' },
  ],
  materiales: [
    { name: 'Material 1', image: 'https://via.placeholder.com/150', description: 'Descripción del Material 1' },
    { name: 'Material 2', image: 'https://via.placeholder.com/150', description: 'Descripción del Material 2' },
  ],
  graficos2d: [
    { name: 'Gráfico 2D 1', image: 'https://via.placeholder.com/150', description: 'Descripción del Gráfico 2D 1' },
    { name: 'Gráfico 2D 2', image: 'https://via.placeholder.com/150', description: 'Descripción del Gráfico 2D 2' },
  ],
  modelos3d: [
    { name: 'Modelo 3D 1', image: 'https://via.placeholder.com/150', description: 'Descripción del Modelo 3D 1' },
    { name: 'Modelo 3D 2', image: 'https://via.placeholder.com/150', description: 'Descripción del Modelo 3D 2' },
  ],
  audio: [
    { name: 'Sonido 1', image: 'https://via.placeholder.com/150', description: 'Descripción del Sonido 1' },
    { name: 'Sonido 2', image: 'https://via.placeholder.com/150', description: 'Descripción del Sonido 2' },
  ],
  scripts: [
    { name: 'Script 1', image: 'https://via.placeholder.com/150', description: 'Descripción del Script 1' },
    { name: 'Script 2', image: 'https://via.placeholder.com/150', description: 'Descripción del Script 2' },
  ],
  ia: [
    { name: 'Modelo IA 1', image: 'https://via.placeholder.com/150', description: 'Descripción del Modelo IA 1' },
    { name: 'Modelo IA 2', image: 'https://via.placeholder.com/150', description: 'Descripción del Modelo IA 2' },
  ],
  paquetes: [
    { name: 'Paquete 1', image: 'https://via.placeholder.com/150', description: 'Descripción del Paquete 1' },
    { name: 'Paquete 2', image: 'https://via.placeholder.com/150', description: 'Descripción del Paquete 2' },
  ]
};

const AssetsCategoria = () => {
  const { categoria } = useParams(); // Obtenemos el parámetro 'categoria' de la URL
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Aquí se cargan los assets de la categoría desde los datos falsos
    setAssets(fakeAssets[categoria]);
  }, [categoria]); // Dependencia en 'categoria', para recargar los assets cuando cambia la categoría

  return (
    <div>
      <h1>Categoría: {categoria}</h1>
      <div className="asset-list">
        {assets.map((asset, index) => (
          <div key={index} className="asset-item">
            <h2>{asset.name}</h2>
            <img src={asset.image} alt={asset.name} />
            <p>{asset.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsCategoria;

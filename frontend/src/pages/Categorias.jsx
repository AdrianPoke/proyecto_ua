import React from 'react';
import SelectorCategorias from '../Components/SelectorCategorias';  // Importamos el selector de categorías

const Categorias = () => {
  return (
    <div>
      <h1>Bienvenido a la página de categorías</h1>
      <SelectorCategorias />  {/* Renderizamos el selector de categorías */}
    </div>
  );
};

export default Categorias;

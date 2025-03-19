import React from 'react';
import { Link } from 'react-router-dom';

const SelectorCategorias = () => {
    return (
        <div>
          <h2>Selecciona una categoría</h2>
          <ul>
            <li><Link to="/categorias/efectos3d">Efectos 3D</Link></li>
            <li><Link to="/categorias/materiales">Materiales</Link></li>
            <li><Link to="/categorias/graficos2d">Gráficos 2D</Link></li>
            <li><Link to="/categorias/modelos3d">Modelos 3D</Link></li>
            <li><Link to="/categorias/audio">Audio</Link></li>
            <li><Link to="/categorias/scripts">Scripts</Link></li>
            <li><Link to="/categorias/ia">IA</Link></li>
            <li><Link to="/categorias/paquetes">Paquetes</Link></li>
          </ul>
        </div>
      );
    };

export default SelectorCategorias;

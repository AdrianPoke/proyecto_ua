import React, { useState } from "react";
import "../styles/busquedaAvanzada.css";

function BusquedaAvanzada() {
  const [busqueda, setBusqueda] = useState("");

  return (
    <div className="busqueda-container">
      <h2 className="busqueda-titulo">Búsqueda Avanzada</h2>

      <div className="busqueda-barra">
        <input
          type="text"
          placeholder="Escribe para buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="boton-buscar">🔍</button>
      </div>

      <div className="filtros">
        <div className="filtro">
          <label>Categoría</label>
          <select>
            <option>Seleccione</option>
            <option>Modelos 3D</option>
            <option>Gráficos 2D</option>
            <option>Audio</option>
            <option>IA</option>
            <option>Efectos 3D</option>
            <option>Materiales</option>
            <option>Scripts</option>
            <option>Paquetes</option>
          </select>
        </div>

        <div className="filtro">
          <label>Licencia</label>
          <select>
            <option>Seleccione</option>
            <option>CC0</option>
            <option>CC BY</option>
            <option>Uso interno</option>
          </select>
        </div>

        <div className="filtro">
          <label>Formato</label>
          <select>
            <option>Seleccione</option>
            <option>PNG</option>
            <option>FBX</option>
            <option>OBJ</option>
            <option>MP3</option>
          </select>
        </div>

        <div className="filtro ordenar">
          <label>Ordenar por:</label>
          <div>
            <label>
              <input type="checkbox" defaultChecked /> Recientes
            </label>
            <label>
              <input type="checkbox" /> Lo más descargado
            </label>
          </div>
        </div>
      </div>

      <h3 className="resultados-titulo">Resultados (10)</h3>
      <div className="resultados-grid">
        {[...Array(10)].map((_, index) => (
          <div className="resultado-card" key={index}>
            <div className="resultado-imagen">
              <img
                src={`/assets/nieve${index + 1}.webp`} // puedes cambiar esto según tus rutas
                alt={`Asset ${index + 1}`}
              />
            </div>
            <p className="resultado-titulo">Título</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusquedaAvanzada;

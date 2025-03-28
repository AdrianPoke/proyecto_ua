import React, { useState } from "react";
import "../styles/busquedaAvanzada.css";

// Array de assets compartidos
const assets = [
  { id: 1, title: "Cyborg Model 3D", image: "/assets/warrior.webp" },
  { id: 2, title: "Tileset Taberna 3D", image: "/assets/pac1.jpg" },
  { id: 3, title: "Tavern Assets", image: "/assets/pac2.webp" },
  { id: 4, title: "Fantasy Pack", image: "/assets/pac3.webp" },
  { id: 5, title: "Retro Arcade Pack", image: "/assets/pac4.webp" },
  { id: 6, title: "Pack of Monsters", image: "/assets/pac5.png" },
  { id: 7, title: "Space Invaders Pack", image: "/assets/pac6.png" },
  { id: 8, title: "Zombie Cenital Tileset", image: "/assets/pac7.webp" },
  { id: 9, title: "JavaScripts", image: "/assets/scr.jpg" },
  { id: 10, title: "Movimiento de Salto 2D", image: "/assets/scr1.jpg" },
  { id: 11, title: "Text Script Example", image: "/assets/scr2.png" },
  { id: 12, title: "Message Script", image: "/assets/SCR3.jpg" },
  { id: 13, title: "Movement TOP-DOWN", image: "/assets/scr4.png" },
  { id: 14, title: "Factory Package", image: "/assets/titpac.jpg" },
];

function BusquedaAvanzada() {
  const [busqueda, setBusqueda] = useState("");

  const assetsFiltrados = assets.filter((asset) =>
    asset.title.toLowerCase().includes(busqueda.toLowerCase())
  );

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

      <h3 className="resultados-titulo">Resultados ({assetsFiltrados.length})</h3>
      <div className="resultados-grid">
        {assetsFiltrados.map((asset) => (
          <div className="resultado-card" key={asset.id}>
            <div className="resultado-imagen">
              <img src={asset.image} alt={asset.title} />
            </div>
            <p className="resultado-titulo">{asset.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusquedaAvanzada;
